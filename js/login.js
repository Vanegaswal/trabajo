// login.js - Funcionalidades de la página de inicio de sesión

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // TOGGLE PASSWORD VISIBILITY
    // ============================================
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
    
    // ============================================
    // HANDLE LOGIN FORM SUBMISSION
    // ============================================
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const userType = document.querySelector('input[name="userType"]:checked').id;
            
            // Validar campos vacíos
            if (!email || !password) {
                showNotification('Por favor completa todos los campos', 'warning');
                return;
            }
            
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor ingresa un correo electrónico válido', 'warning');
                return;
            }
            
            // Validar contraseña mínima
            if (password.length < 6) {
                showNotification('La contraseña debe tener al menos 6 caracteres', 'warning');
                return;
            }
            
            // Simular login según tipo de usuario
            if (userType === 'candidato') {
                showNotification('¡Bienvenida Candidata! Redirigiendo al panel...', 'success');
                setTimeout(() => {
                    window.location.href = 'candidato.html';
                }, 1500);
            } else {
                showNotification('¡Bienvenido Empresa! Redirigiendo al dashboard...', 'success');
                setTimeout(() => {
                    window.location.href = 'empresa.html';
                }, 1500);
            }
        });
    }
    
    // ============================================
    // FORGOT PASSWORD HANDLER
    // ============================================
    const forgotPassword = document.getElementById('forgotPassword');
    
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Instrucciones de recuperación enviadas a tu correo electrónico', 'info');
        });
    }
    
    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        
        // Configurar según el tipo
        let bgColor, icon;
        switch(type) {
            case 'warning':
                bgColor = 'warning';
                icon = 'exclamation-triangle';
                break;
            case 'success':
                bgColor = 'success';
                icon = 'check-circle';
                break;
            default:
                bgColor = 'info';
                icon = 'info-circle';
        }
        
        notification.className = `alert alert-${bgColor} position-fixed top-0 end-0 m-3 shadow`;
        notification.style.zIndex = '9999';
        notification.style.minWidth = '300px';
        notification.style.animation = 'slideInRight 0.3s ease-out';
        notification.innerHTML = `<i class="fas fa-${icon} me-2"></i>${message}`;
        
        // Agregar al body
        document.body.appendChild(notification);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (notification && notification.remove) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
    
});