<template>
    <div class="container mt-5 text-center">
      <h4 class="mb-4">Seleccione el servicio</h4>
  
      <div class="row justify-content-center">
        <div
          v-for="servicio in servicios"
          :key="servicio.id"
          class="col-6 col-md-4 col-lg-3 mb-3"
        >
        <button
  class="servicio-btn w-100"
  :class="colorPorServicio(servicio.nombre)"
  @click="seleccionar(servicio)"
>
  <div class="contenido-servicio">
    <span>{{ servicio.nombre }}</span>
    <i class="fas fa-arrow-circle-right"></i>
  </div>
</button>

        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SeleccionServicio',
    data() {
      return {
        servicios: [],
        identidad: null,
      };
    },
    mounted() {
      this.identidad = localStorage.getItem('identidad');
      if (!this.identidad) {
        this.$router.push('/');
      }
      this.cargarServicios();
    },
    methods: {
      async cargarServicios() {
        try {
          const res = await axios.get('http://localhost:3000/servicios/');
          this.servicios = res.data;
        } catch (error) {
          console.error('Error al cargar servicios:', error);
        }
      },
      async seleccionar(servicio) {
        try {
          const res = await axios.post('http://localhost:3000/tickets/publico', {
            identidad: this.identidad,
            servicio_id: servicio.id,
          });
  
          const ticket = res.data;
          localStorage.setItem('ticket_generado', JSON.stringify(ticket));
          this.$router.push('/ticket-generado');
        } catch (error) {
          console.error('Error al generar ticket:', error);
          alert('Error al generar ticket. Intenta de nuevo.');
        }
      },
      colorPorServicio(nombre) {
        const nombreLimpio = nombre.toLowerCase();
        if (nombreLimpio.includes('farmacia')) return 'bg-farmacia';
        if (nombreLimpio.includes('consultorio')) return 'bg-consultorio';
        if (nombreLimpio.includes('emergencia')) return 'bg-emergencia';
        if (nombreLimpio.includes('caja')) return 'bg-caja';
        return 'bg-default';
      }
    }
  };
  </script>
  
  <style scoped>
 .servicio-btn {
  font-size: 1.2rem;
  padding: 20px;
  border: none;
  border-radius: 10px;
  height: 100px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.contenido-servicio {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

  
  .servicio-btn i {
    font-size: 1.4rem;
  }
  
  .servicio-btn:hover {
    transform: scale(1.05);
  }
  
  .bg-farmacia {
    background-color: #28a745 !important;
    color: white;
  }
  
  .bg-consultorio {
    background-color: #007bff !important;
    color: white;
  }
  
  .bg-emergencia {
    background-color: #dc3545 !important;
    color: white;
  }
  
  .bg-caja {
    background-color: #fd7e14 !important;
    color: white;
  }
  
  .bg-default {
    background-color: #6c757d !important;
    color: white;
  }
  </style>
  