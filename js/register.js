
// Toggle password visibility for password field
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
}

// Toggle for confirm password field
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');

if (toggleConfirmPassword && confirmPasswordInput) {
    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
}

// Handle register type switch (Candidato/Empresa)
const candidatoRadio = document.getElementById('candidatoReg');
const empresaRadio = document.getElementById('empresaReg');
const registerTypeTitle = document.getElementById('registerTypeTitle');
const companyFields = document.getElementById('companyFields');
const confirmPasswordField = document.getElementById('confirmPasswordField');
const submitBtn = document.getElementById('submitBtn');

function updateFormForType() {
    if (empresaRadio.checked) {
        // Empresa mode
        registerTypeTitle.innerHTML = `
            <h4 class="h5 text-success fw-semibold">Crear cuenta de empresa</h4>
            <p class="text-muted small">Publica vacantes y encuentra talento verificado</p>
        `;
        companyFields.style.display = 'block';
        confirmPasswordField.style.display = 'none';
        submitBtn.innerHTML = '<i class="fas fa-building me-2"></i> Registrar empresa';
        submitBtn.classList.remove('btn-primary');
        submitBtn.classList.add('btn-success');
        
        // Remove required from confirm password
        if (confirmPasswordInput) confirmPasswordInput.required = false;
        
        // Add required to company fields
        const companyName = document.getElementById('companyName');
        const nit = document.getElementById('nit');
        if (companyName) companyName.required = true;
        if (nit) nit.required = true;
    } else {
        // Candidato mode
        registerTypeTitle.innerHTML = `
            <h4 class="h5 text-primary fw-semibold">Crear cuenta de candidato</h4>
            <p class="text-muted small">Comienza a explorar miles de oportunidades laborales</p>
        `;
        companyFields.style.display = 'none';
        confirmPasswordField.style.display = 'block';
        submitBtn.innerHTML = '<i class="fas fa-user-plus me-2"></i> Crear mi cuenta';
        submitBtn.classList.remove('btn-success');
        submitBtn.classList.add('btn-primary');
        
        // Add required to confirm password
        if (confirmPasswordInput) confirmPasswordInput.required = true;
        
        // Remove required from company fields
        const companyName = document.getElementById('companyName');
        const nit = document.getElementById('nit');
        if (companyName) companyName.required = false;
        if (nit) nit.required = false;
    }
}

if (candidatoRadio && empresaRadio) {
    candidatoRadio.addEventListener('change', updateFormForType);
    empresaRadio.addEventListener('change', updateFormForType);
}

// Validate password strength
function validatePassword(password) {
    if (password.length < 8) {
        return { valid: false, message: 'La contraseña debe tener al menos 8 caracteres' };
    }
    return { valid: true, message: '' };
}

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'warning' ? 'warning' : type === 'success' ? 'success' : 'info';
    const icon = type === 'warning' ? 'exclamation-triangle' : type === 'success' ? 'check-circle' : 'info-circle';
    
    notification.className = `alert alert-${bgColor} position-fixed top-0 end-0 m-3 shadow`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.style.animation = 'slideInRight 0.3s ease-out';
    notification.innerHTML = `
        <i class="fas fa-${icon} me-2"></i>
        ${message}
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Handle register form submission
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName')?.value || '';
        const lastName = document.getElementById('lastName')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const password = passwordInput?.value || '';
        const termsCheck = document.getElementById('termsCheck')?.checked || false;
        const isEmpresa = empresaRadio.checked;
        
        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            showNotification('Por favor completa todos los campos obligatorios', 'warning');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor ingresa un correo electrónico válido', 'warning');
            return;
        }
        
        // Validate password
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            showNotification(passwordValidation.message, 'warning');
            return;
        }
        
        // Validate confirm password for candidato
        if (!isEmpresa) {
            const confirmPassword = confirmPasswordInput?.value || '';
            if (password !== confirmPassword) {
                showNotification('Las contraseñas no coinciden', 'warning');
                return;
            }
        }
        
        // Validate company fields for empresa
        if (isEmpresa) {
            const companyName = document.getElementById('companyName')?.value || '';
            const nit = document.getElementById('nit')?.value || '';
            if (!companyName || !nit) {
                showNotification('Por favor completa los datos de la empresa', 'warning');
                return;
            }
        }
        
        // Validate terms
        if (!termsCheck) {
            showNotification('Debes aceptar los Términos de Servicio y Política de Privacidad', 'warning');
            return;
        }
        
        // Simulate successful registration
        const userType = isEmpresa ? 'Empresa' : 'Candidato';
        showNotification(`¡Registro exitoso! Bienvenido ${firstName} ${lastName} (${userType})`, 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
}

// Terms link handler
const termsLink = document.getElementById('termsLink');
if (termsLink) {
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Consulta nuestros términos y condiciones en nuestra página', 'info');
    });
}

// Add animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
