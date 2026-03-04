document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       0. Capturar parámetros UTM de la URL
       ========================================================================== */
    const urlParams = new URLSearchParams(window.location.search);
    const data_utm = {
        utm_id: urlParams.get('utm_id') || "",
        utm_campaign: urlParams.get('utm_campaign') || "",
        utm_source: urlParams.get('utm_source') || "",
        utm_medium: urlParams.get('utm_medium') || "",
        utm_content: urlParams.get('utm_content') || "",
        utm_term: urlParams.get('utm_term') || ""
    };

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
            if (form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();

                const nombre = form.querySelector("input[name='nombre']").value.trim();
                const correo = form.querySelector("input[name='correo']").value.trim();
                const telefono = form.querySelector("input[name='telefono']").value.trim();
                const empresa = form.querySelector("input[name='empresa']").value.trim();
                const estado = form.querySelector("input[name='estado']").value.trim();
                const volumen = form.querySelector("input[name='volumen']").value.trim();

                const data = {
                    nombre: nombre,
                    correo: correo,
                    telefono: telefono,
                    empresa: empresa,
                    estado: estado,
                    volumen: volumen,
                    utm_id: data_utm.utm_id || "",
                    utm_campaign: data_utm.utm_campaign || "",
                    utm_source: data_utm.utm_source || "",
                    utm_medium: data_utm.utm_medium || "",
                    utm_content: data_utm.utm_content || "",
                    utm_term: data_utm.utm_term || "",
                    api_key: "Q2xpZW50ZUlEOjo0MTY=",
                    to: ["svillarreal@corporativoalanis.com","jtovar@petrovim.com","leads@futurite.net"],
                    origen: "https://petrovim.com/suministro/"
                };

                // Deshabilitar botón y mostrar spinner
                submitBtn.disabled = true;
                const originalHTML = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';

                // Envío con fetch (JSON). Revisar CORS en el servidor destino.
                fetch('https://futurite.ongoing.mx/api/leads/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }).then(response => response.json())
                .then(result => {
                console.log('Respuesta API:', result);
                if (result && result.success) {
                    form.reset();
                    window.location.href = 'gracias.html';
                } else {
                    alert('Ha ocurrido un error al enviar la forma de contacto, intenta más tarde');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalHTML;
                }
                }).catch(err => {
                    console.error('Error envío:', err);
                    alert('No fue posible enviar la solicitud. Intenta más tarde.');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalHTML;
                });
            }
            form.classList.add('was-validated');
        }, false);
    }
});
