const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
    },
    converLetter: {
        type: String,
    },
    forAmbassdor: {
        type: Boolean,
        default: false
    },
    isAmbassdor: {
        type: Boolean,
        default: false,
    },
    college: {
        types: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    events: [
        {
            event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
            registrationDate: { type: Date, default: Date.now() },
            default: { type: mongoose.Schema.Types.Mixed },
        }
    ]
})

const User = mongoose.model('User', userSchema)

module.exports = User;