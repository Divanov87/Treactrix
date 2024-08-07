const router = require('express').Router();

const Bulletin = require('../models/Bulletin');


router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const existingSubscription = await Bulletin.findOne({ email });
    if (existingSubscription) {
      return res.status(200).json({ success: false, message: 'Email already subscribed' });
    }
    const newSubscription = new Bulletin({ email });
    await newSubscription.save();
    res.status(201).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.delete('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const subscription = await Bulletin.findOneAndDelete({ email });
    if (subscription) {
      res.status(200).json({ success: true, message: 'Unsubscribed successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Email not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const bulletins = await Bulletin.find();
    res.status(200).json(bulletins);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;