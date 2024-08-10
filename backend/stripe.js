const stripe = require('stripe')("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");

// Function to get a list of plans/prices
async function listPlans() {
  try {
    // Retrieve the list of prices
    const prices = await stripe.prices.list({
      limit: 10, // You can adjust the limit as needed
    });

    console.log('List of Plans/Prices:', prices.data[0]);
    return prices.data[0];
  } catch (error) {
    console.error('Error retrieving plans/prices:', error);
    throw error;
  }
}
async function createCustomer() {
     const customer = await stripe.customers.create({
                name: "Hasnat",
                email: "hasnat98044@gmail.com",
            });
            const CustomerId = customer.id; // Return the Customer ID*/
            console.log(CustomerId, "customer Id")
}
// Function to create a subscription with a trial period
async function createSubscriptionWithTrial(customerId, priceId) {
    try {
        // Create a Checkout session with a 1-month trial period
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'subscription',
          customer: customerId,
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          subscription_data: {
            trial_period_days: 30, // Set the trial period to 30 days
          },
          success_url: 'https://yourdomain.com/success?session_id={CHECKOUT_SESSION_ID}',
          cancel_url: 'https://yourdomain.com/cancel',
        });
    
        console.log('Checkout session created successfully:', session.id);
        return session;
      } catch (error) {
        console.error('Error creating Checkout session:', error);
        throw error;
      }
  }
  
// Usage example
(async () => {
    const customerId = 'cus_QdOWWptKhA7j22'; // Replace with your Stripe customer ID
    const priceId = 'price_1Pm7ZcEgzDktOwTAIl8TB2Xz'; // Replace with your Stripe price ID
  
    try {
      const subscription = await createSubscriptionWithTrial(customerId, priceId);
      console.log('Subscription:', subscription);
    } catch (error) {
      console.error('Error:', error);
    }
  })();