const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { USER_MIN_STRENGTH, PASS_MIN_STRENGTH, CITY_MIN_STRENGTH, MAX_STRENGTH, SECRET, TOKEN_EXPIRATION, SALTS } = require('../configs/envVariables');


exports.register = async ({ username, password, repeatPassword, email, city, role, userIp }) => {
    try {
        const errors = [];

        if (password !== repeatPassword) {
            errors.push('Passwords must match!');
        }


        function validateData(value, fieldName, minLength, maxLength) {
            if (!value) {
                errors.push(`${fieldName} is required!`);
            } else if (value.length < minLength) {
                errors.push(`${fieldName} should be ${minLength - value.length} characters longer!`);
            } else if (value.length > maxLength) {
                errors.push(`${fieldName} should be ${value.length - maxLength} characters shorter!`);
            }
        }

        validateData(username, 'Username', USER_MIN_STRENGTH, MAX_STRENGTH)
        validateData(password, 'Password', PASS_MIN_STRENGTH, MAX_STRENGTH);
        validateData(repeatPassword, 'Repeat Password', PASS_MIN_STRENGTH, MAX_STRENGTH);
        validateData(city, 'city', CITY_MIN_STRENGTH, MAX_STRENGTH);

        // const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]$/;
        
        const validEmail = /^[a-zA-Z0-9._-]{3,}@(gmail\.com|abv\.bg|mail\.bg)$/; //secured! ..kinda

        if (!email.match(validEmail) && email.length > 0) {
            errors.push(`"${email}" is invalid e-mail!`);
        }

        const registered = await User.find({ $or: [{ username }, { email }] }).collation({ locale: 'en', strength: 2 });
        registered.forEach(user => {
            if (user.username == username.toLowerCase()) {
                errors.push(`User with username "${username}" already exists!`);
            }
            if (user.email == email.toLowerCase()) {
                errors.push(`User with email "${email}" already exists!`);
            }
        })

        if (errors.length) {
            throw new Error(errors.join('\n'));
        }


        const encrypted = await bcrypt.hash(password, SALTS);
        return await User.create({ username, password: encrypted, email, city, role, registrationIp: userIp });

    } catch (error) {
        throw new Error(error.message);
    }
}
exports.login = async (username_email, password, userIp) => {
    try {
        const user = await User.findOneAndUpdate({ $or: [{ username: username_email }, { email: username_email }] }, { lastLoginDate: new Date(), lastLoginIp: userIp });
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error('Invalid username/email or password!');
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.generateToken = (user) => {

    const payload ={ _id: user._id, username: user.username, email: user.email, role: user.role, location: user.city };
    const options = { expiresIn: TOKEN_EXPIRATION + 'd' };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, options, (err, decodedToken) => {
            if (err) return reject(err);
            resolve(decodedToken);
        });
    });
}
