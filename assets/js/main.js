/* 
    Main JavaScript
    Freelance RFP Proposal Writer Platform
*/

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.documentElement;
    
    // Check for saved theme, default to 'light' (Bright mode)
    let savedTheme = localStorage.getItem('theme');
    
    // Force 'light' if no preference exists or to ensure bright mode is default
    if (!savedTheme) {
        savedTheme = 'light';
        localStorage.setItem('theme', 'light');
    }
    
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    // RTL Toggle Logic
    const rtlToggle = document.getElementById('rtl-toggle');
    let savedRtl = localStorage.getItem('rtl') === 'true';
    
    if (savedRtl) {
        body.setAttribute('dir', 'rtl');
        updateRtlIcon(true);
    } else {
        body.setAttribute('dir', 'ltr');
        updateRtlIcon(false);
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const isRtl = body.getAttribute('dir') === 'rtl';
            const newRtl = !isRtl;
            
            body.setAttribute('dir', newRtl ? 'rtl' : 'ltr');
            localStorage.setItem('rtl', newRtl);
            updateRtlIcon(newRtl);
        });
    }

    function updateRtlIcon(isRtl) {
        const icon = document.querySelector('#rtl-toggle i');
        if (icon) {
            // Just use a simple icon for RTL toggle, maybe a text "RTL" or an icon
            // icon.className = isRtl ? 'bi bi-text-right' : 'bi bi-text-left';
        }
    }

    function updateThemeIcon(theme) {
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'bi bi-sun-fill';
            } else {
                icon.className = 'bi bi-moon-fill';
            }
        }
    }

    // Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky-top', 'shadow');
        } else {
            navbar.classList.remove('sticky-top', 'shadow');
        }
    });

    // Mobile Menu Close on Link Click
    const navLinks = document.querySelectorAll('.offcanvas-body .nav-link');
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    if (offcanvasElement) {
        const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                bsOffcanvas.hide();
            });
        });
    }

    // Form Validation (Bootstrap 5)
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Analytics Counter Simulation
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const append = counter.getAttribute('data-append') || '';
                    const prepend = counter.getAttribute('data-prepend') || '';
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.innerText = prepend + Math.ceil(current) + append;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = prepend + target + append;
                        }
                    };
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // Back to Top Functionality
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';
    const excludedPages = ['login.html', 'register.html'];

    if (!excludedPages.includes(currentPage)) {
        // Create button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        backToTopBtn.setAttribute('title', 'Back to Top');
        document.body.appendChild(backToTopBtn);

        // Show/hide button on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Password Toggle Logic
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon classes
            this.classList.toggle('bi-eye');
            this.classList.toggle('bi-eye-slash');
        });
    });
});
