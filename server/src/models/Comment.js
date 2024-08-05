const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    eventId: {
        type: mongoose.Types.ObjectId,
        ref: 'Events',
        required: true
    },
},
{
    timestamps: true
}
);

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const CommentSchema = new Schema({

//     author: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     text: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     eventId: {
//         type: Schema.Types.ObjectId,
//         ref: 'Event',
//         required: true
//     },

// });

// module.exports = mongoose.model('Comment', CommentSchema);