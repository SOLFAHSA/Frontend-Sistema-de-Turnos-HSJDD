<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <div class="card shadow p-4" style="width: 100%; max-width: 400px;">
      <h2 class="text-center mb-4">Ingreso al Sistema</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="correo" class="form-label">Correo</label>
          <input
            type="email"
            v-model="correo"
            class="form-control"
            id="correo"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        <div class="mb-3">
          <label for="contraseña" class="form-label">Contraseña</label>
          <input
            type="password"
            v-model="contraseña"
            class="form-control"
            id="contraseña"
            placeholder="Tu contraseña"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      correo: "",
      contraseña: ""
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("http://localhost:3000/usuarios/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            correo: this.correo,
            contraseña: this.contraseña
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Error al iniciar sesión");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        if (data.usuario.rol === "administrador") {
          this.$router.push("/admin");
        } else {
          alert("Tu rol no tiene acceso al panel administrativo");
        }
      } catch (error) {
        alert(`❌ ${error.message}`);
      }
    }
  }
};
</script>
