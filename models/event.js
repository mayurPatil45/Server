const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    registrationLink: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    teams: {
        name: {
            type: String,
        },
        college:{
            type: String,
        }
    },
    attendess: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
        }
    ]
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event