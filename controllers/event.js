const Event = require('../models/event');
const dotenv = require('dotenv');
const { uploadImage } = require('../config/cloudinary');

dotenv.config();

const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        return res.status(200).json({ events });
    } catch (error) {
        console.error('Error retrieving events:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

const createEvent = async (req, res) => {
    try {
        const { title, description, date, registrationLink, croppedImage } = req.body;
        console.log("Event creation request received: ", req.body);

        let image_link;
        try {
            image_link = await uploadImage(croppedImage);
        } catch (error) {
            console.error('Error uploading image:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to upload image',
                error: error.message,
            });
        }

        const event = new Event({
            title,
            description,
            date,
            registrationLink,
            image: image_link
        });

        await event.save();
        return res.status(201).json({
            success: true,
            message: 'Event created successfully',
            event,
        });
    } catch (error) {
        console.error('Error creating event:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create event',
            error: error.message,
        });
    }
}

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        await event.remove();
        return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        return res.status(500).json({ message: error.message });
    }
}

const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        const { title, description, date, registrationLink } = req.body;
        if (title) event.title = title;
        if (description) event.description = description;
        if (date) event.date = date;
        if (registrationLink) event.registrationLink = registrationLink;

        await event.save();
        return res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            event,
        });
    } catch (error) {
        console.error('Error updating event:', error);
        return res.status(500).json({ message: error.message });
    }
}

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        return res.status(200).json(event);
    } catch (error) {
        console.error('Error retrieving event:', error);
        return res.status(404).json({ message: error.message });
    }
}

module.exports = { getEvents, createEvent, deleteEvent, updateEvent, getEventById };
