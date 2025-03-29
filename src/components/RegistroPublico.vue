<template>
    <div class="container mt-5 text-center">
      <img src="/logo.png" alt="Logo" class="mb-3" style="height: 100px;" />
      <h5 class="text-primary mb-3">Ingrese su número de Identificación</h5>
  
      <input
        v-model="identidad"
        maxlength="13"
        class="form-control form-control-lg text-center mb-3"
        placeholder="Ej: 0801199912345"
        readonly
      />
  
      <!-- Teclado Numérico -->
      <div class="row row-cols-3 g-2 mb-3">
        <div v-for="n in teclas" :key="n" class="col">
          <button @click="agregarNumero(n)" class="btn btn-primary w-100">{{ n }}</button>
        </div>
        <div class="col">
          <button @click="limpiar" class="btn btn-danger w-100">LIMPIAR</button>
        </div>
        <div class="col">
          <button @click="agregarNumero(0)" class="btn btn-primary w-100">0</button>
        </div>
        <div class="col">
          <button @click="borrarUltimo" class="btn btn-danger w-100">BORRAR</button>
        </div>
      </div>
  
      <button @click="verificarIdentidad" class="btn btn-success btn-lg w-100">ACEPTAR</button>
  
      <!-- Modal de registro -->
      <div class="modal fade" id="registroModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Registro de Paciente</h5>
            </div>
            <div class="modal-body">
              <input v-model="nuevoPaciente.nombres" class="form-control mb-2" placeholder="Nombres" />
              <input v-model="nuevoPaciente.apellidos" class="form-control mb-2" placeholder="Apellidos" />
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button class="btn btn-primary" @click="registrarPaciente">Registrar</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal de bienvenida -->
      <div class="modal fade" id="bienvenidaModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body text-center">
                <h4 class="mb-2">¡Bienvenido!</h4>
                <h5>{{ pacienteEncontrado.nombres }} {{ pacienteEncontrado.apellidos }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import pacienteService from '../services/pacienteService';
  import { Modal } from 'bootstrap';
  
  export default {
    name: 'RegistroPublico',
    data() {
      return {
        identidad: '',
        teclas: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        pacienteEncontrado: {},
        nuevoPaciente: {
          nombres: '',
          apellidos: ''
        }
      };
    },
    methods: {
      agregarNumero(num) {
        if (this.identidad.length < 13) {
          this.identidad += num;
        }
      },
      borrarUltimo() {
        this.identidad = this.identidad.slice(0, -1);
      },
      limpiar() {
        this.identidad = '';
      },
      async verificarIdentidad() {
        if (this.identidad.length !== 13) {
          alert('Debe ingresar exactamente 13 dígitos de identidad');
          return;
        }
  
        try {
          const res = await pacienteService.obtenerPorIdentidad(this.identidad);
          if (res) {
            this.pacienteEncontrado = res;
            localStorage.setItem('identidad', this.identidad);
            new Modal(document.getElementById('bienvenidaModal')).show();
            setTimeout(() => {
              this.$router.push('/seleccionar-servicio');
            }, 2000);
          } else {
            new Modal(document.getElementById('registroModal')).show();
          }
        } catch (error) {
          console.error('Error al verificar identidad:', error);
        }
      },
      async registrarPaciente() {
        try {
          const nuevo = {
            identidad: this.identidad,
            ...this.nuevoPaciente
          };
          await pacienteService.crearPaciente(nuevo);
          localStorage.setItem('identidad', this.identidad);
          new Modal(document.getElementById('registroModal')).hide();
          new Modal(document.getElementById('bienvenidaModal')).show();
          setTimeout(() => {
            this.$router.push('/seleccionar-servicio');
          }, 2000);
        } catch (error) {
          console.error('Error al registrar paciente:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
.container {
  max-width: 450px;
  margin: 0 auto;
}

input.form-control {
  font-size: 1.2rem;
  height: 45px;
}

button.btn {
  font-size: 1rem;
  height: 50px;
  padding: 6px 0;
}

h5 {
  font-size: 1.1rem;
}

/* Estilo responsivo para pantallas más pequeñas */
@media (max-width: 576px) {
  .container {
    padding: 10px;
  }

  input.form-control {
    font-size: 1rem;
    height: 40px;
  }

  button.btn {
    font-size: 0.95rem;
    height: 45px;
  }
}
</style>

  