<template>
  <div>
    <h2 class="mb-4">Médicos Registrados</h2>
    <button class="btn btn-primary mb-3" @click="mostrarModal = true">Crear Médico</button>

    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Profesión</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="medico in medicos" :key="medico.id">
          <td>{{ medico.id }}</td>
          <td>{{ medico.nombre }}</td>
          <td>{{ medico.apellido }}</td>
          <td>{{ medico.profesion }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2">Editar</button>
            <button class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade show d-block" tabindex="-1" v-if="mostrarModal" style="background-color: rgba(0,0,0,0.5)">
      <div class="modal d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Crear Nuevo Médico</h5>
              <button type="button" class="btn-close" @click="cerrarModal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input v-model="nuevoMedico.nombre" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Apellido</label>
                <input v-model="nuevoMedico.apellido" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Profesión</label>
                <input v-model="nuevoMedico.profesion" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Asignar Usuario</label>
                <select v-model="nuevoMedico.usuario_id" class="form-select">
                  <option disabled value="">Seleccione un usuario</option>
                  <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
                    ID: {{ usuario.id }} - {{ usuario.usuario }}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-success" @click="crearMedico">Guardar</button>
              <button class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MedicosCRUD",
  data() {
    return {
      medicos: [],
      usuarios: [],
      mostrarModal: false,
      nuevoMedico: {
        nombre: "",
        apellido: "",
        profesion: "",
        usuario_id: ""
      }
    };
  },
  methods: {
    async obtenerMedicos() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/medicos", {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.medicos = await res.json();
      } catch (error) {
        console.error("Error al obtener médicos:", error);
      }
    },
    async obtenerUsuarios() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/usuarios", {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.usuarios = await res.json();
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    },
    async crearMedico() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/medicos/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(this.nuevoMedico)
        });

        if (!res.ok) throw new Error("Error al crear médico");

        this.cerrarModal();
        this.obtenerMedicos();
      } catch (error) {
        console.error("Error al crear médico:", error);
        alert("Ocurrió un error al registrar el médico.");
      }
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.nuevoMedico = {
        nombre: "",
        apellido: "",
        profesion: "",
        usuario_id: ""
      };
    }
  },
  mounted() {
    this.obtenerMedicos();
    this.obtenerUsuarios();
  }
};
</script>


