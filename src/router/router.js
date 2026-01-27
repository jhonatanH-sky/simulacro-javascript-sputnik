import { HomeView } from "../views/home.js";
import {
  CreateProjectView,
  initCreateProject,
} from "../views/CreateProjectView.js";

// Definición de rutas de la aplicación (hash-based routing)
const routes = {
  "/": HomeView,
  "/crear-proyecto": CreateProjectView,
};

export function router() {
  // Obtiene la ruta actual desde el hash de la URL
  const path = location.hash.replace("#", "") || "/";

  // Selecciona la vista asociada a la ruta
  const view = routes[path];

  // Manejo de rutas no existentes
  if (!view) {
    document.getElementById("app").innerHTML =
      "<h2>Página no encontrada</h2>";
    return;
  }

  // Renderiza la vista en el contenedor principal
  document.getElementById("app").innerHTML = view();

  // Inicializa la lógica específica de la vista
  if (path === "/crear-proyecto") {
    initCreateProject();
  }
}
