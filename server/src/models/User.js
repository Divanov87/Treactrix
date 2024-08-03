const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    created: [{
        type: mongoose.Types.ObjectId,
        ref: 'Events'
    }],
    liked: [{
        type: mongoose.Types.ObjectId,
        ref: 'Events'
    }],
    bought: [{
        type: mongoose.Types.ObjectId,
        ref: 'Events'
    }],
    pinned: [{
        type: mongoose.Types.ObjectId,
        ref: 'Events'
    }],
    registrationIp:
    {
        type: String,
        default: null
    },
    registrationDate:
    {
        type: Date,
        default: Date.now
    },
    lastLoginIp: {
        type: String,
        default: null
    },
    lastLoginDate: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;