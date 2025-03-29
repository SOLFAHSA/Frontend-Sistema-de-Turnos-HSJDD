<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Pacientes Registrados</h2>
      <button class="btn btn-primary" @click="mostrarModal = true">Crear Paciente</button>
    </div>

    <!-- Tabla de pacientes -->
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Identidad</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="paciente in pacientes" :key="paciente.id">
          <td>{{ paciente.id }}</td>
          <td>{{ paciente.identidad }}</td>
          <td>{{ paciente.nombres }}</td>
          <td>{{ paciente.apellidos }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2">Editar</button>
            <button class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para crear paciente -->
    <div class="modal fade show d-block" tabindex="-1" v-if="mostrarModal" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog">
        <div class="modal-content bg-white">
          <div class="modal-header">
            <h5 class="modal-title">Crear Nuevo Paciente</h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Identidad</label>
              <input v-model="nuevoPaciente.identidad" class="form-control" type="text" />
            </div>
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input v-model="nuevoPaciente.nombres" class="form-control" type="text" />
            </div>
            <div class="mb-3">
              <label class="form-label">Apellido</label>
              <input v-model="nuevoPaciente.apellidos" class="form-control" type="text" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" @click="crearPaciente">Guardar</button>
            <button class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PacientesCRUD',
  data() {
    return {
      pacientes: [],
      mostrarModal: false,
      nuevoPaciente: {
        identidad: '',
        nombres: '',
        apellidos: ''
      }
    };
  },
  methods: {
    async obtenerPacientes() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/pacientes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('No autorizado');

        const data = await res.json();
        this.pacientes = data;
      } catch (error) {
        console.error('❌ Error al obtener pacientes:', error);
        alert('No tienes permisos para ver los pacientes.');
      }
    },
    async crearPaciente() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/pacientes/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(this.nuevoPaciente)
        });

        if (!res.ok) throw new Error('Todos los campos son obligatorios');

        this.cerrarModal();
        this.obtenerPacientes();
      } catch (error) {
        alert(`Error al registrar paciente: ${error.message}`);
      }
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.nuevoPaciente = {
        identidad: '',
        nombres: '',
        apellidos: ''
      };
    }
  },
  mounted() {
    this.obtenerPacientes();
  }
};
</script>

<style scoped>
.modal-content {
  border-radius: 10px;
}
</style>
