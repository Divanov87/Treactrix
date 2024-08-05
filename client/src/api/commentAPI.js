import { get, post, put, del } from '../libs/request';

export const BASE_URL = process.env.REACT_APP_API_URL;


export const addComment = async (eventId, commentData) => {
    try {
        const response = await post(`${BASE_URL}/comments/${eventId}`, commentData);
        return response;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};;

export const getComment = async (eventId) => {
    try {
        const response = await get(`${BASE_URL}/comments/${eventId}`);
        return response;
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
};

// export const deleteComment = async (commentId) => {
//     try {
//         const response = await delete(`${BASE_URL}/comments/${commentId}`, commentId);
//         return response;
//     } catch (error) {
//         console.error('Error deleting comment:', error);
//     }
// };


export const deleteComment = async (eventId, commentId) => {
    try {
        await del(`${BASE_URL}/comments/${commentId}`, { eventId });
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};

export const updateComment = async (commentId, updateData) => {
    try {
        const response = await put(`${BASE_URL}/comments/${commentId}`, updateData);
        return response;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
};