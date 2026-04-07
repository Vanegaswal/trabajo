// Manejar navegación
function showPage(pageId) {
    document.querySelectorAll('[id$="Page"]').forEach(el => el.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

// Ver CV del candidato
function cargarCV(nombreCandidato, nombreArchivo) {
    document.getElementById('cvCandidateName').textContent = nombreCandidato;
    document.getElementById('cvFileName').textContent = nombreArchivo;
}

// Ver vacante
function verVacante(id) {
    alert('Ver vacante: ' + id);
}

// Editar vacante
function editarVacante(id) {
    alert('Editar vacante: ' + id);
}

// Eliminar vacante
function eliminarVacante(id) {
    if (confirm('¿Eliminar esta vacante?')) {
        alert('Vacante eliminada');
    }
}

// Ver candidato
function verCandidato(id) {
    alert('Ver perfil del candidato: ' + id);
}

// Crear vacante
function crearVacante() {
    alert('Vacante creada exitosamente');
    bootstrap.Modal.getInstance(document.getElementById('nuevaVacanteModal')).hide();
}

// Editar empresa
function editarEmpresa() {
    alert('Editar perfil de la empresa');
}

// Eliminar cuenta
function eliminarCuenta() {
    if (confirm('¿Realmente deseas eliminar tu cuenta?')) {
        alert('Cuenta eliminada');
    }
}

// Navegación por menú
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            
            if (page === 'dashboard') showPage('dashboardPage');
            else if (page === 'mis-vacantes') showPage('misVacantesPage');
            else if (page === 'candidatos') showPage('candidatosPage');
            else if (page === 'mi-empresa') showPage('miEmpresaPage');
            else if (page === 'configuracion') showPage('configuracionPage');
        });
    });
});
