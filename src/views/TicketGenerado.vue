<template>
    <div class="container mt-5 text-center">
      <h3 class="mb-4 text-primary">¡Turno Generado!</h3>
  
      <div class="card shadow mx-auto p-4" style="max-width: 400px;">
        <h1 class="display-4">{{ ticket.letra }}{{ ticket.numero_ticket }}</h1>
        <hr />
        <p><strong>Paciente:</strong> {{ ticket.paciente?.nombres }} {{ ticket.paciente?.apellidos }}</p>
        <p><strong>Servicio:</strong> {{ ticket.servicio?.nombre }}</p>
        <p><strong>Fecha:</strong> {{ ticket.fecha }}</p>
        <p><strong>Hora:</strong> {{ ticket.hora }}</p>
  
        <div class="mt-4 d-flex justify-content-center gap-2">
          <button class="btn btn-secondary" @click="generarOtro">Generar Otro</button>
          <button class="btn btn-primary" @click="imprimir">Imprimir</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TicketGenerado',
    data() {
      return {
        ticket: {}
      };
    },
    mounted() {
      const data = localStorage.getItem('ticket_generado');
      if (!data) {
        this.$router.push('/');
      } else {
        this.ticket = JSON.parse(data);
      }
    },
    methods: {
      imprimir() {
        window.print();
      },
      generarOtro() {
        localStorage.removeItem('identidad');
        localStorage.removeItem('ticket_generado');
        this.$router.push('/registro-publico');
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    background: #f8f9fa;
    border-radius: 12px;
  }
  
  .display-4 {
    font-size: 4rem;
    font-weight: bold;
    color: #003366;
  }
  </style>
  