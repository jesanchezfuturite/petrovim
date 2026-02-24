document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Navbar Background on Scroll
       ========================================================================== */
    const navbar = document.getElementById('mainNavbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Run once on load just in case the page is already scrolled
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    /* ==========================================================================
       2. Smooth Scrolling
       ========================================================================== */
    const scrollButtons = document.querySelectorAll('.js-scroll-btn, .nav-link');
    
    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only apply to hash links
            if(this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close collapse if open (mobile navbar)
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }

                    // Calculate offset taking navbar into account
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ==========================================================================
       3. Form Validation
       ========================================================================== */
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Name Validation (Not empty)
            const nombre = document.getElementById('nombre');
            if (nombre.value.trim() === '') {
                nombre.classList.add('is-invalid');
                isValid = false;
            } else {
                nombre.classList.remove('is-invalid');
                nombre.classList.add('is-valid');
            }

            // Email Validation (Regex)
            const correo = document.getElementById('correo');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo.value.trim())) {
                correo.classList.add('is-invalid');
                isValid = false;
            } else {
                correo.classList.remove('is-invalid');
                correo.classList.add('is-valid');
            }

            // Phone Validation (Only numbers, minimum 10 digits)
            const telefono = document.getElementById('telefono');
            const phoneRegex = /^[0-9]{10,}$/;
            if (!phoneRegex.test(telefono.value.trim('\s\(\)\-'))) {
                telefono.classList.add('is-invalid');
                isValid = false;
            } else {
                telefono.classList.remove('is-invalid');
                telefono.classList.add('is-valid');
            }
            
            // Prevent submission if invalid
            if (!isValid) {
                event.preventDefault();
                event.stopPropagation();
            }
        }, false);
        
        // Remove 'is-invalid' class on input focus
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('is-invalid');
                // Optional: you can re-validate instantly here if desired
            });
        });
    }

});
