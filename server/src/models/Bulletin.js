const mongoose = require('mongoose');

const BulletinSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        subscribedAt: {
            type: Date,
            default: Date.now,
        },
    }
);
module.exports = mongoose.model('Bulletin', BulletinSchema);
