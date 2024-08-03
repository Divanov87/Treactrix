const jwt = require('jsonwebtoken');
const { SECRET, SESSION_COOKIE_NAME } = require('../configs/envVariables');

exports.authHandler = async (req, res, next) => {

    const token = req?.headers?.authorization;
    // const token = req?.headers?.authorization?.split(" ")[1];
    //const token = req.cookies[SESSION_COOKIE_NAME];

    // const token = req.cookies[SESSION_COOKIE_NAME] || req.headers['authorization'];

    // if (token && token.startsWith('Bearer ')) {
    //     token = token.substring(7, token.length);
    // }

    console.log('Token from cookie:', token);


    if (!token) return next();

    try {
        const decodedToken = await jwt.verify(token, SECRET);
        console.log('Decoded token:', decodedToken);
        req.user = decodedToken;
        res.locals.user = decodedToken;
        res.locals.isAdmin = decodedToken.role === 'admin';
        res.locals.isUser = decodedToken.role === 'user';
        res.locals.location = decodedToken.location;
        res.locals._id= decodedToken._id;
        res.locals.username= decodedToken.username;
        res.locals.isAuthenticated = true;
        next();
    } catch (err) {
        res.clearCookie(SESSION_COOKIE_NAME);
        return res.status(401).json({ error: 'Unauthorized' });
    };
};

exports.isAuth = (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    next();
};

exports.isGuest = (req, res, next) => {
    if (req.user) return res.status(403).json({ error: 'Forbidden' });
    next();
};
