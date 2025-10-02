

// Initialize EmailJS
emailjs.init('PwSfSRnbsZRNK8rUN'); 

// Wait for DOM to load - SINGLE EVENT LISTENER
document.addEventListener('DOMContentLoaded', function() {
    
    // HAMBURGER MENU
    const hamburger = document.getElementById('hamburger'); 
    const menu = document.querySelector('.menu'); 
    const navbar = document.querySelector('.navbar');

    console.log('Hamburger found:', !!hamburger); // Debug
    console.log('Menu found:', !!menu); // Debug

    if (hamburger && menu) {
        // Ensure initial state is correct
        const hamIcon = hamburger.querySelector('.hamburger-icon'); 
        const crossIcon = hamburger.querySelector('.cross-icon');
        
        if (hamIcon && crossIcon) {
            hamIcon.style.display = "inline-block";
            crossIcon.style.display = "none";
        }

        hamburger.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Hamburger clicked!'); // Debug
            
            const hamIcon = this.querySelector('.hamburger-icon'); 
            const crossIcon = this.querySelector('.cross-icon'); 
            
            if (menu.classList.contains('active')) { 
                // Close menu
                console.log('Closing menu'); // Debug
                hamIcon.style.display = "inline-block";
                crossIcon.style.display = "none";
                menu.classList.remove('active');
            } else { 
                // Open menu
                console.log('Opening menu'); // Debug
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

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
                if (menu.classList.contains('active')) {
                    const hamIcon = hamburger.querySelector('.hamburger-icon');
                    const crossIcon = hamburger.querySelector('.cross-icon');
                    
                    hamIcon.style.display = "inline-block";
                    crossIcon.style.display = "none";
                    menu.classList.remove('active');
                }
            }
        });
    } else {
        console.error('Hamburger or menu not found!');
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
            const link = document.createElement('a');
            link.href = 'assets/Anyashree_SM_Resume.pdf';
            link.download = 'Anyashree_SM_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Contact form submission with EmailJS
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



// clickable project cards

document.addEventListener('DOMContentLoaded', function() {
    
    // Make project cards clickable
    const projectCards = document.querySelectorAll('.port-card');
    
    projectCards.forEach(card => {
        // Add click functionality to each project card
        card.addEventListener('click', function() {
            // Get the URL from data attribute or determine based on project
            let projectUrl = '';
            
            // Check the project title to determine which URL to open
            const projectTitle = this.querySelector('.greet-heading').textContent.toLowerCase();
            
            if (projectTitle.includes('buzzbuy') || projectTitle.includes('e-commerce')) {
                projectUrl = 'https://your-buzzbuy-url.com'; // Replace with actual URL
            } else if (projectTitle.includes('ai-image-generator') || projectTitle.includes('ai image')) {
                projectUrl = 'https://your-ai-generator-url.com'; // Replace with actual URL
            } else if (projectTitle.includes('quick-ai') || projectTitle.includes('saas')) {
                projectUrl = 'https://your-quick-ai-url.com'; // Replace with actual URL
            } else if (projectTitle.includes('portfolio')) {
                projectUrl = window.location.href; // Current portfolio site
            } else {
                
                console.log('No specific URL defined for this project');
                return;
            }
            
            // Open the project in a new tab
            if (projectUrl) {
                window.open(projectUrl, '_blank');
            }
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(99, 102, 241, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Prevent link clicks from triggering card click
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});



//Skill section js 
// Skills Section JavaScript 

// Initialize Skills Section Animations
function initSkillsAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Intersection Observer for skills animation
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillCategory = entry.target;
                const items = skillCategory.querySelectorAll('.skill-item');
                const bars = skillCategory.querySelectorAll('.skill-progress');
                
                // Animate skill items with staggered delay
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200);
                });
                
                // Animate skill bars after a slight delay
                setTimeout(() => {
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            const width = bar.getAttribute('data-width');
                            bar.style.width = width + '%';
                        }, index * 300);
                    });
                }, 600);
                
                // Stop observing this category after animation
                skillsObserver.unobserve(skillCategory);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe each skill category
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        skillsObserver.observe(category);
    });
}

// Tech tags hover animation
function initTechTagsAnimation() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            // Create floating effect
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(6, 214, 160, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Click effect
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Skills category cards animation
function initSkillCategoryAnimations() {
    const categories = document.querySelectorAll('.skill-category');
    
    categories.forEach((category, index) => {
        // Initial state
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        
        // Staggered animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(category);
    });
}

// Add counting animation to skill percentages
function initSkillCountAnimation() {
    const skillPercentages = document.querySelectorAll('.skill-percent');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetPercent = parseInt(element.textContent);
                let currentPercent = 0;
                
                const counter = setInterval(() => {
                    if (currentPercent <= targetPercent) {
                        element.textContent = currentPercent + '%';
                        currentPercent += 2;
                    } else {
                        element.textContent = targetPercent + '%';
                        clearInterval(counter);
                    }
                }, 50);
                
                countObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    skillPercentages.forEach(percent => {
        countObserver.observe(percent);
    });
}

// Add pulse effect to category icons
function initCategoryIconEffects() {
    const categoryIcons = document.querySelectorAll('.category-icon');
    
    categoryIcons.forEach(icon => {
        // Random pulse animation
        setInterval(() => {
            if (Math.random() > 0.7) {
                icon.style.animation = 'iconPulse 0.6s ease-in-out';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 600);
            }
        }, 3000 + Math.random() * 2000);
    });
    
    // Add the pulse animation CSS if not already present
    if (!document.querySelector('#icon-pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'icon-pulse-animation';
        style.textContent = `
            @keyframes iconPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(6, 214, 160, 0.4); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize all skills animations
function initAllSkillsEffects() {
    initSkillCategoryAnimations();
    initSkillsAnimations();
    initTechTagsAnimation();
    initSkillCountAnimation();
    
    // Delay icon effects to avoid overwhelming on load
    setTimeout(() => {
        initCategoryIconEffects();
    }, 2000);
}


function updateNavigationWithSkills() {
    const navigationHtml = `
        <li class="menu-list-item"><a class="links" href="#home">Home</a></li>
        <li class="menu-list-item"><a class="links" href="#projects">Projects</a></li>
        <li class="menu-list-item"><a class="links" href="#about">About</a></li>
        <li class="menu-list-item"><a class="links" href="#skills">Skills</a></li>
        <li class="menu-list-item"><a class="links" href="#certifications">Certifications</a></li>
        <li class="menu-list-item"><a class="links" href="#services">Services</a></li>
        <li class="menu-list-item"><a class="links" href="#contact">Contact Me</a></li>
    `;
    
    const menuList = document.querySelector('.menu-list');
    if (menuList) {
        menuList.innerHTML = navigationHtml;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Initialize skills effects
    setTimeout(() => {
        initAllSkillsEffects();
    }, 500);
    
    // Update navigation
    updateNavigationWithSkills();
    
    console.log('Skills section initialized!');
});