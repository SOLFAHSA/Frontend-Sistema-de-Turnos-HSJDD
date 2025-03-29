<template>
  <div class="p-4">
    <h2 class="mb-4">Usuarios Registrados</h2>
    <button class="btn btn-primary mb-3" @click="mostrarModal = true">Crear Usuario</button>

    <!-- Tabla -->
    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.usuario }}</td>
          <td>{{ usuario.correo }}</td>
          <td>{{ usuario.rol }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2">Editar</button>
            <button class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Crear Usuario -->
    <div class="modal fade show d-block" tabindex="-1" v-if="mostrarModal" style="background-color: rgba(0,0,0,0.5)">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="crearUsuario">
            <div class="modal-header">
              <h5 class="modal-title">Crear Nuevo Usuario</h5>
              <button type="button" class="btn-close" @click="cerrarModal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="usuario" class="form-label">Usuario</label>
                <input v-model="nuevoUsuario.usuario" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="correo" class="form-label">Correo</label>
                <input v-model="nuevoUsuario.correo" type="email" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="contraseña" class="form-label">Contraseña</label>
                <input v-model="nuevoUsuario.contraseña" type="password" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="rol" class="form-label">Rol</label>
                <select v-model="nuevoUsuario.rol" class="form-select" required>
                  <option value="">Selecciona un rol</option>
                  <option value="administrador">Administrador</option>
                  <option value="medico">Medico</option>
                  <option value="admision">Admision</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">Guardar</button>
              <button type="button" class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsuariosCRUD',
  data() {
    return {
      usuarios: [],
      mostrarModal: false,
      nuevoUsuario: {
        usuario: '',
        correo: '',
        contraseña: '',
        rol: ''
      }
    };
  },
  mounted() {
    this.obtenerUsuarios();
  },
  methods: {
    async obtenerUsuarios() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/usuarios', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('No autorizado');

        const data = await res.json();
        this.usuarios = data;
      } catch (error) {
        console.error('❌ Error al obtener usuarios:', error);
        alert('No tienes permisos para ver los usuarios.');
      }
    },
    async crearUsuario() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/usuarios/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(this.nuevoUsuario)
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Error al crear usuario');
        }

        alert('✅ Usuario creado con éxito');
        this.cerrarModal();
        this.obtenerUsuarios(); // Refrescar lista
      } catch (error) {
        console.error('❌ Error al crear usuario:', error);
        alert(`Error: ${error.message}`);
      }
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.nuevoUsuario = {
        usuario: '',
        correo: '',
        contraseña: '',
        rol: ''
      };
    }
  }
};
</script>
