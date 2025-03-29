<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Consultorios Registrados</h2>
      <button class="btn btn-primary" @click="mostrarModal = true">Crear Consultorio</button>
    </div>

    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Número</th>
          <th>Servicio</th>
          <th>Médico</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="consultorio in consultorios" :key="consultorio.id">
          <td>{{ consultorio.id }}</td>
          <td>{{ consultorio.numero }}</td>
          <td>{{ consultorio.servicio_id }}</td>
          <td>{{ consultorio.medico_id }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-1">Editar</button>
            <button class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade show d-block" tabindex="-1" v-if="mostrarModal" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog">
        <div class="modal-content bg-white">
          <div class="modal-header">
            <h5 class="modal-title">Crear Consultorio</h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Número</label>
              <input v-model="nuevoConsultorio.numero" class="form-control" type="number" />
            </div>
            <div class="mb-3">
              <label class="form-label">Servicio</label>
              <select v-model="nuevoConsultorio.servicio_id" class="form-select">
                <option value="">Seleccione un servicio</option>
                <option v-for="serv in servicios" :key="serv.id" :value="serv.id">
                  {{ serv.nombre }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Médico</label>
              <select v-model="nuevoConsultorio.medico_id" class="form-select">
                <option value="">Seleccione un médico</option>
                <option v-for="med in medicos" :key="med.id" :value="med.id">
                  {{ med.nombre }} {{ med.apellido }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" @click="crearConsultorio">Guardar</button>
            <button class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsultoriosCRUD',
  data() {
    return {
      consultorios: [],
      servicios: [],
      medicos: [],
      mostrarModal: false,
      nuevoConsultorio: {
        numero: '',
        servicio_id: '',
        medico_id: ''
      }
    };
  },
  methods: {
    async obtenerConsultorios() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/consultorios', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        this.consultorios = data;
      } catch (error) {
        console.error('Error al obtener consultorios:', error);
      }
    },
    async obtenerServicios() {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/servicios', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.servicios = await res.json();
    },
    async obtenerMedicos() {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/medicos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.medicos = await res.json();
    },
    async crearConsultorio() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/consultorios/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(this.nuevoConsultorio)
        });

        if (!res.ok) throw new Error('Error al crear consultorio');

        this.cerrarModal();
        this.obtenerConsultorios();
      } catch (error) {
        alert(error.message);
      }
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.nuevoConsultorio = {
        numero: '',
        servicio_id: '',
        medico_id: ''
      };
    }
  },
  mounted() {
    this.obtenerConsultorios();
    this.obtenerServicios();
    this.obtenerMedicos();
  }
};
</script>

<style scoped>
.modal-content {
  border-radius: 10px;
}
</style>
