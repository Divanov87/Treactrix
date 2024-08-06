const router = require('express').Router();
const Message = require('../models/Message');
const User = require('../models/User');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized' });

    const messages = await Message.find().populate('user').sort({ messageDate: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  const newMessage = new Message({
    user: req.user ? req.user._id : null,
    name,
    email,
    phone,
    message,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:messageId', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized' });

    const deletedMessage = await Message.findByIdAndDelete(req.params.messageId);
    if (!deletedMessage) return res.status(404).json({ message: 'Message not found' });
    
    res.status(200).json(deletedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
