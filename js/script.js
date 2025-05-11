// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  
    // --- Active Link Highlighting on Scroll ---
    const navLinks = document.querySelectorAll('.nav-link'); // Assuming nav-link is still used
    const sections = document.querySelectorAll('section[id]');
  
    function updateActiveLink() {
      let currentSectionId = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Adjust offset if header is fixed and has height
        const headerHeight = document.querySelector('.navigation')?.offsetHeight || 70; 
        if (window.pageYOffset >= sectionTop - headerHeight - 20) { // Added 20px buffer
          currentSectionId = section.getAttribute('id');
        }
      });
  
      navLinks.forEach(link => {
        link.classList.remove('active');
        // Handle blog link separately if it's an external page
        if (link.getAttribute('href') === 'blog.html' && window.location.pathname.includes('blog.html')) {
          link.classList.add('active');
        } else if (link.hash === `#${currentSectionId}`) { // Use .hash for anchor links
          link.classList.add('active');
        }
      });
      // --- Dynamic Year in Footer ---
      const currentYearFooterSpan = document.getElementById('currentYearFooter');
      if (currentYearFooterSpan) {
        currentYearFooterSpan.textContent = new Date().getFullYear();
      }
    }
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
  
    // --- Scroll-triggered Animations (General Elements) ---
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    const generalObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optional: unobserve after animation
          // generalObserver.unobserve(entry.target); 
        } else {
          // Optional: remove class to re-animate on scroll up
          // entry.target.classList.remove('is-visible');
        }
      });
    }, {
      threshold: 0.1 
    });
  
    elementsToAnimate.forEach(el => generalObserver.observe(el));
  
    // --- Hero Text Typing Animation ---
    const typingElement = document.querySelector('.animate-typing');
    if (typingElement) {
      // Ensure this doesn't conflict if you manually clear it for the animation
      const textToType = typingElement.textContent; // Use textContent if innerHTML causes issues
      typingElement.innerHTML = ''; // Clear for typing effect
      typingElement.classList.add('typing-cursor'); 
      let i = 0;
      let isTag = false; // This logic might need adjustment if textToType is pure text now
      let currentTag = '';
  
      function typeWriter() {
        if (i < textToType.length) {
          let char = textToType.charAt(i);
          
          // Simpler logic if no HTML tags are within the typing element initially
          typingElement.innerHTML += char;
          
          i++;
          setTimeout(typeWriter, 70); // Adjust typing speed
        } else {
          typingElement.classList.remove('typing-cursor'); 
        }
      }
      setTimeout(typeWriter, 500); 
    }
    
    // --- Animate elements on page load (if not scroll-dependent) ---
    const loadAnimations = document.querySelectorAll('.animate-on-load');
    loadAnimations.forEach(el => {
      // For elements that should animate immediately (e.g., nav brand)
      // Ensure their animation is defined in CSS (e.g., animations.css with an animation that runs on load)
      // Or, add a class that triggers an animation
      // For simplicity, we assume CSS handles 'animate-on-load' directly if needed.
      // If JS control is needed: el.classList.add('animation-start-class');
    });
  
    // --- Dynamic Year in Footer (already in your inline script, but good to have here too if you centralize) ---
    // const currentYearSpan = document.getElementById('currentYear');
    // if (currentYearSpan) {
    //   currentYearSpan.textContent = new Date().getFullYear();
    // }
    // Note: currentYearBlogSpan is for blog.html, not index.html generally
  
    // --- Animate Progress Bars on Scroll (NEW) ---
    const skillItems = document.querySelectorAll('.skill-item');
  
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector('.progress-bar');
          if (progressBar) {
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = progress + '%';
          }
          // Optional: Unobserve after animation
          // observer.unobserve(entry.target);
        } else {
          // Optional: Reset width if you want animation to replay on scroll up
          // const progressBar = entry.target.querySelector('.progress-bar');
          // if (progressBar) {
          //   progressBar.style.width = '0%';
          // }
        }
      });
    }, {
      threshold: 0.2 // Trigger when 20% of the skill-item is visible
    });
  
    skillItems.forEach(item => {
      skillObserver.observe(item);
    });
  
  }); // End of DOMContentLoaded