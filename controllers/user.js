const User = require('../models/user');
const Event = require('../models/event');
const { sendConfirmationEmail } = require('../services/email.services');
const eventEmitter = require('../config/eventEmitter'); // Assuming you have an eventEmitter setup

const registerUser = async (req, res) => {
    try {
        const { name, email, college, event_id } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Find the event by ID
        const event = await Event.findById(event_id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        const newUser = new User({
            name,
            email,
            college
        });
        newUser.events.push(event._id);
        await newUser.save();

        // Add user to event's attendees
        event.attendees.push(newUser._id);
        await event.save();

        // Emit the 'userRegistered' event
        eventEmitter.emit('userRegistered', newUser);

        // Send confirmation email
        await sendConfirmationEmail(newUser.email);

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const createAmbassador = async (req, res) => {
    try {
        const { name, email, phone, college, message } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const newAmbassador = new User({
            name,
            email,
            phone,
            college,
            coverLetter: message,
            forAmbassador: true,
        });

        newAmbassador.save((err, user) => {
            if (err) {
                console.error('Error saving user:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            res.status(201).json({ message: 'Ambassador registered successfully.' });
        });
    }
    catch (error) {
        console.error('Ambassador registration error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getRegisteredUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving registered users:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { registerUser, createAmbassador, getRegisteredUsers };
