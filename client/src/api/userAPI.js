import { get, post } from '../libs/request.js';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = process.env.REACT_APP_API_URL;
const IP_SERVICE_URL = process.env.REACT_APP_IP_SERVICE_URL;

const getExternalIpAddress = async () => {
    const response = await fetch(`${IP_SERVICE_URL}`);
    const data = await response.json();
    return data.ip;
};

export const loginService = async (username_email, password) => {
    const userIp = await getExternalIpAddress();
    const data = { username_email, password, userIp };
    const response = await post(`${BASE_URL}/auth/login`, data);

    const { token } = response;
    if (token) {
        const decodedToken = jwtDecode(token);
        const { _id, role, location, email, username } = decodedToken;
        Cookies.set('user', token, { expires: 400 });
        return { _id, token, role, location, email, username };
    } else {
        throw new Error('Invalid token received');
    }
};

export const registerService = async (username, password, repeatPassword, email, city) => {
    const userIp = await getExternalIpAddress();
    const data = { username, password, repeatPassword, email, city, userIp };
    const response = await post(`${BASE_URL}/auth/register`, data);

    const { token } = response;
    if (token) {
        const decodedToken = jwtDecode(token);
        const { _id, role, location, email, username } = decodedToken;
        Cookies.set('user', token, { expires: 400 });
        return { _id, token, role, location, email, username };
    } else {
        throw new Error('Invalid token received');
    }
};

export const logoutService = async () => {
    return await get(`${BASE_URL}/auth/logout`);
}
