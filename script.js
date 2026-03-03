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
        button.addEventListener('click', function (e) {
            // Only apply to hash links
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
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
        const submitBtn = form.querySelector('.submit-btn');
        const inputs = form.querySelectorAll('input, select, textarea');

        function checkFormValidity() {
            if (form.checkValidity()) {
                submitBtn.removeAttribute('disabled');
            } else {
                submitBtn.setAttribute('disabled', 'true');
            }
        }

        // Check on every input
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('is-invalid');
                checkFormValidity();
            });

            // Also check on blur for better UX
            input.addEventListener('blur', () => {
                if (!input.checkValidity()) {
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });
        });

        // Initial check
        checkFormValidity();

        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    }
});
