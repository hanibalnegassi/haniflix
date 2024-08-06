const router = require("express").Router();

router.post('/webhook', async (req, res) => {
    const event = req.body;
  
    // Handle 'customer.subscription.updated' event
    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object;
      const currentPeriodEnd = subscription.current_period_end;
      const status = subscription.status;
  
      // Check if subscription is canceled or expired
      if (status === 'canceled' || currentPeriodEnd <= Math.floor(Date.now() / 1000)) {
        // Subscription has ended, take necessary actions
        console.log('Subscription has ended.');
      }
    }
  
    res.json({ received: true });
  });

module.exports = router