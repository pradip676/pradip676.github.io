// js/script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Toggle for Mobile ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
  
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active'); // For hamburger animation
        // Optional: Prevent body scroll when mobile menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
      });
  
      // Close mobile menu when a link is clicked
      navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      });
    }
  
    // --- Smooth Scroll & Active Link Highlighting (simplified) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
  
    function updateActiveLink() {
      let currentSectionId = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) { // Adjust offset as needed
          currentSectionId = section.getAttribute('id');
        }
      });
  
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}` || 
            (link.getAttribute('href') === 'blog.html' && window.location.pathname.endsWith('blog.html'))) {
          link.classList.add('active');
        }
      });
    }
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
  
    // --- Scroll-triggered Animations (Intersection Observer) ---
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optional: unobserve after animation to save resources
          // observer.unobserve(entry.target); 
        } else {
          // Optional: remove class to re-animate on scroll up
          // entry.target.classList.remove('is-visible');
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
    });
  
    elementsToAnimate.forEach(el => observer.observe(el));
  
    // --- Hero Text Typing Animation ---
    const typingElement = document.querySelector('.animate-typing');
    if (typingElement) {
      const textToType = typingElement.innerHTML; // Get text from HTML (includes <span>)
      typingElement.innerHTML = ''; // Clear original content
      typingElement.classList.add('typing-cursor'); // Add cursor style
      let i = 0;
      let isTag = false;
      let currentTag = '';
  
      function typeWriter() {
        if (i < textToType.length) {
          let char = textToType.charAt(i);
          
          if (char === '<') {
            isTag = true;
          }
          
          if (isTag) {
            currentTag += char;
          } else {
            typingElement.innerHTML += char;
          }
          
          if (char === '>') {
            isTag = false;
            typingElement.innerHTML += currentTag;
            currentTag = '';
          }
          
          i++;
          setTimeout(typeWriter, isTag ? 0 : 70); // Type tags faster
        } else {
          typingElement.classList.remove('typing-cursor'); // Remove cursor when done
        }
      }
      setTimeout(typeWriter, 500); // Initial delay before typing starts
    }
    
    // --- Animate elements on page load (if not scroll-dependent) ---
    const loadAnimations = document.querySelectorAll('.animate-on-load');
    loadAnimations.forEach(el => {
      // This assumes CSS animations are set up to play once visible or immediately
      // For JS-controlled load animations, you'd add a class here.
      // Example: el.classList.add('loaded-visible');
      // For now, we rely on CSS animation properties.
    });
  
  
    // --- Dynamic Year in Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
    }
    const currentYearBlogSpan = document.getElementById('currentYearBlog');
     if (currentYearBlogSpan) {
      currentYearBlogSpan.textContent = new Date().getFullYear();
    }
  
  });