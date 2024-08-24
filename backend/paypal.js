const axios = require('axios');
let paypalApiBaseUrl =process.env.PAYPAL_BASE_URL;
const planId = process.env.PAYPAL_PLAN_ID;
const paypalClientId = "AQBUVukD4suk0wDrEVouOInXmRDtEM12MzLEDW0306cHfspk53rTfxFFDln75q2aJHbXl7D0YaDLMSdC";
const paypalSecret = "ENWR6qjAn-qDQvrRvocJNmSxsVl6A4235ntgyGylx9r6H3QZVDFqlq4Kqu-5qxnGm8uQrVJgitLGMtq0";
const appUrl = process.env.APP_URL; // "http://localhost:3000/";


const getPayPalAccessToken = async () => {
    try {
  
      const base64String = Buffer.from(`${paypalClientId}:${paypalSecret}`).toString("base64")
      const response = await fetch(`https://api-m.sandbox.paypal.com/v1/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${base64String}`,
        },
        body: "grant_type=client_credentials",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch PayPal access token: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data.access_token,"token")
      return data.access_token;
    } catch (error) {
      console.error("Error fetching PayPal access token:", error);
    }
  };

async function createBillingPlan() {
  const accessToken = 'A21AAJSvqGnhSV7PxHlDtssmzZNc_odgp0wEnoruAZf4XByJPqCGwveel9RtBZ7PVP6_kHRnZLrCjfoP-HgfKLBoEsD5vkBRA';
  const config = {
    method: 'post',
    url: 'https://api-m.sandbox.paypal.com/v1/billing/plans',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'PayPal-Request-Id': 'PLAN-18062019-001',
      'Prefer': 'return=representation'
    },
    data: {
      product_id: "PROD-5M075566BJ206840K",
      name: "Video Streaming Service Plan",
      description: "Video Streaming Service basic plan",
      status: "ACTIVE",
      billing_cycles: [
        {
          frequency: { interval_unit: "MONTH", interval_count: 1 },
          tenure_type: "TRIAL",
          sequence: 1,
          total_cycles: 2,
          pricing_scheme: { fixed_price: { value: "3", currency_code: "USD" } }
        },
        {
          frequency: { interval_unit: "MONTH", interval_count: 1 },
          tenure_type: "TRIAL",
          sequence: 2,
          total_cycles: 3,
          pricing_scheme: { fixed_price: { value: "6", currency_code: "USD" } }
        },
        {
          frequency: { interval_unit: "MONTH", interval_count: 1 },
          tenure_type: "REGULAR",
          sequence: 3,
          total_cycles: 12,
          pricing_scheme: { fixed_price: { value: "10", currency_code: "USD" } }
        }
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: { value: "10", currency_code: "USD" },
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 3,
        card: {
          number: "4111111111111111",
          expiry: "2025-12",
          security_code: "123",
          name: "John Doe",
          billing_address: {
            address_line_1: "123 Main St",
            admin_area_2: "San Jose",
            admin_area_1: "CA",
            postal_code: "95131",
            country_code: "US",
          },
      },
    },
      taxes: {
        percentage: "10",
        inclusive: false
      }
    }
  };

  try {
    const response = await axios(config);
    console.log('Billing Plan Created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating billing plan:', error.response ? error.response.data : error.message);
    return null;
  }
}
async function createProduct() {
  try {
      const response = await axios.post('https://api-m.sandbox.paypal.com/v1/catalogs/products', {
          name: "Video Streaming Service",
          description: "Video streaming service",
          type: "SERVICE",
          category: "SOFTWARE",
          image_url: "https://example.com/streaming.jpg",
          home_url: "https://example.com/home"
      }, {
          headers: {
              'Authorization': 'Bearer A21AAJSvqGnhSV7PxHlDtssmzZNc_odgp0wEnoruAZf4XByJPqCGwveel9RtBZ7PVP6_kHRnZLrCjfoP-HgfKLBoEsD5vkBRA',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'PayPal-Request-Id': 'PRODUCT-18062019-001',
              'Prefer': 'return=representation'
          }
      });

      console.log('Product Created:', response.data);
  } catch (error) {
      console.error('Error creating product:', error.response ? error.response.data : error.message);
  }
}

createBillingPlan();