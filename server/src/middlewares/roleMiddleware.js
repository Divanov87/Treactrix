const eventsService = require('../services/eventsService');

exports.isUser = async (req, res, next) => {
    try {
        const event = await eventsService.getOne(req.params.eventId).lean();
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        if (event.owner == req.user?._id) {
            return res.redirect(`/events/${req.params.eventId}/details`);
        }
        req.event = event;
        next();
    } catch (error) {
        console.error('Error in isUser:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        const event = await eventsService.getOne(req.params.eventId).lean();
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        if (req.user && req.user.role === 'admin') {
            req.event = event;
            next();
        } else {
            return res.status(403).json({ error: 'Forbidden' });
        }
    } catch (error) {
        console.error('Error in isAdmin middleware:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.isUserLogged = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
        next();
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};
