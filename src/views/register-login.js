import { router } from "../router/router.js";
import { Login } from "../views/login.js";


export function Register() {
  const app = document.getElementById("app");

  app.innerHTML = `
        <main class="auth-container">
            <section class="auth-card">

            <header class="auth-header">
                <h1>Observatorio Urbano y Ambiental</h1>
                <p>Acceso a plataforma GovTech</p>
            </header>

            <form class="auth-form">
                <div class="form-group">
                <label for="user">el nombre que desees</label>
                <input id="user" type="text" placeholder="nombre que desees">
                </div>

                <div class="form-group">
                <label for="email">Correo electrónico</label>
                <input id="email" type="email" placeholder="admin@govtech.com" required />
                </div>

                <div class="form-group">
                <label for="password">Contraseña</label>
                <input id="password" type="password" placeholder="••••••••" required />
                </div>

                <button type="submit" class="btn btn-primary" id="regBtn" >
                Iniciar sesión
                </button>

                <p class="auth-error hidden">
                Credenciales inválidas. Intenta nuevamente.
                </p>
            <p>¿No tienes cuenta? <span id="goRegister" style="color:blue;cursor:pointer">Regístrate</span></p>
            <p id="loginMsg" style="color:red;"></p>

            </form>

            <footer class="auth-footer">
                <p>Proyecto educativo – Riwi GovTech</p>
            </footer>

            </section>

        </main>
  `;

  document.getElementById("regBtn").addEventListener("click", register);
  document.getElementById("goLogin").addEventListener("click", () => {
    import("./login.js").then(module => module.renderLogin());
  });
}

async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("mail").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("regMsg");

  if (!name || !email || !password) {
    msg.textContent = "Todos los campos son obligatorios";
    return;
  }

  // Revisa si ya existe
  const resCheck = await fetch(`http://localhost:3000/users?email=${email}`);
  const users = await resCheck.json();
  if (users.length > 0) {
    msg.textContent = "El email ya está registrado";
    return;
  }

  // Registra usuario
  const res = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  if (res.ok) {
    msg.style.color = "green";
    msg.textContent = "Usuario registrado! Redirigiendo al login...";
    setTimeout(() => {
      import("./login.js").then(module => module.renderLogin());
    }, 1500);
  }
}