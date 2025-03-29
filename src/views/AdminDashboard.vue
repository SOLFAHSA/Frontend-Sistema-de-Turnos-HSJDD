<template>
  <div class="d-flex" style="min-height: 100vh">
    <!-- Sidebar -->
    <div class="bg-dark text-white p-3" style="width: 250px">
      <h4 class="text-center mb-4">🏥 HSJD</h4>
      <ul class="nav flex-column">
        <li class="nav-item" v-for="item in menuItems" :key="item.nombre">
          <a
            class="nav-link text-white d-flex align-items-center"
            href="#"
            @click.prevent="componenteActivo = item.componente"
          >
            <i :class="item.icono" class="me-2"></i> {{ item.nombre }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Main content -->
    <div class="flex-grow-1">
      <nav class="navbar bg-light shadow-sm px-4">
        <div class="ms-auto dropdown">
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            {{ usuario.usuario }} ({{ usuario.rol }})
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Mi Perfil</a></li>
            <li><a class="dropdown-item" @click="cerrarSesion">Cerrar sesión</a></li>
          </ul>
        </div>
      </nav>

      <!-- Contenido principal -->
      <div class="p-4">
        <component :is="componenteActivo" />
      </div>
    </div>
  </div>
</template>

<script>
import UsuariosCRUD from '../components/UsuariosCRUD.vue';
import MedicosCRUD from '../components/MedicosCRUD.vue';
import PacientesCRUD from '../components/PacientesCRUD.vue';
import ConsultoriosCRUD from '../components/ConsultoriosCRUD.vue';
import PrioridadesCRUD from '../components/PrioridadesCRUD.vue';
import ServiciosCRUD from '../components/ServiciosCRUD.vue';
import ReportesVista from '../components/ReportesVista.vue';
import InicioVista from '../components/InicioVista.vue';

export default {
  name: 'AdminDashboard',
  components: {
    UsuariosCRUD,
    MedicosCRUD,
    PacientesCRUD,
    ConsultoriosCRUD,
    PrioridadesCRUD,
    ServiciosCRUD,
    ReportesVista,
    InicioVista
  },
  data() {
    return {
      usuario: {
        usuario: '',
        rol: ''
      },
      componenteActivo: 'InicioVista',
      menuItems: [
        { nombre: 'Inicio', icono: 'bi bi-house-door', componente: 'InicioVista' },
        { nombre: 'Registrar Usuarios', icono: 'bi bi-person-plus', componente: 'UsuariosCRUD' },
        { nombre: 'Registrar Médicos', icono: 'bi bi-person-badge', componente: 'MedicosCRUD' },
        { nombre: 'Registrar Pacientes', icono: 'bi bi-person-lines-fill', componente: 'PacientesCRUD' },
        { nombre: 'Consultorios', icono: 'bi bi-hospital', componente: 'ConsultoriosCRUD' },
        { nombre: 'Prioridades', icono: 'bi bi-exclamation-circle', componente: 'PrioridadesCRUD' },
        { nombre: 'Servicios', icono: 'bi bi-gear', componente: 'ServiciosCRUD' },
        { nombre: 'Reportes', icono: 'bi bi-file-bar-graph', componente: 'ReportesVista' }
      ]
    };
  },
  mounted() {
    const storedUser = localStorage.getItem('usuario');
    if (!storedUser) {
      return this.$router.push('/');
    }

    this.usuario = JSON.parse(storedUser);
    if (this.usuario.rol !== 'administrador') {
      alert('No tienes permisos para acceder.');
      return this.$router.push('/');
    }
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
};
</script>

<style>
.nav-link {
  transition: background-color 0.2s ease;
}
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}
</style>
