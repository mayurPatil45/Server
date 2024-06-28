const express = require('express')
const { createEvent, getEvents, getEventById, deleteEvent, updateEvent } = require('../controllers/event');
const { route } = require('./admin.route');

const router = express.Router();

router.get('/', getEvents);
router.post('/create', createEvent);
router.get('/:id', getEventById);
router.delete('/delete/:id', deleteEvent);
router.put('/update/:id', updateEvent);

module.exports = router;