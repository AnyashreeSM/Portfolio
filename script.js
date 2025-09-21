// Enhanced JavaScript for Portfolio

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger'); 
    const menu = document.querySelector('.menu'); 
    const navbar = document.querySelector('.navbar');

    if (hamburger && menu) {
        hamburger.addEventListener('click', function () { 
            const hamIcon = this.querySelector('.hamburger-icon'); 
            const crossIcon = this.querySelector('.cross-icon'); 
            
            if (menu.classList.contains('active')) { 
                // Close menu
                hamIcon.style.display = "inline-block";
                crossIcon.style.display = "none";
                menu.classList.remove('active');
            } else { 
                // Open menu
                crossIcon.style.display = "inline-block";
                hamIcon.style.display = "none";
                menu.classList.add('active');
            } 
        });

        // Close menu when clicking on a link
        const menuLinks = document.querySelectorAll('.links');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                const hamIcon = hamburger.querySelector('.hamburger-icon');
                const crossIcon = hamburger.querySelector('.cross-icon');
                
                hamIcon.style.display = "inline-block";
                crossIcon.style.display = "none";
                menu.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            }
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animateElements = document.querySelectorAll('.animate-on-scroll, .port-card, .my-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add loading animation to project cards on scroll
    const projectCards = document.querySelectorAll('.port-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger the animations
            }
        });
    }, { threshold: 0.2 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(card);
    });

    // Enhanced form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameField = this.querySelector('input[placeholder="Your Name"]');
            const emailField = this.querySelector('input[placeholder="Your Email"]');
            const phoneField = this.querySelector('input[placeholder="Your Phone"]');
            const messageField = this.querySelector('textarea[placeholder="Write your message"]');
            const submitBtn = this.querySelector('.form-btn');
            
            // Simple validation
            let isValid = true;
            const fields = [nameField, emailField, messageField];
            
            fields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ef4444';
                    isValid = false;
                } else {
                    field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
            });
            
            // Email validation
            if (emailField.value.trim() && !isValidEmail(emailField.value)) {
                emailField.style.borderColor = '#ef4444';
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                submitBtn.value = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for your message! I\'ll get back to you soon.');
                    this.reset();
                    submitBtn.value = 'Send Message';
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
        
        // Reset border colors on input
        const formInputs = contactForm.querySelectorAll('.form-controls');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            });
            
            input.addEventListener('focus', function() {
                this.style.borderColor = '#06d6a0';
            });
        });
    }

    // Add typing effect to hero text (optional enhancement)
    const heroTitle = document.querySelector('.my-heading');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        // Wait for the animation delay, then start typing
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    heroTitle.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            typeWriter();
        }, 800); // Match the CSS animation delay
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroRight = document.querySelector('.hero-right');
        
        if (heroRight && scrolled < window.innerHeight) {
            heroRight.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

});

// Helper function for email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add cursor trail effect (optional fancy effect)
function createCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Remove existing trail elements
        document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
        
        // Create new trail elements
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'cursor-trail';
            trailElement.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: ${6 - index * 0.5}px;
                height: ${6 - index * 0.5}px;
                background: #06d6a0;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${(trailLength - index) / trailLength};
                transform: translate(-50%, -50%);
                transition: opacity 0.1s ease;
            `;
            document.body.appendChild(trailElement);
            
            // Remove trail element after animation
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.remove();
                }
            }, 1000);
        });
    });
}

// Uncomment the line below to enable cursor trail effect
// createCursorTrail();



// hire me action
document.addEventListener('DOMContentLoaded', function() {
    
    // Hire Me button - Open email client
    const hireButton = document.querySelector('.intro-buttons .common-btn');
    
    if (hireButton) {
        hireButton.addEventListener('click', function() {
            window.location.href = 'mailto:anyashreesm@gmail.com?subject=Hire%20Inquiry%20-%20Full%20Stack%20Developer&body=Hi%20Anyashree,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20opportunity.%0D%0A%0D%0AProject%20details:%0D%0A-%20%0D%0A%0D%0ABudget:%0D%0A-%20%0D%0A%0D%0ATimeline:%0D%0A-%20%0D%0A%0D%0ABest%20regards';
        });
    }
    
    // Get Resume button - Download PDF
    const resumeButton = document.querySelector('.intro-buttons .ghost-btn');
    
    if (resumeButton) {
        resumeButton.addEventListener('click', function() {
            // Method 1: Download local PDF file
            const link = document.createElement('a');
            link.href = 'assets/Anyashree_SM_Resume.pdf'; // Put your PDF in assets folder
            link.download = 'Anyashree_SM_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Method 2: Open Google Drive link (alternative)
            // window.open('https://drive.google.com/file/d/your-file-id/view', '_blank');
            
            // Method 3: If no resume yet (temporary)
            // alert('Resume will be available soon! Please contact me via email.');
        });
    }
    
    // Mobile hamburger menu (KEEP THIS - needed for mobile navigation)
    const hamburger = document.getElementById('hamburger'); 
    const menu = document.querySelector('.menu'); 

    if (hamburger && menu) {
        hamburger.addEventListener('click', function () { 
            const hamIcon = this.querySelector('.hamburger-icon'); 
            const crossIcon = this.querySelector('.cross-icon'); 
            
            if (menu.classList.contains('active')) { 
                hamIcon.style.display = "inline-block";
                crossIcon.style.display = "none";
                menu.classList.remove('active');
            } else { 
                crossIcon.style.display = "inline-block";
                hamIcon.style.display = "none";
                menu.classList.add('active');
            } 
        });

        // Close menu when clicking on a link
        const menuLinks = document.querySelectorAll('.links');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                const hamIcon = hamburger.querySelector('.hamburger-icon');
                const crossIcon = hamburger.querySelector('.cross-icon');
                
                hamIcon.style.display = "inline-block";
                crossIcon.style.display = "none";
                menu.classList.remove('active');
            });
        });
    }
});


//email section when client send the message i should get that message
// Initialize EmailJS
emailjs.init('PwSfSRnbsZRNK8rUN'); 

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.form-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.sendForm('service_zol96fp', 'template_3ovctkc', this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Success feedback
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.backgroundColor = '#10b981';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    alert('Thank you! Your message has been sent successfully. I will get back to you soon.');
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                    }, 3000);
                    
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Error feedback
                    submitBtn.textContent = 'Failed to Send';
                    submitBtn.style.backgroundColor = '#ef4444';
                    
                    alert('Sorry, there was an error sending your message. Please try again or contact me directly at anyashreesm@gmail.com');
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                    }, 3000);
                });
        });
    }
    
    
});