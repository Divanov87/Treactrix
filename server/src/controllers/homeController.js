const router = require('express').Router();
const { SESSION_COOKIE_NAME } = require('../configs/envVariables');
const { isAuth } = require('../middlewares/authMiddleware');
const User = require('../models/User');
const eventsService = require('../services/eventsService');



// router.get('/', async (req, res) => {
//     try {

//         latestPins = await eventsService.getPinned();
//         topRatedEvents = await eventsService.getEventsSortedByRating();
//         theaterEvents = await eventsService.getEventsByCategory('Theater');
//         concertEvents = await eventsService.getEventsByCategory('Concert');

//         res.status(200).json({ latestPins, topRatedEvents, theaterEvents, concertEvents });
//     } catch (error) {
//         console.error('Error in home route:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

router.get('/', async (req, res) => {
    try {
        const city = res.locals.location;
        console.log(req.user)
        console.log(city)
        // console.log(res.locals._id)
        // console.log(res.locals.username)

        // const user = await User.findById(req.user._id);
        // const city = user.location;
        if (city === undefined || city === null) {
            const latestPins = await eventsService.getPinned();
            const topRatedEvents = await eventsService.getEventsSortedByRating();
            const theaterEvents = await eventsService.getEventsByCategory('Theater');
            const concertEvents = await eventsService.getEventsByCategory('Concert');
            return res.status(200).json({ latestPins, topRatedEvents, theaterEvents, concertEvents });
        }

        const userCity = await eventsService.getCity(city);
        const eventCity = await eventsService.getEventCity(city);
        const userLocation = userCity ? userCity.city : null;
        const eventLocation = eventCity ? eventCity.location : null;

        if (!userLocation || !eventLocation || userLocation !== eventLocation) {
            const latestPins = await eventsService.getPinned();
            const topRatedEvents = await eventsService.getEventsSortedByRating();
            const theaterEvents = await eventsService.getEventsByCategory('Theater');
            const concertEvents = await eventsService.getEventsByCategory('Concert');
            return res.status(200).json({ latestPins, topRatedEvents, theaterEvents, concertEvents });
        }

        const latestPins = await eventsService.getPinned();
        const topRatedEvents = await eventsService.getEventsSortedByRatingLogged(city);
        const theaterEvents = await eventsService.getEventsByCategoryLogged('Theater', city);
        const concertEvents = await eventsService.getEventsByCategoryLogged('Concert', city);
        res.status(200).json({ latestPins, topRatedEvents, theaterEvents, concertEvents, city });
    } catch (error) {
        console.error('Error in home route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/search', async (req, res) => {
    try {
        const search = req.query;
        const events = await eventsService.search(search);
        res.status(200).json({ events, search });
    } catch (error) {
        console.error('Error in search route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/search', async (req, res) => {
    try {
        const searchParam = req.body;
        const events = await eventsService.search(searchParam);
        res.status(200).json({ events, search: searchParam });
    } catch (error) {
        console.error('Error in search route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/contacts', async (req, res) => {
    try {
        res.status(200).json({ title: 'Contacts Page' });
    } catch (error) {
        console.error('Error in contacts route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/about', async (req, res) => {
    try {
        res.status(200).json({ title: 'About Page' });
    } catch (error) {
        console.error('Error in about route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// router.get('/profile', async (req, res) => {
//     try {
//         // console.log(req.params.id)
//         // console.log(req.params.userId)
//         // console.log(decodedToken)
//         const user = await eventsService.find(req.user._id).populate('bought').populate('liked').lean();
//         const likes = user.liked.map(x => x._id);
//         const boughts = user.bought.map(x => x._id);
//         const userData = { likes, boughts };
//         res.status(200).json(userData);
//     } catch (error) {
//         console.error('Error in profile route:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


// profile, likes, unlikes, homepage

router.post('/profile', async (req, res) => {
    try {
        console.log(req.body._id)
        console.log(req.body)
        const user = await eventsService.find(req.body._id).populate('bought').populate('liked').lean();
        // const user = await eventsService.find(req.user._id).populate('bought').populate('liked').lean();
        const likes = user.liked.map(x => x._id);
        const boughts = user.bought.map(x => x._id);
        const userData = { likes, boughts };
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error in profile route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/check', (req, res) => {
    const cookieValue = req.cookies[SESSION_COOKIE_NAME];
    if (!cookieValue) {
        return res.status(404).json({ error: 'Cookie not found' });
    }

    const cookieExpiration = req.cookies[`${SESSION_COOKIE_NAME}.expires`];

    const expirationDate = new Date(cookieExpiration);
    const isExpired = expirationDate < new Date();

    res.status(200).json({ 
        expired: isExpired,
        expirationDate: isExpired ? 'Cookie has expired' : expirationDate.toISOString()
    });
});


router.get('/activity', async (req, res) => {
    try {
        // const usersActivity = await User.find({ role: "user" }, '_id username email city registrationIp registrationDate lastLoginIp lastLoginDate').lean();
        // const adminsActivity = await User.find({ role: "admin" }, '_id username email city registrationIp registrationDate lastLoginIp lastLoginDate').lean();

            const users = await User.find();
            const onlineThreshold = 1000 * 60 * 1;
            const now = Date.now();
        
            const usersStatus = users.map(user => ({
              ...user.toObject(),
              online: (now - new Date(user.lastLoginDate).getTime()) < onlineThreshold
            }));
    
            res.json(usersStatus)
    } catch (error) {
        console.error('Error in profile route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// router.post('/updateUserPage', async (req, res) => {
//     const { userId, currentPage } = req.body;
//     try {
//       await User.findByIdAndUpdate(userId, { 
//         lastActive: new Date(),
//         currentPage: currentPage
//       }, { new: true }).exec();
//       res.status(200).json({ message: 'User page updated successfully' });
//     } catch (error) {
//       console.error('Error updating user page:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

router.get('/users', async (req, res) => {
    try {
        const registeredUsers = await User.find(
            { role: "user" }, 
            '_id username email city registrationIp registrationDate lastLoginIp lastLoginDate liked bought'
          ).lean();
        res.status(200).json(registeredUsers);
    } catch (error) {
        console.error('Error in profile route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// ---------------------------------CITY----------------------------------------

router.get('/cities', async (req, res) => {
    try {
      const cities = await User.find().distinct('city');
      res.json(cities);
    } catch (err) {
      console.error('Error fetching cities:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
