const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Title is required'],
        minLength: 2,
    },
    imageUrl: {
        type: String,
        required: [true, 'Cover image is required'],
        match: /^https?:\/\//
    },
    tickets: {
        type: Number,
        required: [true, 'Tickets is required'],
        min: 1,
        max: 500,
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        minLength: 4,
        maxLength: 12,
    },
    restriction: {
        type: Number,
        enum: [ 0, 12, 16, 18],
        required: [true, 'Restriction is required'],
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'],
        min: 60,
        max: 180,
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: 0,
        max: 10,
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
    },
    location: {
        type: String,
        lowercase: true,
        required: [true, 'Location is required'],
        minLength: 3,
    },
    category: {
        type: String,
        enum: ['Theater', 'Concert'],
        required: [true, 'Category is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: 10,
        
    },
    likesList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    buysList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    pinsList: [{ 
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


// eventsSchema.pre('save', function(next) {
//     if (this.date.includes('-')) {
//         const parts = this.date.split('-');
//         this.date = parts[2] + '.' + parts[1] + '.' + parts[0];
//     }
//     next();
// });




const Events = mongoose.model('Events', eventsSchema);

module.exports = Events;