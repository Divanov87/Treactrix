const router = require('express').Router();


const { isAuth } = require('../middlewares/authMiddleware');
const { getErr } = require('../utilities/errHelper');


const Comment = require('../models/Comment');
const User = require('../models/User');



router.get('/:eventId', async (req, res) => {
  try {
    const comments = await Comment.find({ eventId: req.params.eventId }).populate('author');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/:eventId', async (req, res) => {
  const { userId, text } = req.body;
  const comment = new Comment({
    author: userId,
    text: text,
    eventId: req.params.eventId,
  });

  try {
    const newComment = await comment.save();
    await newComment.populate('author');
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// router.delete('/:commentId', async (req, res) => {
//   try {
//     const comment = await Comment.findById(req.params.commentId);
//     if (!comment) return res.status(404).json({ message: 'Comment not found' });

//     await comment.remove();
//     res.json({ message: 'Comment deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


router.delete('/:commentId',  async (req, res) => {
    try {
        const eventsData = await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json(eventsData);

    } catch (err) {
        res.status(400).json({ error: getErr(err) });
    }
});

// router.put('/:commentId', async (req, res) => {
//     const { commentId } = req.params;
//     const { text } = req.body;

//     if (!text) {
//         return res.status(400).json({ message: 'Text is required' });
//     }

//     try {
//         const comment = await Comment.findById(commentId);

//         if (!comment) {
//             return res.status(404).json({ message: 'Comment not found' });
//         }

//         if (req.user._id.toString() !== comment.author.toString()) {
//             return res.status(403).json({ message: 'Unauthorized' });
//         }

//         comment.text = text;
//         await comment.save();

//         res.status(200).json(comment);
//     } catch (error) {
//         console.error('Error updating comment:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

router.put('/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Text is required' });
    }

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const userId = req.user._id.toString();
        const isAdmin = req.user.role === 'admin';
        const isAuthor = userId === comment.author.toString();

        if (!isAdmin && !isAuthor) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        comment.text = text;
        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;