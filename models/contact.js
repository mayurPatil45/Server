const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    firstName: { types: String, required: true },
    lastName: { types: String, required: true },
    phone: String,
    email: String,
    message: String,
    city: String,
    college: String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact