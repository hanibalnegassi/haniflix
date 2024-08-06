const axios = require('axios');
const User = require('../../models/User');
const baseUrl = process.env.PAYPAL_API_BASE_URL;

const fetchAccessToken = async () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const tokenUrl = `${baseUrl}/v1/oauth2/token`;

  try {
    console.log('Fetching PayPal access token...');
    const response = await axios.post(tokenUrl, null, {
      params: {
        grant_type: 'client_credentials'
      },
      auth: {
        username: clientId,
        password: clientSecret
      }
    });

    console.log('PayPal access token fetched successfully:', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching PayPal access token:', error.message);
    throw error;
  }
};

const subscription = async (req, res) => {
  console.log('buy-subscription route hit');
  const { userId } = req.params;
  const { orderId } = req.body;

  try {
    // Fetch access token
    const accessToken = await fetchAccessToken();
    console.log('Access token:', accessToken);

    // Construct PayPal API URL
    const paypalApiUrl = `${baseUrl}/v2/checkout/orders/${orderId}`;
    console.log('Verifying order with PayPal:', paypalApiUrl);

    // Verify order with PayPal
    const response = await axios.get(paypalApiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    console.log('PayPal order verification response:', response.data);

    if (response.data.status === 'COMPLETED') {
      // Update user subscription status in your database
      await User.findByIdAndUpdate(userId, { isSubscribed: true, subscriptionId: orderId });

      console.log('Subscription purchased successfully.');
      res.status(200).json({ message: 'Subscription purchased successfully.' });
    } else {
      console.log('Order not completed:', response.data);
      res.status(400).json({ message: 'Order not completed.' });
    }
  } catch (error) {
    if (error.response) {
      console.error('Error validating order with PayPal:', error.response.data);
      res.status(error.response.status).json({ message: error.response.data.message });
    } else if (error.request) {
      console.error('No response received from PayPal:', error.request);
      res.status(500).json({ message: 'No response received from PayPal.' });
    } else {
      console.error('Error setting up request to PayPal:', error.message);
      res.status(500).json({ message: 'Error setting up request to PayPal.' });
    }
  }
};

module.exports = subscription;
