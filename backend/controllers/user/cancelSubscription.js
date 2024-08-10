const User = require("../../models/User");
const axios = require("axios");
const qs = require("qs");

const PAYPAL_API_BASE_URL = process.env.PAYPAL_BASE_URL;
const paypalClientId = process.env.PAYPAL_CLIENT_ID;
const paypalSecret = process.env.PAYPAL_SECRET;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



const cancelSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);

    if (user.subscriptionId) {
      const subscriptionId = user.subscriptionId;
      console.log(subscriptionId, "sdfas")
      // Construct the request body
      const requestBody = {
        reason: "Cancelled by user",
      };

      try {
        // Cancel the subscription
        const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);
    
        console.log('Subscription canceled successfully:', canceledSubscription.id);
        return canceledSubscription;
      } catch (error) {
        console.error('Error canceling subscription:', error);
        throw error;
      }
    } else {
      return res.status(400).json({
        message: "User does not have an active subscription.",
      });
    }
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({
      error: "Internal server error.",
    });
  }
};




const getPayPalAccessToken = async () => {
  try {
    const response = await fetch(`${PAYPAL_API_BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${paypalClientId}:${paypalSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch PayPal access token: ${response.statusText}`);
    }
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching PayPal access token:", error);
    throw new Error("Failed to fetch PayPal access token");
  }
};

module.exports = cancelSubscription;
