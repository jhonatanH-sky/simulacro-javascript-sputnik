// Vista: Crear Proyecto
export function CreateProjectView() {
  return `
    <main class="container">
      <section class="create-project-container">

        <header class="create-header">
          <h2>Crear nuevo proyecto</h2>
          <p>Registra un proyecto urbano para monitoreo climático</p>
        </header>

        <form class="create-form" id="createProjectForm">

          <div class="form-group">
            <label for="name">Nombre del proyecto</label>
            <input
              type="text"
              id="name"
              placeholder="Monitoreo Ciudad de Bogotá"
              required
            />
          </div>

          <div class="form-group">
            <label for="city">Ciudad</label>
            <input
              type="text"
              id="city"
              placeholder="Bogotá"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="lat">Latitud</label>
              <input
                type="number"
                id="lat"
                step="any"
                placeholder="4.7110"
                required
              />
            </div>

            <div class="form-group">
              <label for="lon">Longitud</label>
              <input
                type="number"
                id="lon"
                step="any"
                placeholder="-74.0721"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="status">Estado del proyecto</label>
            <select id="status" required>
              <option value="">Selecciona un estado</option>
              <option value="activo">Activo</option>
              <option value="pendiente">Pendiente</option>
              <option value="finalizado">Finalizado</option>
            </select>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">
              Guardar proyecto
            </button>
            <a href="#/" class="btn btn-outline">
              Cancelar
            </a>
          </div>

          <p class="form-message success hidden">
            Proyecto creado exitosamente
          </p>

        </form>

      </section>
    </main>
  `;
}

// Lógica del formulario de creación de proyectos
export function initCreateProject() {
  // Obtiene el formulario desde el DOM
  const form = document.getElementById("createProjectForm");

  // Si el formulario no existe, se detiene la ejecución
  // (evita errores cuando esta vista no está cargada)
  if (!form) return;

  // Escucha el evento submit del formulario
  form.addEventListener("submit", (e) => {
    // Evita que la página se recargue al enviar el formulario
    e.preventDefault();

    // Crea un objeto proyecto con los valores ingresados por el usuario
    const project = {
      name: document.getElementById("name").value.trim(),
      city: document.getElementById("city").value.trim(),
      lat: document.getElementById("lat").value,
      lon: document.getElementById("lon").value,
      status: document.getElementById("status").value,
    };

    // Obtiene los proyectos guardados en localStorage
    // Si no existen, se inicializa un arreglo vacío
    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    // Agrega el nuevo proyecto al arreglo
    projects.push(project);

    // Guarda el arreglo actualizado en localStorage
    localStorage.setItem("projects", JSON.stringify(projects));

    // Muestra el mensaje de éxito al usuario
    const successMsg = document.querySelector(".form-message.success");
    successMsg.classList.remove("hidden");

    // Limpia los campos del formulario
    form.reset();

    // Redirige a la vista principal después de 1 segundo
    setTimeout(() => {
      location.hash = "#/";
    }, 2000);
  });
}
