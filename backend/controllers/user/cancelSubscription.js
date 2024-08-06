const User = require("../../models/User");
const axios = require("axios");
const qs = require("qs");

const PAYPAL_API_BASE_URL = process.env.PAYPAL_BASE_URL;
const paypalClientId = process.env.PAYPAL_CLIENT_ID;
const paypalSecret = process.env.PAYPAL_SECRET;



const cancelSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);

    if (user.subscriptionId) {
      const subscriptionId = user.subscriptionId;

      // Construct the request body
      const requestBody = {
        reason: "Cancelled by user",
      };

      // Make API request to cancel subscription
      const accessToken = await getPayPalAccessToken(); // Function to retrieve access token
      if (!accessToken) {
        return res.status(500).json({ error: "Failed to retrieve access token" });
      }



      const cancelSubscriptionUrl = `${PAYPAL_API_BASE_URL}/v1/billing/subscriptions/${subscriptionId}/cancel`;

      try {
        const response = await axios.post(cancelSubscriptionUrl, requestBody, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });



        // Handle response from PayPal
        if (response.status === 204) {
          // Update your user model or mark subscription as canceled
          user.isSubscribed = false;
          await user.save();

          return res.status(200).json({
            message: "Subscription has been canceled.",
          });
        } else {
          return res.status(500).json({
            error: "Failed to cancel subscription.",
          });
        }
      } catch (apiError) {
        console.error("API Error:", apiError.response ? apiError.response.data : apiError.message);
        return res.status(500).json({
          error: "Error communicating with PayPal.",
        });
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
