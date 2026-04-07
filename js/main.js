// Datos de empleos
const jobs = [
    { title: "Frontend Developer", company: "Tigo El Salvador", location: "San Salvador", salary: "$1,800–$2,500" },
    { title: "UX Designer Senior", company: "Banco Agrícola", location: "Santa Tecla", salary: "$1,500–$2,200" },
    { title: "Backend Engineer", company: "Applaudo Studios", location: "Remoto", salary: "$2,500–$3,800" }
];

// Datos de categorías
const categories = [
    { name: "Tecnología", count: "1,240 empleos", icon: "fas fa-code" },
    { name: "Diseño", count: "380 empleos", icon: "fas fa-palette" },
    { name: "Finanzas", count: "620 empleos", icon: "fas fa-chart-line" },
    { name: "Ingeniería", count: "520 empleos", icon: "fas fa-microchip" }
];

// Cargar empleos
function loadJobs() {
    const container = document.getElementById('jobsContainer');
    if (!container) return;
    
    container.innerHTML = jobs.map(job => `
        <div class="col-md-6">
            <div class="job-card">
                <h6 class="job-title">${job.title}</h6>
                <p class="company-name">${job.company}</p>
                <p>${job.location} · ${job.salary}</p>
                <button class="btn btn-primary btn-sm">Postular</button>
            </div>
        </div>
    `).join('');
}

// Cargar categorías
function loadCategories() {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;
    
    container.innerHTML = categories.map(cat => `
        <div class="col-md-3 col-6">
            <div class="category-card">
                <i class="${cat.icon}" style="font-size: 2rem; color: var(--primary);"></i>
                <h6>${cat.name}</h6>
                <p class="text-muted small">${cat.count}</p>
            </div>
        </div>
    `).join('');
}

// Ejecutar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    loadJobs();
    loadCategories();
});
