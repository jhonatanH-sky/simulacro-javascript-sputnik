// Obtener parámetro ?id=
const params = new URLSearchParams(window.location.search);
const idProyecto = params.get("id");

// Buscar proyecto
const proyecto = proyectos.find(p => p.id === idProyecto);

// Si no existe → error
if (!proyecto) {
window.location.href = "error.html?code=404";
}

// Renderizar vista
const app = document.getElementById("app");

app.innerHTML = `
<div class="detail-container">
<div class="container">

    <a href="/" class="back-button">← Volver al listado</a>

    <div class="detail-header">
    <h1 class="detail-title">${proyecto.nombre}</h1>
    <p class="detail-coords">Lat: ${proyecto.lat} / Lon: ${proyecto.lon}</p>
    <span class="badge active">${proyecto.estado}</span>
    <p class="detail-description">${proyecto.descripcion}</p>
    </div>

    <section class="current-weather">
    <h2>Condiciones Actuales</h2>
    <p class="temp-number">${proyecto.temperatura}</p>
    <p class="temp-feels">Sensación térmica: ${proyecto.sensacion}°C</p>
    </section>

    <section class="metrics-grid">
    <p>🌬 Viento: ${proyecto.viento} (${proyecto.direccionViento})</p>
    <p> Humedad: ${proyecto.humedad}</p>
    <p> Visibilidad: ${proyecto.visibilidad}</p>
    </section>

    <section class="sun-info">
    <p> Amanecer: ${proyecto.amanecer}</p>
    <p> Atardecer: ${proyecto.atardecer}</p>
    </section>

    <p class="update-date">Última actualización: ${proyecto.actualizado}</p>

</div>
</div>
`;
