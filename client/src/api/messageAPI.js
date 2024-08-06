import { get, post, del } from '../libs/request';

export const BASE_URL = process.env.REACT_APP_API_URL;

export const addMessage = async (messageData) => {
    try {
        const response = await post(`${BASE_URL}/messages`, messageData);
        return response;
    } catch (error) {
        console.error('Error adding message:', error);
        throw error;
    }
};

export const getMessages = async () => {
    try {
        const response = await get(`${BASE_URL}/messages`);
        return response;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const deleteMessage = async (messageId) => {
    try {
        const response = await del(`${BASE_URL}/messages/${messageId}`);
        return response;
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error;
    }
};
