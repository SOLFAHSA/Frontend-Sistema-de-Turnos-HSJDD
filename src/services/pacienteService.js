import axios from 'axios';

const API_URL = 'http://localhost:3000/api/pacientes';

export const getAllPacientes = (token) => {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createPaciente = (paciente, token) => {
  return axios.post(API_URL, paciente, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updatePaciente = (id, paciente, token) => {
  return axios.put(`${API_URL}/${id}`, paciente, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deletePaciente = (id, token) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
