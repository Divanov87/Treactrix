import { get, post, put, del } from '../libs/request';

export const BASE_URL = process.env.REACT_APP_API_URL;



export const getEvent = async (_id) => {
  try {
    const response = await get(`${BASE_URL}/events/${_id}`);
    return response;
  } catch (error) {
    console.error('Error in getEvent:', error);
    throw error;
  }
};


export const createEvent = async (eventData) => {
  try {
    const response = await post(`${BASE_URL}/events/add`, eventData);
    return response;
  } catch (error) {
    console.error('Error in createEvent:', error);
    throw error;
  }
};


export const editEvent = async (eventData, _id) => {
  try {
    const response = await put(`${BASE_URL}/events/${_id}`, eventData);
    return response;
  } catch (error) {
    console.error('Error in editEvent:', error);
    throw error;
  }
};


export const deleteEvent = async (_id) => {
  try {
    const response = await del(`${BASE_URL}/events/${_id}`);
    return response;
  } catch (error) {
    console.error('Error in deleteEvent:', error);
    throw error;
  }
};

export const getAllEvents = async () => {
  try {
    const response = await get(`${BASE_URL}/events`);
    return response;
  } catch (error) {
    console.error('Error in getAllEvents:', error);
    throw error;
  }
};


export const getTheaterEvents = async () => {
  try {
    const response = await get(`${BASE_URL}/events/theater`);
    return response;
  } catch (error) {
    console.error('Error in getTheaterEvents:', error);
    throw error;
  }
};


export const getConcertEvents = async () => {
  try {
    const response = await get(`${BASE_URL}/events/concerts`);
    return response;
  } catch (error) {
    console.error('Error in getConcertEvents:', error);
    throw error;
  }
};


export const getTopRatedEvents = async () => {
  try {
    const response = await get(`${BASE_URL}/`);
    return response.topRatedEvents;
  } catch (error) {
    console.error('Error in getTheatrixEvents:', error);
    throw error;
  }
}


export const getAllEventsData = async () => {
  try {
    const response = await get(`${BASE_URL}/`);
    return response
  } catch (error) {
    console.error('Error in getTheatrixEvents:', error);
    throw error;
  }
};

//server
//res.status(200).json({ latestPins, topRatedEvents, theaterEvents, concertEvents, city });


export const buyTickets = async (_id) => {
  try {
    const response = await post(`${BASE_URL}/events/${_id}/buy`, _id);
    return response;
  } catch (error) {
    console.error('Error in buyTickets:', error);
    throw error;
  }
};


export const likeEvent = async (_id) => {
  try {
    const response = await post(`${BASE_URL}/events/${_id}/like`, _id);
    return response;
  } catch (error) {
    console.error('Error in likeEvent:', error);
    throw error;
  }
};


export const unlikeEvent = async (_id) => {
  try {
    const response = await post(`${BASE_URL}/events/${_id}/unlike`, _id);
    return response;
  } catch (error) {
    console.error('Error in unlikeEvent:', error);
    throw error;
  }
};


export const pinEvent = async (_id) => {
  try {
    const response = await post(`${BASE_URL}/events/${_id}/pin`, _id);
    return response;
  } catch (error) {
    console.error('Error in pinEvent:', error);
    throw error;
  }
};


export const unpinEvent = async (_id) => {
  try {
    const response = await post(`${BASE_URL}/events/${_id}/unpin`, _id);
    return response;
  } catch (error) {
    console.error('Error in unpinEvent:', error);
    throw error;
  }
};


export const cloneEvent = async (_id) => {
  try {
    const response = await post(`${BASE_URL}/events/${_id}/clone`, { _id });
    return response;
  } catch (error) {
    console.error('Error in cloneEvent:', error);
    throw error;
  }
};


export const searchEvents = async (queryParams) => {
  try {
    const response = await post(`${BASE_URL}/search`, queryParams);
    return response;
  } catch (error) {
    console.error('Error in searchEvents:', error);
    throw error;
  }
};


export const getAllCities = async () => {
  try {
    const response = await get(`${BASE_URL}/events/cities`);
    return response;
  } catch (error) {
    console.error('Error in getAllCities:', error);
    throw error;
  }
};


export const getUserEvents = async (_id) => {
  try {
    const response = await post(`${BASE_URL}/profile`, { _id });
    return response;
  } catch (error) {
    console.error('Error in getUserEvents:', error);
    throw error;
  }
};


export const getAllUsers = async () => {
  try {
    const response = await get(`${BASE_URL}/users`);
    return response;
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    throw error;
  }
};


export const getUsersActivity = async () => {
  try {
    const response = await get(`${BASE_URL}/activity`);
    return response;
  } catch (error) {
    console.error('Error in getUsersActivity:', error);
    throw error;
  }
};





