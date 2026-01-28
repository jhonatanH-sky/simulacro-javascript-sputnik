export function renderError(code = 500) {
  const errores = {
    404: {
      titulo: "Recurso no encontrado",
      mensaje: "El recurso solicitado no existe o fue eliminado."
    },
    500: {
      titulo: "Error interno del servidor",
      mensaje: "Ocurrió un error inesperado. Intenta nuevamente más tarde."
    },
    503: {
      titulo: "Servicio no disponible",
      mensaje: "No se pudo conectar con la API de Open-Meteo."
    }
  };

  const error = errores[code] || errores[500];

  return `
    <section class="error-container">
      <div class="error-card">
        <h2>${error.titulo}</h2>
        <p>${error.mensaje}</p>
        <button id="retryBtn">Reintentar</button>
      </div>
    </section>
  `;
}
