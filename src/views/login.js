export {users} from "../"



export function login() {
    document.body.className = "auth.body "
    const div  = document.createElement("div");

    div.innerHTML`
        <main class="auth-container">
            <section class="auth-card">

            <header class="auth-header">
                <h1>Observatorio Urbano y Ambiental</h1>
                <p>Acceso a plataforma GovTech</p>
            </header>

            <form class="auth-form">
                <div class="form-group">
                <label for="email">Correo electrónico</label>
                <input id="email" type="email" placeholder="admin@govtech.com" required />
                </div>

                <div class="form-group">
                <label for="password">Contraseña</label>
                <input id="password" type="password" placeholder="••••••••" required />
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
        </main>`

        const email = div.querySelector ("#email");
        const password = div.querySelector ("#password");
        const auhtError = div.querySelector (".auth-error");
        
        const form = div.querySelector("form");
        form.addEventListener("submit", async (e)=>{
            e.preventDefault();
            const users = await obtenerUsuarios();

            if (validarLogin(email.value, password.value, users))
            {
                auhtError.classList.add("hidden")
                Storage.user  = "juan"
                iniciarSesion();
                location.has = "#/home"
            }
            else
            {
                autError.classList.remove("hidden")
            }
            
        })

        function validarLogin (email, password, user){
            for(const user of users){
                if (user.user === email && user.password == password) {return true}
            }
            return false
        }
        return div
}

