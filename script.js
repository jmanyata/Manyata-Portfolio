// Enhanced Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Enhanced Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Enhanced Navbar background change on scroll with parallax
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(220, 38, 38, 0.15)';
        navbar.style.borderBottom = '2px solid rgba(220, 38, 38, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottom = '1px solid rgba(243, 232, 255, 0.3)';
    }
});

// Enhanced Form submission handling with better validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const subject = this.querySelectorAll('input[type="text"]')[1].value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        // Enhanced validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            shakeElement(this);
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            shakeElement(this.querySelector('input[type="email"]'));
            return;
        }
        
        if (name.length < 2) {
            showNotification('Name must be at least 2 characters long', 'error');
            shakeElement(this.querySelector('input[type="text"]'));
            return;
        }
        
        if (message.length < 10) {
            showNotification('Message must be at least 10 characters long', 'error');
            shakeElement(this.querySelector('textarea'));
            return;
        }
        
        // Create mailto link with form data
        const mailtoLink = `mailto:manyatajakhar1234@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Opening email client...', 'success');
        this.reset();
    });
}

// Shake animation for form validation
function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Enhanced Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Notification system with better animations
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        color: white;
        padding: 1.2rem 1.8rem;
        border-radius: 15px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%) scale(0.8);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 450px;
        border: 2px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in with bounce effect
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }, 6000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    });
}

// Enhanced Intersection Observer for animations with staggered effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for grid items
            if (entry.target.classList.contains('expertise-card') || 
                entry.target.classList.contains('portfolio-item') || 
                entry.target.classList.contains('award-item')) {
                entry.target.style.animationDelay = '0.1s';
            }
        }
    });
}, observerOptions);

// Observe elements for animation with enhanced effects
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.expertise-card, .portfolio-item, .award-item, .timeline-content, .stat');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// Enhanced Typing effect for hero title with cursor
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    // Add cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    cursor.style.cssText = `
        color: #dc2626;
        font-weight: bold;
        animation: blink 1s infinite;
    `;
    element.appendChild(cursor);
    
    function type() {
        if (i < text.length) {
            const charSpan = document.createElement('span');
            charSpan.textContent = text.charAt(i);
            charSpan.style.opacity = '0';
            charSpan.style.transform = 'translateY(20px)';
            charSpan.style.transition = 'all 0.3s ease';
            
            element.insertBefore(charSpan, cursor);
            
            setTimeout(() => {
                charSpan.style.opacity = '1';
                charSpan.style.transform = 'translateY(0)';
            }, 50);
            
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                cursor.remove();
            }, 1000);
        }
    }
    
    type();
}

// Initialize enhanced typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 120);
    }
});

// Modal Functions
function openReportModal() {
    const modal = document.getElementById('reportModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeReportModal() {
    const modal = document.getElementById('reportModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const reportModal = document.getElementById('reportModal');
    const imageModal = document.getElementById('imageModal');
    
    if (event.target === reportModal) {
        closeReportModal();
    }
    
    if (event.target === imageModal) {
        closeImageModal();
    }
}

// Subtle Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.1;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Particle effect for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(245, 158, 11, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Enhanced loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    createParticles();
    
    // Add entrance animation for sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Enhanced hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add magnetic effect to cards
    const cards = document.querySelectorAll('.expertise-card, .portfolio-item, .award-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `perspective(1000px) rotateX(${y * 0.01}deg) rotateY(${x * 0.01}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// Counter animation removed since statistics now contain text instead of numbers

// Enhanced CSS for animations and effects
const enhancedStyles = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @keyframes float-particle {
        0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.6;
        }
        50% { 
            transform: translateY(-20px) translateX(10px) rotate(180deg);
            opacity: 1;
        }
    }
    
    .typing-cursor {
        display: inline-block;
        margin-left: 2px;
    }
    
    .particle {
        z-index: 1;
    }
    
    .expertise-card:hover,
    .portfolio-item:hover,
    .award-item:hover {
        transform: perspective(1000px) rotateX(5deg) rotateY(5deg) translateY(-15px) scale(1.02);
    }
    
    .stat:hover {
        transform: perspective(1000px) rotateX(5deg) rotateY(5deg) translateY(-15px) scale(1.05);
    }
    
    .timeline-content:hover {
        transform: perspective(1000px) rotateX(2deg) rotateY(2deg) scale(1.02);
    }
    
    .btn:hover {
        transform: perspective(1000px) rotateX(5deg) rotateY(5deg) translateY(-4px) scale(1.05);
    }
    
    .social-link:hover {
        transform: perspective(1000px) rotateX(10deg) rotateY(10deg) translateY(-8px) scale(1.1);
    }
`;

// Add enhanced styles to document
const styleElement = document.createElement('style');
styleElement.textContent = enhancedStyles;
document.head.appendChild(styleElement);

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-title, .about-lead, .timeline-item');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    
    // Add entrance animations for all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        section.style.transitionDelay = `${index * 0.2}s`;
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
});
