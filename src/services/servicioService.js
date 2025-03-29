import axios from 'axios';

const API_URL = 'http://localhost:3000/api/servicios';

export const getAllServicios = (token) => {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createServicio = (servicio, token) => {
  return axios.post(API_URL, servicio, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateServicio = (id, servicio, token) => {
  return axios.put(`${API_URL}/${id}`, servicio, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteServicio = (id, token) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
