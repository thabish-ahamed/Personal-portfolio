// Loading screen with progress
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            // Start animations after loading
            initAnimations();
        }, 800);
    }
});

// Initialize all animations
function initAnimations() {
    // Typing effect for role
    const roleElement = document.querySelector('.role');
    if (roleElement) {
        const originalText = roleElement.textContent;
        roleElement.textContent = '';
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < originalText.length) {
                roleElement.textContent += originalText[charIndex];
                charIndex++;
                setTimeout(typeChar, 50);
            }
        }
        
        setTimeout(typeChar, 500);
    }
}

// Mobile Navigation Functions - CORRECTED
function openMenu() {
    const mobileNav = document.getElementById('mobile-navigation');
    const toggleBtn = document.querySelector('.toggle-menu');
    mobileNav.classList.add('show');
    document.body.style.overflow = 'hidden';
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
    const mobileNav = document.getElementById('mobile-navigation');
    const toggleBtn = document.querySelector('.toggle-menu');
    mobileNav.classList.remove('show');
    document.body.style.overflow = 'auto';
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
}

// Close mobile menu when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const mobileNav = document.getElementById('mobile-navigation');
    const toggleBtn = document.querySelector('.toggle-menu');
    
    if (mobileNav && toggleBtn) {
        document.addEventListener('click', (e) => {
            if (mobileNav.classList.contains('show') && 
                !mobileNav.contains(e.target) && 
                !toggleBtn.contains(e.target)) {
                closeMenu();
            }
        });
    }
});

// Close mobile menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// Smooth scroll for anchor links with active state
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const mobileNav = document.getElementById('mobile-navigation');
                if (mobileNav && mobileNav.classList.contains('show')) {
                    closeMenu();
                }
                
                // Update active state
                document.querySelectorAll('.primary-navigation a, .mobile-navigation a:not(.close-btn)').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Update active navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.primary-navigation a, .mobile-navigation a:not(.close-btn)').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Skill cards hover effect enhancement
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skill-box').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// Project cards hover effect
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// Header scroll effect with enhanced animations
document.addEventListener('DOMContentLoaded', () => {
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    if (!header) return;
    
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > headerHeight) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Add scrolled class for styling
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
        
        // Parallax effect for sections
        parallaxEffect();
    });
});

// Parallax scrolling effect
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const homeImg = document.querySelector('.home-img');
    const aboutImg = document.querySelector('.about-right');
    
    if (homeImg) {
        const speed = 0.15;
        const yPos = scrolled * speed;
        homeImg.style.transform = `translateY(${yPos}px)`;
    }
    
    if (aboutImg) {
        const speed = 0.05;
        const yPos = -(scrolled * speed);
        aboutImg.style.transform = `translateY(${yPos}px)`;
    }
}

// Form submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            const button = e.target.querySelector('button');
            const originalText = button.textContent;
            const originalBackground = button.style.background;
            
            button.textContent = 'Message Sent!';
            button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = originalBackground;
                button.disabled = false;
                e.target.reset();
            }, 3000);
        });
    }
});

// Add floating animation to social icons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.social a').forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
    });
});

// Intersection Observer for animations with enhanced effects
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger animation for child elements
                const children = entry.target.querySelectorAll('.project-card, .skill-box, .contact-info, .contact-form');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Observe project cards and skill boxes
    document.querySelectorAll('.project-card, .skill-box').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Initialize AOS (Animate On Scroll) for elements
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on page load
    setTimeout(() => {
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }, 300);
    
    // Cursor glow effect (desktop only)
    if (window.innerWidth > 768) {
        createCursorGlow();
    }
    
    // Smooth scroll progress indicator
    createScrollProgress();
    
    // Add number counter animation for stats
    animateNumbers();
});

// Create cursor glow effect
function createCursorGlow() {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.opacity = '0.6';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
    
    // Smooth glow movement
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// Create scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #c77b85, #e6c154);
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(199, 123, 133, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Animate numbers (if you add stats in the future)
function animateNumbers() {
    const numbers = document.querySelectorAll('[data-count]');
    numbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-count'));
        let count = 0;
        const increment = target / 100;
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                num.textContent = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                num.textContent = target;
            }
        };
        
        // Start animation when element is visible
        const numObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                numObserver.disconnect();
            }
        });
        numObserver.observe(num);
    });
}