<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Servicios Registrados</h2>
      <button class="btn btn-primary" @click="mostrarModal = true">Crear Servicio</button>
    </div>

    <!-- Tabla de servicios -->
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Letra</th>
          <th>Número Inicial</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="servicio in servicios" :key="servicio.id">
          <td>{{ servicio.id }}</td>
          <td>{{ servicio.nombre }}</td>
          <td>{{ servicio.letra }}</td>
          <td>{{ servicio.numero_inicial }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2">Editar</button>
            <button class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para crear servicio -->
    <div class="modal fade show d-block" tabindex="-1" v-if="mostrarModal" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog">
        <div class="modal-content bg-white">
          <div class="modal-header">
            <h5 class="modal-title">Crear Nuevo Servicio</h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input v-model="nuevoServicio.nombre" class="form-control" type="text" />
            </div>
            <div class="mb-3">
              <label class="form-label">Letra</label>
              <input v-model="nuevoServicio.letra" class="form-control" type="text" maxlength="1" />
            </div>
            <div class="mb-3">
              <label class="form-label">Número Inicial</label>
              <input v-model.number="nuevoServicio.numero_inicial" class="form-control" type="number" min="1" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" @click="crearServicio">Guardar</button>
            <button class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiciosCRUD',
  data() {
    return {
      servicios: [],
      mostrarModal: false,
      nuevoServicio: {
        nombre: '',
        letra: '',
        numero_inicial: 1
      }
    };
  },
  methods: {
    async obtenerServicios() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/servicios', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('No autorizado');

        const data = await res.json();
        this.servicios = data;
      } catch (error) {
        console.error('❌ Error al obtener servicios:', error);
        alert('No tienes permisos para ver los servicios.');
      }
    },
    async crearServicio() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/servicios/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(this.nuevoServicio)
        });

        if (!res.ok) throw new Error('Todos los campos son obligatorios');

        this.cerrarModal();
        this.obtenerServicios();
      } catch (error) {
        alert(`Error al registrar servicio: ${error.message}`);
      }
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.nuevoServicio = {
        nombre: '',
        letra: '',
        numero_inicial: 1
      };
    }
  },
  mounted() {
    this.obtenerServicios();
  }
};
</script>

<style scoped>
.modal-content {
  border-radius: 10px;
}
</style>
