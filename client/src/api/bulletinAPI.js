import { get, post, del } from '../libs/request';

export const BASE_URL = process.env.REACT_APP_API_URL;

export const addBulletin = async (bulletinData) => {
    try {
        const response = await post(`${BASE_URL}/bulletin/subscribe`, bulletinData);
        return response;
    } catch (error) {
        console.error('Error subscribing:', error);
        throw error;
    }
};

export const getBulletins = async () => {
    try {
        const response = await get(`${BASE_URL}/bulletin`);
        return response;
    } catch (error) {
        console.error('Error fetching bulletins:', error);
        throw error;
    }
};

export const removeBulletin = async (bulletinData) => {
    try {
        const response = await del(`${BASE_URL}/bulletin/unsubscribe`, bulletinData);
        return response;
    } catch (error) {
        console.error('Error unsubscribing:', error);
        throw error;
    }
};
