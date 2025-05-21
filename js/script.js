// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  
  // --- Dynamic Year in Footer (Moved here for better organization) ---
  const currentYearFooterSpan = document.getElementById('currentYearFooter');
  if (currentYearFooterSpan) {
    currentYearFooterSpan.textContent = new Date().getFullYear();
  }

  // --- Active Link Highlighting on Scroll ---
  const navLinks = document.querySelectorAll('.nav-link'); 
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    let currentSectionId = '';
    const headerHeight = document.querySelector('.navigation')?.offsetHeight || 70; 
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - headerHeight - 20) { 
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === 'blog.html' && window.location.pathname.includes('blog.html')) {
        link.classList.add('active');
      } else if (link.hash === `#${currentSectionId}`) { 
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Initial call

  // --- Scroll-triggered Animations (General Elements) ---
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
  const generalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // generalObserver.unobserve(entry.target); 
      } else {
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
    let originalHTML = typingElement.innerHTML; // Store original HTML to preserve spans
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    const plainText = tempDiv.textContent || tempDiv.innerText || ""; 

    typingElement.innerHTML = ''; 
    typingElement.classList.add('typing-cursor'); 
    let i = 0;
    let currentHTMLConstruction = '';
    let originalHTMLIndex = 0;

    function typeWriter() {
        if (i < plainText.length) {
            let found = false;
            while(originalHTMLIndex < originalHTML.length && !found) {
                currentHTMLConstruction += originalHTML[originalHTMLIndex];
                if (originalHTML[originalHTMLIndex] === plainText[i] && !(originalHTML[originalHTMLIndex+1] && originalHTML[originalHTMLIndex+1] !== ' ' && originalHTML[originalHTMLIndex-1] !== ' ' && originalHTML.substring(originalHTMLIndex).startsWith(plainText.substring(i)))) {
                     // Improved check to better handle matching characters within tags vs actual text
                    if(!((plainText[i] === '<' || plainText[i] === '>') && originalHTML.substring(originalHTMLIndex).indexOf(plainText[i] === '<' ? '>' : '<', 1) !== -1 ) ){
                         found = true;
                    }
                }
                originalHTMLIndex++;
            }
            typingElement.innerHTML = currentHTMLConstruction;
            i++;
            setTimeout(typeWriter, 70);
        } else {
            typingElement.innerHTML = originalHTML; 
            typingElement.classList.remove('typing-cursor'); 
        }
    }
    setTimeout(typeWriter, 500); 
  }
  
  // --- Animate elements on page load ---
  const loadAnimations = document.querySelectorAll('.animate-on-load');
  loadAnimations.forEach(el => {
    // CSS should primarily handle these
  });

  // --- Animate Progress Bars on Scroll ---
  const skillItems = document.querySelectorAll('.skill-item');
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.progress-bar');
        if (progressBar) {
          const progress = progressBar.getAttribute('data-progress');
          progressBar.style.width = progress + '%';
        }
        // observer.unobserve(entry.target);
      } else {
        // const progressBar = entry.target.querySelector('.progress-bar');
        // if (progressBar) {
        //   progressBar.style.width = '0%';
        // }
      }
    });
  }, {
    threshold: 0.2 
  });
  skillItems.forEach(item => {
    skillObserver.observe(item);
  });

  // --- Matrix Rain Background for Hero Section (Assuming this is your existing Matrix JS) ---
  const canvas = document.getElementById('matrix-canvas');
  let matrixAnimationIntervalId; // Store interval ID for Matrix

  function startMatrixAnimation() { // Encapsulated start for Matrix
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const setupCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setupCanvas();
    // window.addEventListener('resize', setupCanvas); // Resize handled below with drops

    const characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);

    const drops = [];
    const setupDrops = () => {
        columns = Math.floor(canvas.width / fontSize);
        drops.length = 0; 
        for (let x = 0; x < columns; x++) {
            drops[x] = 1 + Math.random() * canvas.height;
        }
    };
    setupDrops(); 
    window.addEventListener('resize', () => { 
        setupCanvas();
        setupDrops();
    });

    let matrixAccentColor = '#2ecc71'; 
    let matrixBgColor = 'rgba(26, 29, 36, 0.05)'; 

    function drawMatrix() {
      if (document.body.classList.contains('light-mode')) return; // Don't draw if in light mode

      ctx.fillStyle = matrixBgColor; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = matrixAccentColor;
      ctx.font = fontSize + 'px Roboto Mono, monospace';

      for (let i = 0; i < drops.length; i++) {
        if (i >= columns) continue; 
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    if (matrixAnimationIntervalId) clearInterval(matrixAnimationIntervalId);
    
    const rootStyles = getComputedStyle(document.documentElement);
    matrixAccentColor = rootStyles.getPropertyValue('--accent-color').trim() || '#2ecc71';
    const primaryBg = rootStyles.getPropertyValue('--primary-bg-color').trim();
    if (primaryBg.startsWith('#')) {
        const r = parseInt(primaryBg.slice(1, 3), 16);
        const g = parseInt(primaryBg.slice(3, 5), 16);
        const b = parseInt(primaryBg.slice(5, 7), 16);
        matrixBgColor = `rgba(${r}, ${g}, ${b}, 0.05)`;
    } else {
        matrixBgColor = 'rgba(26, 29, 36, 0.05)'; 
    }
    matrixAnimationIntervalId = setInterval(drawMatrix, 50);
    canvas.animationIntervalId = matrixAnimationIntervalId; // Store on canvas element
  }
  // End of Matrix Rain JS Block (original part)

  // === ADD THIS THEME TOGGLE FUNCTIONALITY ===
  const themeToggleBtn = document.getElementById('theme-toggle');
  const bodyElement = document.body;

  const applyTheme = (theme) => {
    const matrixCanvas = document.getElementById('matrix-canvas'); // Get canvas inside applyTheme
    if (theme === 'light') {
      bodyElement.classList.add('light-mode');
      if (matrixCanvas) {
          matrixCanvas.style.display = 'none';
          if (matrixCanvas.animationIntervalId) { // Clear interval if it exists
              clearInterval(matrixCanvas.animationIntervalId);
              matrixCanvas.animationIntervalId = null;
          }
      }
    } else { // 'dark'
      bodyElement.classList.remove('light-mode');
      if (matrixCanvas) {
          matrixCanvas.style.display = 'block';
          startMatrixAnimation(); // Restart Matrix animation for dark mode
      }
    }
    localStorage.setItem('theme', theme);
  };

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (bodyElement.classList.contains('light-mode')) {
        applyTheme('dark');
      } else {
        applyTheme('light');
      }
    });
  }
  // Initial call to start Matrix if in dark mode and canvas exists
  if (canvas && !bodyElement.classList.contains('light-mode')) {
      startMatrixAnimation();
  }

  document.addEventListener("visibilitychange", () => {
    const matrixCanvas = document.getElementById('matrix-canvas');
    if (!matrixCanvas || bodyElement.classList.contains('light-mode')) return; // Do nothing if no canvas or in light mode

    if (document.hidden) {
      if (matrixCanvas.animationIntervalId) {
        clearInterval(matrixCanvas.animationIntervalId);
      }
    } else {
      startMatrixAnimation(); // Restart if tab becomes visible and in dark mode
    }
  });
  // === END OF THEME TOGGLE FUNCTIONALITY ===


}); // End of DOMContentLoaded