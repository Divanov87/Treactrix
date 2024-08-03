const router = require('express').Router();
const authService = require('../services/authService');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const { getErr } = require('../utilities/errHelper');
const { SESSION_COOKIE_NAME, ADMIN_IP_ADDRESS, TOKEN_EXPIRATION } = require('../configs/envVariables');

// --------------------------------- LOGIN -----------------------------------------------

router.post('/login', isGuest, async (req, res) => {
    const { username_email, password, userIp } = req.body;

    try {
        const user = await authService.login(username_email, password, userIp);
        const token = await authService.generateToken(user);

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + TOKEN_EXPIRATION);

        res.cookie(SESSION_COOKIE_NAME, token, { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'None',
            expires: expirationDate,
            partitioned: true 
        });

        res.status(201).json({ token, user });

    } catch (err) {
        res.status(403).json({ error: getErr(err) });
    }
});

// --------------------------------- REGISTER -----------------------------------------------

router.post('/register', isGuest, async (req, res) => {
    const { username, password, repeatPassword, email, city, userIp } = req.body;

    try {
        const role = userIp == ADMIN_IP_ADDRESS ? 'admin' : 'user';
        const user = await authService.register({ username, password, repeatPassword, email, city, role, userIp });
        const token = await authService.generateToken(user);

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + TOKEN_EXPIRATION);

        res.cookie(SESSION_COOKIE_NAME, token, { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'None',
            expires: expirationDate,
            partitioned: true 
        });

        res.status(201).json({ token, user });
    } catch (err) {
        res.status(400).json({ error: getErr(err) });
    }
});


// --------------------------------- LOGOUT -----------------------------------------------

// router.get('/logout', isAuth, async (req, res, next) => {
//     try {

//         res.clearCookie(SESSION_COOKIE_NAME);

//         res.status(200).json({ message: 'Logout successful' });
//     } catch (error) {
//         next(error);
//     }
// });

router.get('/logout', isAuth, async (req, res, next) => {
    try {
        res.clearCookie(SESSION_COOKIE_NAME, {
            httpOnly: secure, 
            secure: secure, 
            sameSite: 'None'
        });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
