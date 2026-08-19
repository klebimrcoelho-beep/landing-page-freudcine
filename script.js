/* ================================================================
   FREUDCINE LANDING PAGE — SCRIPTS
   Instituto Freudiano de Salvador
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== SCROLL ANIMATIONS (Intersection Observer) =====
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // ===== SMOOTH HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 22, 40, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // ===== PARALLAX EFFECT ON HERO IMAGE =====
    const heroImage = document.querySelector('.hero__image-wrapper');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.15;
            heroImage.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }

    // ===== GOLD PARTICLE EFFECT =====
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: radial-gradient(circle, rgba(200, 164, 90, 0.6), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: particle-float ${Math.random() * 8 + 6}s ease-in-out infinite;
            opacity: 0;
        `;
        document.body.appendChild(particle);

        // Fade in
        setTimeout(() => {
            particle.style.transition = 'opacity 2s ease';
            particle.style.opacity = Math.random() * 0.4 + 0.1;
        }, 100);

        // Remove after some time and create new one
        setTimeout(() => {
            particle.style.opacity = '0';
            setTimeout(() => particle.remove(), 2000);
        }, Math.random() * 10000 + 8000);
    }

    // Add particle keyframes
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particle-float {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * -40 - 10}px); }
            50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * -20 - 5}px); }
            75% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * -30 - 10}px); }
        }
    `;
    document.head.appendChild(particleStyle);

    // Create particles periodically
    setInterval(createParticle, 2000);
    // Initial burst
    for (let i = 0; i < 8; i++) {
        setTimeout(createParticle, i * 300);
    }

    // ===== CURSOR GLOW EFFECT =====
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(200, 164, 90, 0.03) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: left 0.3s ease, top 0.3s ease;
    `;
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // ===== CTA RIPPLE EFFECT =====
    const ctaBox = document.querySelector('.cta__box');
    
    if (ctaBox) {
        ctaBox.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(200, 164, 90, 0.15);
                transform: translate(-50%, -50%);
                left: ${x}px;
                top: ${y}px;
                animation: ripple-expand 0.6s ease-out forwards;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });

        // Add ripple keyframes
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple-expand {
                to {
                    width: 400px;
                    height: 400px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }

    // ===== TYPEWRITER EFFECT FOR HERO TITLE =====
    const heroLabel = document.querySelector('.hero__label');
    if (heroLabel) {
        const text = heroLabel.textContent;
        heroLabel.textContent = '';
        heroLabel.style.opacity = '1';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                heroLabel.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 60);
    }

    // ===== SMOOTH ANCHOR SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('🎬 FreudCine — Landing page carregada com sucesso.');
});
