// IntegraJobs - Main JavaScript

// Job Data
const jobs = [
    {
        title: "Frontend Developer",
        company: "Tigo El Salvador",
        location: "San Salvador",
        salary: "$1,800–$2,500",
        time: "Hace 2 días",
        tags: ["React"]
    },
    {
        title: "UX Designer Senior",
        company: "Banco Agrícola",
        location: "Santa Tecla",
        salary: "$1,500–$2,200",
        time: "Hace 1 día",
        tags: ["Presencial"]
    },
    {
        title: "Backend Engineer",
        company: "Applaudo Studios",
        location: "Remoto",
        salary: "$2,500–$3,800",
        time: "Hace 3 días",
        tags: ["Node.js"]
    }
];

// Categories Data
const categories = [
    { name: "Tecnología", count: "1,240 empleos", icon: "fas fa-code" },
    { name: "Diseño", count: "380 empleos", icon: "fas fa-palette" },
    { name: "Finanzas", count: "620 empleos", icon: "fas fa-chart-line" },
    { name: "Ingeniería", count: "520 empleos", icon: "fas fa-microchip" },
    { name: "Salud", count: "290 empleos", icon: "fas fa-heartbeat" },
    { name: "Educación", count: "180 empleos", icon: "fas fa-graduation-cap" },
    { name: "Retail", count: "340 empleos", icon: "fas fa-store" },
    { name: "Marketing", count: "410 empleos", icon: "fas fa-chart-simple" }
];

// Load Jobs
function loadJobs() {
    const jobsContainer = document.getElementById('jobsContainer');
    if (!jobsContainer) return;

    jobsContainer.innerHTML = jobs.map(job => `
        <div class="col-md-6 col-lg-4">
            <div class="job-card">
                <h5 class="job-title">${job.title}</h5>
                <div class="company-name">${job.company}</div>
                <div class="job-details">
                    <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                    <span><i class="fas fa-clock"></i> ${job.time}</span>
                </div>
                <div class="mb-3">
                    <strong>${job.salary}</strong>
                </div>
                <div>
                    ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
                </div>
                <hr>
                <button class="btn btn-outline-primary btn-sm w-100">Ver detalles</button>
            </div>
        </div>
    `).join('');
}

// Load Categories
function loadCategories() {
    const categoriesContainer = document.getElementById('categoriesContainer');
    if (!categoriesContainer) return;

    categoriesContainer.innerHTML = categories.map(cat => `
        <div class="col-md-3 col-sm-6">
            <div class="category-card" onclick="filterByCategory('${cat.name}')">
                <i class="${cat.icon}"></i>
                <h6 class="mb-1">${cat.name}</h6>
                <p class="small">${cat.count}</p>
            </div>
        </div>
    `).join('');
}

// Filter function
function filterByCategory(category) {
    alert(`Mostrando empleos en ${category}`);
    // Here you would typically filter and reload jobs
}

// Search functionality
function setupSearch() {
    const searchBtn = document.querySelector('.search-card .btn-primary');
    const searchInputs = document.querySelectorAll('.search-card input');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInputs[0]?.value || '';
            const location = searchInputs[1]?.value || '';
            
            if (searchTerm.trim() === '' && location.trim() === '') {
                showNotification('Por favor ingresa un cargo o ubicación', 'warning');
            } else {
                showNotification(`Buscando: ${searchTerm} en ${location}`, 'info');
                // Here you would implement actual search functionality
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'warning' ? 'warning' : 'info'} position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
        <i class="fas fa-${type === 'warning' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Explore jobs button
function setupExploreButton() {
    const exploreBtn = document.getElementById('exploreJobsBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            showNotification('Explorando todos los empleos disponibles', 'info');
            // Scroll to jobs section
            document.querySelector('.bg-light')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Navbar scroll effect
function setupNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadJobs();
    loadCategories();
    setupSearch();
    setupSmoothScroll();
    setupExploreButton();
    setupNavbarScroll();
    
    // Add animation to stats when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});

// Export for any additional functionality
window.filterByCategory = filterByCategory;