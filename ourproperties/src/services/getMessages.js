import axios from 'axios';
import { getUser } from '../services/getUser';

export const fetchUserMessages = async () => {
  const userEmail = getUser();
  
  if (!userEmail) {
    throw new Error('User email not found');
  }

  try {
    const response = await axios.get(
      `http://localhost:8080/api/messages/user/${encodeURIComponent(userEmail)}`,
      {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status === 200) {
      const responseData = response.data;
      return Array.isArray(responseData) ? 
        responseData : 
        (responseData ? [responseData] : []);
    }
    throw new Error(response.data?.message || 'Failed to fetch messages');
  } catch (err) {
    console.error('Error fetching messages:', err);
    throw new Error(err.message || 'Failed to fetch messages. Please check if the backend server is running.');
  }
};