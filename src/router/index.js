import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../views/LoginForm.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import RegistroPublico from '../components/RegistroPublico.vue';
import SeleccionServicio from '../views/SeleccionServicio.vue';
import TicketGenerado from '../views/TicketGenerado.vue';

const routes = [
  { path: '/', component: LoginForm },
  { path: '/admin', component: AdminDashboard },
  { path: '/registro-publico',component: RegistroPublico},
  { path: '/seleccionar-servicio',component: SeleccionServicio},
  { path: '/ticket-generado', component: TicketGenerado }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
