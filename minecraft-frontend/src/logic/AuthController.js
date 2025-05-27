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

// Función para obtener el valor de una cookie por nombre
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export async function fetchProtectedData() {
  // Obtén el token de la cookie
  const token = getCookie("access_token");
  if (!token) {
    console.error("No se encontró el token de acceso en las cookies.");
    return;
  }

  try {
    const response = await axios.get("http://localhost:8000/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error al acceder al recurso protegido:", error);
  }
}
