<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Prioridades Registradas</h2>
      <button class="btn btn-primary" @click="mostrarModal = true">Crear Prioridad</button>
    </div>

    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Nivel</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prioridad in prioridades" :key="prioridad.id">
          <td>{{ prioridad.id }}</td>
          <td>{{ prioridad.nombre }}</td>
          <td>{{ prioridad.nivel_prioridad }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2">Editar</button>
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
            <h5 class="modal-title">Crear Prioridad</h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input v-model="nuevaPrioridad.nombre" class="form-control" type="text" />
            </div>
            <div class="mb-3">
              <label class="form-label">Nivel</label>
              <input v-model.number="nuevaPrioridad.nivel_prioridad" class="form-control" type="number" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" @click="crearPrioridad">Guardar</button>
            <button class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrioridadesCRUD',
  data() {
    return {
      prioridades: [],
      mostrarModal: false,
      nuevaPrioridad: {
        nombre: '',
        nivel_prioridad: 1
      }
    };
  },
  methods: {
    async obtenerPrioridades() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/prioridades', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('No autorizado');
        this.prioridades = await res.json();
      } catch (error) {
        alert('Error al obtener prioridades.');
        console.error(error);
      }
    },
    async crearPrioridad() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/prioridades/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(this.nuevaPrioridad)
        });
        if (!res.ok) throw new Error('Error al registrar prioridad');
        this.cerrarModal();
        this.obtenerPrioridades();
      } catch (error) {
        alert(error.message);
      }
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.nuevaPrioridad = { nombre: '', nivel_prioridad: 1 };
    }
  },
  mounted() {
    this.obtenerPrioridades();
  }
};
</script>

<style scoped>
.modal-content {
  border-radius: 10px;
}
</style>
