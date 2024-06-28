const Contact = require('../models/contact')

const createContact = async (req, res) => {
    const { firstName, lastname, phone, email, message, city, college } = req.body;
    const newContact = new Contact({ firstName, lastname, phone, email, message, city, college })

    try {
        await newContact.save()

        res.status(201).json(newContact)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = createContact;