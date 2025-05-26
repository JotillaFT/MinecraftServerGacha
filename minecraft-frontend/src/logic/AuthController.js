import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_BACKEND;

export async function sendAuthMessage(user, password) {
  try {
    const payload = { user, password };
    const response = await axios.post(`${API_URL}/register`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function sendAuthCode(user, code){
  try {
    const payload = { user, code };
    const response = await axios.post(`${API_URL}/validateAuthCode`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function sendLogin(user, password) {
  try {
    const payload = { user, password };
    const response = await axios.post(`${API_URL}/login`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}