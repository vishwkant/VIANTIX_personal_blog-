// ========================================
// BLOG POSTS DATA
// ========================================
const blogPosts = [
    {
        id: 1,
        title: "The Art of Minimalist Design in Modern Web Development",
        excerpt: "Exploring the principles of minimalism and how they create powerful, focused user experiences in web design.",
        date: "2026-01-15",
        dateFormatted: "January 15, 2026",
        readTime: "8 min read",
        featured: true
    },
    {
        id: 2,
        title: "Learning Cybersecurity: My Journey into the Digital World",
        excerpt: "Cybersecurity is about understanding how the digital world works and keeping it safe for everyone.",
        date: "2026-01-08",
        dateFormatted: "January 8, 2026",
        readTime: "12 min read",
        featured: true
    },
    
    {
        id: 3,
        title: "Optimizing Web Performance in 2026",
        excerpt: "Techniques and tools for creating lightning-fast web applications that delight users.",
        date: "2025-12-20",
        dateFormatted: "December 20, 2025",
        readTime: "15 min read",
        featured: true
    },
    {
        id: 4,
        title: "JavaScript Design Patterns Every Developer Should Know",
        excerpt: "Common design patterns that solve recurring problems in software development.",
        date: "2025-12-10",
        dateFormatted: "December 10, 2025",
        readTime: "14 min read",
        featured: false
    },
    {
        id: 5,
        title: "The Future of Web Development: Trends to Watch",
        excerpt: "Emerging technologies and methodologies shaping the future of web development.",
        date: "2025-11-30",
        dateFormatted: "November 30, 2025",
        readTime: "9 min read",
        featured: false
    },
   
   
];

// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initBlogPosts();
    initContactForm();
    initScrollAnimations();
    initReadingProgress();
});

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.backgroundColor = 'rgba(250, 250, 250, 0.95)';
            navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(250, 250, 250, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ========================================
// BLOG POSTS RENDERING
// ========================================
function initBlogPosts() {
    renderFeaturedPosts();
    renderAllBlogPosts();
}

function renderFeaturedPosts() {
    const featuredPostsContainer = document.getElementById('featuredPosts');
    
    if (!featuredPostsContainer) return;
    
    const featuredPosts = blogPosts.filter(post => post.featured);
    
    featuredPostsContainer.innerHTML = featuredPosts.map(post => `
        <div class="post-card fade-in-up">
            <time class="post-date" datetime="${post.date}">${post.dateFormatted}</time>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="post.html" class="post-link">Read more</a>
        </div>
    `).join('');
    
    // Trigger animations
    observeElements('.post-card');
}

function renderAllBlogPosts() {
    const blogPostsContainer = document.getElementById('blogPosts');
    
    if (!blogPostsContainer) return;
    
    blogPostsContainer.innerHTML = blogPosts.map(post => `
        <article class="blog-post-card fade-in-up">
            <time class="post-date" datetime="${post.date}">${post.dateFormatted}</time>
            <h2 class="post-title">${post.title}</h2>
            <p class="post-excerpt">${post.excerpt}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                <span style="color: var(--color-text-muted); font-size: 0.875rem;">${post.readTime}</span>
                <a href="post.html" class="post-link">Read article</a>
            </div>
        </article>
    `).join('');
    
    // Trigger animations
    observeElements('.blog-post-card');
}

// ========================================
// CONTACT FORM VALIDATION
// ========================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');
    
    // Real-time validation
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    messageInput.addEventListener('blur', () => validateMessage());
    
    // Clear errors on input
    nameInput.addEventListener('input', () => {
        if (nameError.textContent) {
            nameError.textContent = '';
            nameInput.style.borderColor = '';
        }
    });
    
    emailInput.addEventListener('input', () => {
        if (emailError.textContent) {
            emailError.textContent = '';
            emailInput.style.borderColor = '';
        }
    });
    
    messageInput.addEventListener('input', () => {
        if (messageError.textContent) {
            messageError.textContent = '';
            messageInput.style.borderColor = '';
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Simulate form submission
            console.log('Form submitted:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
            
            // Show success message
            formSuccess.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
        }
    });
    
    function validateName() {
        const value = nameInput.value.trim();
        
        if (value === '') {
            nameError.textContent = 'Please enter your name';
            nameInput.style.borderColor = 'var(--color-error)';
            return false;
        }
        
        if (value.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameInput.style.borderColor = 'var(--color-error)';
            return false;
        }
        
        nameError.textContent = '';
        nameInput.style.borderColor = 'var(--color-success)';
        return true;
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            emailError.textContent = 'Please enter your email';
            emailInput.style.borderColor = 'var(--color-error)';
            return false;
        }
        
        if (!emailRegex.test(value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = 'var(--color-error)';
            return false;
        }
        
        emailError.textContent = '';
        emailInput.style.borderColor = 'var(--color-success)';
        return true;
    }
    
    function validateMessage() {
        const value = messageInput.value.trim();
        
        if (value === '') {
            messageError.textContent = 'Please enter a message';
            messageInput.style.borderColor = 'var(--color-error)';
            return false;
        }
        
        if (value.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageInput.style.borderColor = 'var(--color-error)';
            return false;
        }
        
        messageError.textContent = '';
        messageInput.style.borderColor = 'var(--color-success)';
        return true;
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    observeElements('.fade-in-up');
}

function observeElements(selector) {
    const elements = document.querySelectorAll(selector);
    
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// ========================================
// READING PROGRESS INDICATOR
// ========================================
function initReadingProgress() {
    const progressBar = document.getElementById('readingProgress');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressBar.style.width = `${Math.min(scrollPercentage, 100)}%`;
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Format date helper
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle helper
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Optimize scroll events
const optimizedScroll = throttle(() => {
    // Any scroll-dependent code here
}, 100);

window.addEventListener('scroll', optimizedScroll);

// Lazy loading images (if needed in future)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

console.log('🎨 Website initialized successfully!');