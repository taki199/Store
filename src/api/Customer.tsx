// api/authAPI.ts
import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // Replace with your actual API URL

export const loginAPI = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const registerAPI = async (data: { username: string; email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};

export const getCurrentUserAPI = async () => {
  const response = await axios.get(`${API_URL}/auth/me`);
  return response.data;
};

export const uploadProfilePhotoAPI = async (file: File) => {
  const formData = new FormData();
  formData.append('profilePhoto', file);

  const response = await axios.post(`${API_URL}/auth/upload-profile-photo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
