import axios from 'axios';

const API_URL = 'http://localhost:3000/api/medicos';

export const getAllMedicos = (token) => {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createMedico = (medico, token) => {
  return axios.post(API_URL, medico, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateMedico = (id, medico, token) => {
  return axios.put(`${API_URL}/${id}`, medico, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteMedico = (id, token) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
