const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { isAdmin, isUser } = require('../middlewares/roleMiddleware');
const eventsService = require('../services/eventsService');
const { getErr } = require('../utilities/errHelper');

const Events = require('../models/Events');
const User = require('../models/User');

// ---------------------------------CREATE-------------------------------------------

router.get('/add', (req, res) => {
    //router.get('/add', isAdmin, (req, res) => {
    res.status(200).json({ message: 'Event add page' });
});

//  router.post('/add', isAdmin, async (req, res) => {
    router.post('/add', async (req, res) => {
    try {
        const eventsData = req.body;
        const addedEvent = eventsService.create(eventsData._id, eventsData);
        // const addedEvent = eventsService.create(req.user._id, eventsData);
        res.status(201).json(addedEvent);
    } catch (err) {
        res.status(400).json({ error: getErr(err) });
    }
});

// ---------------------------------EVENTS----------------------------------------

router.get('/', async (req, res) => {
    try {
        const latestEvents = await eventsService.getLatest().lean();
        res.status(200).json(latestEvents);
    } catch (err) {
        res.status(500).json({ error: getErr(err) });
    }
});

// PERSONALISED EVENTS PAGE PER USER

// router.get('/', async (req, res) => {
//     try {
//         const city = res.locals.location;
//         if (city) {
//             const latestEvents = await eventsService.getEventsByLocation(city);
//             res.status(200).json({latestEvents, city});
//         } else {
//             const latestEvents = await eventsService.getLatest();
//             res.status(200).json(latestEvents);
//         }
      
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// ---------------------------------GEO----------------------------------------

router.get('/user', async (req, res) => {
    try {
        const userLocation = req.query.location;
        if (!userLocation) {
            return res.status(400).json({ error: "User location not provided" });
        }
        const cityEvents = await eventsService.getEventsByLocation(userLocation);
        res.json(cityEvents);
    } catch (error) {
        console.error('Error sending events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ---------------------------------CITY----------------------------------------

router.get('/cities', async (req, res) => {
    try {
      const cities = await Events.find().distinct('location');
      res.json(cities);
    } catch (err) {
      console.error('Error fetching cities:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// ---------------------------------THEATER----------------------------------------

router.get('/theater', async (req, res) => {
    try {
        const theaterEvents = await eventsService.getEventsByCategory('Theater');
        // res.status(200).json(theaterEvents);
        res.status(200).json(theaterEvents);
    } catch (err) {
        res.status(500).json({ error: getErr(err) });
    }
});


// ---------------------------------CONCERTS----------------------------------------

router.get('/concerts', async (req, res) => {
    try {
        const concertEvents = await eventsService.getEventsByCategory('Concert');
        // res.status(200).json(concertEvents);
        res.status(200).json(concertEvents);
    } catch (err) {
        res.status(500).json({ error: getErr(err) });
    }
});


// ---------------------------------UPDATE/EDIT-------------------------------------------

router.get('/:eventId', async (req, res) => {
    try {
        const latestEvents = await eventsService.getLatest().lean();
        const eventsData = await eventsService.getOneOwner(req.params.eventId).lean();

        if (!eventsData) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const ticketsData = await eventsService.getOne(req.params.eventId).lean();
        const ticketsLeft = ticketsData.tickets;

        const isOwner = eventsData.owner && eventsData.owner._id == req.user?._id; // test dev angular if it worsk
        const isLiked = eventsData.likesList.some(user => user._id == req.user?._id);

        const eventsData2 = await eventsService.getOneBuyer(req.params.eventId).lean();
        const isBuyed = eventsData2.buysList.some(user => user._id == req.user?._id);

        const eventsData3 = await eventsService.getOnePin(req.params.eventId).lean();
        const isPinned = eventsData3.pinsList.some(user => user._id == req.user?._id);

        let eventData = {...eventsData, isOwner, isLiked, isBuyed, isPinned, ticketsLeft, latestEvents,  title: 'Details page' };

        res.status(200).json(eventData);       
    } catch (err) {
        res.status(400).json({ error: getErr(err) });
    }
});

// router.post('/:eventId', async (req, res) => {

//     try {
//         console.log('param', req.params.eventId)
//         console.log('user', req.body)
//         console.log('userId', req.body.userId)
//         console.log('eventId', req.body.eventId)

//         const latestEvents = await eventsService.getLatest().lean();
//         const eventsData = await eventsService.getOneOwner(req.body.eventId).lean();

//         if (!eventsData) {
//             return res.status(404).json({ error: 'Event not found' });
//         }

//         const ticketsData = await eventsService.getOne(req.params.eventId).lean();
//         const ticketsLeft = ticketsData.tickets;

//         const isOwner = eventsData.owner && eventsData.owner._id == req.user.userId;
//         const isLiked = eventsData.likesList.some(user => user._id == req.body.userId);

//         console.log('isLiked:', isLiked)

//         const eventsData2 = await eventsService.getOneBuyer(req.params.eventId).lean();
//         const isBuyed = eventsData2.buysList.some(user => user._id == req.body.userId);

//         const eventsData3 = await eventsService.getOnePin(req.params.eventId).lean();
//         const isPinned = eventsData3.pinsList.some(user => user._id == req.body.userId);

//         let eventData = {...eventsData, isOwner, isLiked, isBuyed, isPinned, ticketsLeft, latestEvents,  title: 'Details page' };

//         res.status(200).json(eventData);       
//     } catch (err) {
//         res.status(400).json({ error: getErr(err) });
//     }
// });

//router.put('/:eventId', async (req, res) => {
    router.put('/:eventId', async (req, res) => {
    try {
        const eventData = req.body;
        const eventsData = await eventsService.update(req.params.eventId, eventData);
        // res.status(200).json({ message: 'Event updated successfully' });
        res.status(200).json(eventsData);
    } catch (err) {
        res.status(400).json({ error: getErr(err) });
    }
});

// ---------------------------------DELETE-------------------------------------------

router.delete('/:eventId',  async (req, res) => {
    //router.delete('/:eventId', isAdmin, async (req, res) => {
    try {
        const eventsData = await eventsService.delete(req.params.eventId);

        // res.status(200).json({ message: 'Event deleted successfully' });
        res.status(200).json(eventsData);

    } catch (err) {
        res.status(400).json({ error: getErr(err) });
    }
});

// ---------------------------------DETAILS-------------------------------------------




// ---------------------------------LIKE--------------------------------------------------

router.post('/:eventId/like', async (req, res) => {
// router.post('/:eventId/like', isAuth, async (req, res) => {

    try {
        // console.log(req.body.eventId)
        console.log(req.body.userId)

        const like = await eventsService.like(req.body.eventId, req.body.userId);
        //res.status(200).json({ message: 'Event liked successfully' });
        res.status(200).json({like});
    } catch (err) {
        res.status(400).json({ error: getErr(err) });
    }
});

// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

// router.post('/:eventId/like', async (req, res) => {
    
//         try {

//             const eventId = new ObjectId(req.body.eventId);
//             const userId = new ObjectId(req.body.userId);
            
//             console.log(eventId);
//             console.log(userId);
    
//             const like = await eventsService.like(req.params.eventId, req.user._id);
//             res.status(200).json(like);
//         } catch (err) {
//             res.status(400).json({ error: getErr(err) });
//         }
//     });

router.post('/:eventId/unlike', async (req, res) => {
    // router.post('/:eventId/like', isAuth, async (req, res) => {
    
        try {
            const eventId = req.body.eventId
            const userId = req.body.userId
            const unlike = await eventsService.unlike(eventId, userId);
            res.status(200).json({unlike});
        } catch (err) {
            res.status(400).json({ error: getErr(err) });
        }
    });
    

// ---------------------------------PIN--------------------------------------------------

router.post('/:eventId/pin', async (req, res) => {
    try {
        const pin = await eventsService.pin(req.body.eventId, req.body.userId);
        // const pin = await eventsService.pin(req.params.eventId, req.user._id);
        //res.status(200).json({ message: 'Event pinned successfully' });
        res.status(200).json({pin});
    } catch (err) {
        res.status(400).json({ error: getErr(err) });
    }
});

router.post('/:eventId/unpin', async (req, res) => {
    try {
        const unpin = await eventsService.unpin(req.body.eventId, req.body.userId);
        res.status(200).json({unpin});
    } catch (err) {
        res.status(400).json({ error: getErr(err) });
    }
});


// ---------------------------------BUY--------------------------------------------------

// router.post('/:eventId/buy', isUser, async (req, res) => {
    router.post('/:eventId/buy', async (req, res) => {
    try {
        // const eventsData = req.body
        // console.log(req.body.eventId)
        const bought = await eventsService.buy(req.body.eventId, req.body.userId);
        //res.status(200).json({ message: 'Ticket bought successfully' });
        res.status(200).json({bought});
    } catch (err) {
        res.status(400).json({ error: getErr(err) });
    }
});


router.post('/:eventId/clone', async (req, res) => {
    
    const eventId = req.params.eventId;

    try {
        const originalEvent = await Events.findById(eventId);

        if (!originalEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const clonedEvent = new Events(originalEvent.toObject());
        
        clonedEvent.name = '_' + originalEvent.name;

        clonedEvent._id = null;
        clonedEvent.createdAt = null;
        clonedEvent.buysList = []
        clonedEvent.pinsList = []


        await clonedEvent.save();

        res.status(200).json(originalEvent.name);
    } catch (error) {
        console.error('Error cloning event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;