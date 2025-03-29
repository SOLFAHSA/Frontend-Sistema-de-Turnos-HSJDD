import axios from 'axios';

const API_URL = 'http://localhost:3000/pacientes';

const pacienteService = {
  getAllPacientes(token) {
    return axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  createPaciente(paciente, token) {
    return axios.post(API_URL, paciente, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updatePaciente(id, paciente, token) {
    return axios.put(`${API_URL}/${id}`, paciente, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deletePaciente(id, token) {
    return axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async obtenerPorIdentidad(identidad) {
    const res = await axios.get(`${API_URL}/identidad/${identidad}`);
    return res.data;
  }
};

export default pacienteService;
