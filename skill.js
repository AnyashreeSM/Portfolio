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