// -------------------------------------------------------------
// MOBILE NAVBAR AUTO-CLOSE
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarContent');

    if (navbarCollapse && navbarToggler) {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                // If the mobile menu is currently expanded, trigger the toggler to close it
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
});

// -------------------------------------------------------------
// SMOOTH EASING SCROLL WITH NAVBAR OFFSET
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault(); 
                e.stopImmediatePropagation(); 
                
                // NEW: Offset to account for the fixed navbar (negative moves the stop point higher up)
                const yOffset = -100; 
                
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                
                const duration = 1500; 
                let start = null;

                const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

                function animationStep(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    let percentage = Math.min(progress / duration, 1);
                    
                    window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
                    
                    if (progress < duration) {
                        window.requestAnimationFrame(animationStep);
                    } else {
                        window.scrollTo(0, targetPosition); 
                    }
                }

                window.requestAnimationFrame(animationStep);
            }
        });
    });
});
