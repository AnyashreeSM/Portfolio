// Custom Mouse Cursor Effect JavaScript - Add to your script.js

// Initialize custom cursor effect
function initCustomCursor() {
    // Only enable on desktop devices
    if (window.innerWidth > 768) {
        
        // Create cursor elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const follower = document.createElement('div');
        follower.className = 'cursor-follower';
        document.body.appendChild(follower);

        const cursorText = document.createElement('div');
        cursorText.className = 'cursor-text';
        document.body.appendChild(cursorText);

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        let isHovering = false;

        // Mouse movement tracking
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Update cursor position immediately
            cursor.style.left = mouseX - 10 + 'px';
            cursor.style.top = mouseY - 10 + 'px';
            
            // Update cursor text position
            cursorText.style.left = mouseX + 'px';
            cursorText.style.top = mouseY + 'px';

            // Create trailing particles occasionally
            if (Math.random() > 0.92 && !isHovering) {
                createMouseParticle(mouseX, mouseY);
            }
        });

        // Smooth follower animation
        function updateFollower() {
            const speed = 0.15;
            followerX += (mouseX - followerX) * speed;
            followerY += (mouseY - followerY) * speed;
            
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            
            requestAnimationFrame(updateFollower);
        }
        updateFollower();

        // Interactive elements hover effects
        const interactiveElements = document.querySelectorAll(
            'a, button, .port-card, .cert-card, .my-card, .btn, .links, .hamburger, input, textarea, .project-link, .verify-link'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                isHovering = true;
                cursor.classList.add('hover');
                follower.classList.add('hover');
                
                // Show cursor text for specific elements
                const text = getCursorText(element);
                if (text) {
                    cursorText.textContent = text;
                    cursorText.classList.add('show');
                }
            });
            
            element.addEventListener('mouseleave', () => {
                isHovering = false;
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
                cursorText.classList.remove('show');
            });
        });

        // Click effect
        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
            createRippleEffect(mouseX, mouseY);
        });

        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            follower.style.opacity = '0';
            cursorText.classList.remove('show');
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            follower.style.opacity = '1';
        });

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cursor.style.opacity = '0';
                follower.style.opacity = '0';
            } else {
                cursor.style.opacity = '1';
                follower.style.opacity = '1';
            }
        });
    }
}

// Create mouse trail particles
function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'mouse-particle';
    particle.style.left = x - 2 + 'px';
    particle.style.top = y - 2 + 'px';
    
    // Random slight offset for natural effect
    const offsetX = (Math.random() - 0.5) * 10;
    const offsetY = (Math.random() - 0.5) * 10;
    particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 1000);
}

// Create ripple effect on click
function createRippleEffect(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Get cursor text based on element
function getCursorText(element) {
    if (element.classList.contains('btn') || element.classList.contains('project-link')) {
        return 'Click';
    }
    if (element.classList.contains('port-card')) {
        return 'View Project';
    }
    if (element.classList.contains('cert-card')) {
        return 'View Details';
    }
    if (element.classList.contains('links')) {
        return 'Navigate';
    }
    if (element.tagName === 'A') {
        return 'Link';
    }
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        return 'Type';
    }
    return null;
}

// Magnetic cursor effect for special elements
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn, .project-link, .verify-link');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });
}

// Smooth scroll cursor effect
function initScrollCursor() {
    let isScrolling = false;
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        isScrolling = true;
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.cursor-follower');
        
        if (cursor) {
            cursor.style.transform = 'scale(1.2)';
            cursor.style.background = 'linear-gradient(45deg, #8b5cf6, #06d6a0)';
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            if (cursor) {
                cursor.style.transform = '';
                cursor.style.background = '';
            }
        }, 150);
    });
}

// Initialize all cursor effects
function initAllCursorEffects() {
    initCustomCursor();
    setTimeout(() => {
        initMagneticEffect();
        initScrollCursor();
    }, 500);
}

// Cleanup cursor elements on window resize
function handleResize() {
    if (window.innerWidth <= 768) {
        // Remove cursor elements on mobile
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.cursor-follower');
        const cursorText = document.querySelector('.cursor-text');
        
        if (cursor) cursor.remove();
        if (follower) follower.remove();
        if (cursorText) cursorText.remove();
    } else if (!document.querySelector('.custom-cursor')) {
        // Reinitialize on desktop
        initAllCursorEffects();
    }
}

// Add to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cursor effects
    initAllCursorEffects();
    
    console.log('Custom cursor effects initialized!');
});

// Handle window resize
window.addEventListener('resize', handleResize);

// Handle page load
window.addEventListener('load', () => {
    // Ensure cursor is properly initialized after all content loads
    setTimeout(() => {
        if (window.innerWidth > 768 && !document.querySelector('.custom-cursor')) {
            initAllCursorEffects();
        }
    }, 100);
});