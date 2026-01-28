


const app = document.getElementById("app");

export function Login() {
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
                <input id="logUser" type="text" placeholder="nombre que desees">
                </div>

                <div class="form-group">
                <label for="email">Correo electrónico</label>
                <input id="loginEmail" type="email" placeholder="admin@govtech.com" required />
                </div>

                <div class="form-group">
                <label for="password">Contraseña</label>
                <input id="loginPassword" type="password" placeholder="••••••••" required />
                </div>

                <button type="submit" class="btn btn-primary">
                Iniciar sesión
                </button>

                <p class="auth-error hidden">
                Credenciales inválidas. Intenta nuevamente.
                </p>
            </form>

            <footer class="auth-footer">
                <p>Proyecto educativo – Riwi GovTech</p>
            </footer>

            </section>

            <p>¿No tienes cuenta? <span id="goRegister" style="color:blue;cursor:pointer">Regístrate</span></p>
            <p id="loginMsg" style="color:red;"></p>
            
        </main>
  `;

  document.getElementById("loginBtn").addEventListener("click", login);
  document.getElementById("goRegister").addEventListener("click", renderRegister);
}

async function renderLogin() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMsg");

  if (!email || !password) {
    msg.textContent = "Todos los campos son obligatorios";
    return;
  }

  const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
  const users = await res.json();

  if (users.length > 0) {
    localStorage.setItem("user", JSON.stringify(users[0]));
    app.innerHTML = `<h2>Bienvenido, ${users[0].name}</h2>
                     <button id="logoutBtn">Cerrar sesión</button>`;
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("user");
      renderLogin();
    });
  } else {
    msg.textContent = "Email o contraseña incorrectos";
  }
}

// Inicializar login o sesión activa
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  app.innerHTML = `<h2>Bienvenido, ${user.name}</h2>
                   <button id="logoutBtn">Cerrar sesión</button>`;
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("user");
    renderLogin();
  });
} else {
  renderLogin();
}