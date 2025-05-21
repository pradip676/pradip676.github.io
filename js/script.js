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
    let originalHTML = typingElement.innerHTML; 
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

  // --- Matrix Rain Background for Hero Section ---
  const canvas = document.getElementById('matrix-canvas');
  let matrixAnimationIntervalId; 

  function startMatrixAnimation() { 
    if (!canvas) return;
    // Ensure canvas is visible before starting (e.g., not in light mode)
    if (document.body.classList.contains('light-mode')) {
        canvas.style.display = 'none';
        if (canvas.animationIntervalId) {
            clearInterval(canvas.animationIntervalId);
            canvas.animationIntervalId = null;
        }
        return;
    }
    canvas.style.display = 'block'; // Ensure it's visible for dark mode

    const ctx = canvas.getContext('2d');

    const setupCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    const characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    let columns; // Defined in setupDrops
    const drops = [];

    const setupDropsAndCanvas = () => { // Combined setup
        setupCanvas(); // Setup canvas dimensions first
        columns = Math.floor(canvas.width / fontSize);
        drops.length = 0; 
        for (let x = 0; x < columns; x++) {
            drops[x] = 1 + Math.random() * canvas.height;
        }
    };
    setupDropsAndCanvas(); 
    window.addEventListener('resize', setupDropsAndCanvas);


    let matrixAccentColor = '#2ecc71'; 
    let matrixBgColor = 'rgba(26, 29, 36, 0.05)'; 

    function drawMatrix() {
      if (document.body.classList.contains('light-mode') || !canvas || canvas.offsetParent === null) { // Check if canvas is visible
          if (canvas && canvas.animationIntervalId) {
              clearInterval(canvas.animationIntervalId);
              canvas.animationIntervalId = null;
          }
          return; 
      }

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

    if (matrixAnimationIntervalId) clearInterval(matrixAnimationIntervalId); // Clear any existing interval
    if (canvas.animationIntervalId) clearInterval(canvas.animationIntervalId); // Also check property on canvas
    
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
    canvas.animationIntervalId = matrixAnimationIntervalId; 
  }
  // End of Matrix Rain JS Block

  // === THEME TOGGLE FUNCTIONALITY ===
  const themeToggleBtn = document.getElementById('theme-toggle');
  const bodyElement = document.body;

  const applyTheme = (theme) => {
    const matrixCanvasRef = document.getElementById('matrix-canvas'); 
    if (theme === 'light') {
      bodyElement.classList.add('light-mode');
      if (matrixCanvasRef) {
          matrixCanvasRef.style.display = 'none';
          if (matrixCanvasRef.animationIntervalId) { 
              clearInterval(matrixCanvasRef.animationIntervalId);
              matrixCanvasRef.animationIntervalId = null;
          }
      }
    } else { // 'dark'
      bodyElement.classList.remove('light-mode');
      if (matrixCanvasRef) {
          // matrixCanvasRef.style.display = 'block'; // Handled by startMatrixAnimation
          if (typeof startMatrixAnimation === 'function') {
            startMatrixAnimation(); 
          }
      }
    }
    localStorage.setItem('theme', theme);
  };

  const savedTheme = localStorage.getItem('theme');
  
  // CORRECTED CRITICAL PART FOR DEFAULT THEME
  if (savedTheme) {
    applyTheme(savedTheme); 
  } else {
    const prefersDarkFromOS = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkFromOS) {
      applyTheme('dark'); 
    } else {
      applyTheme('dark'); // <<<< ENSURES DARK IS THE ULTIMATE DEFAULT
    }
  }
  // END OF CORRECTED CRITICAL PART

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (bodyElement.classList.contains('light-mode')) {
        applyTheme('dark');
      } else {
        applyTheme('light');
      }
    });
  }
  
  // Initial call to start Matrix (only if in dark mode and canvas exists)
  // This runs *after* the initial theme has been set by applyTheme above.
  if (canvas && !bodyElement.classList.contains('light-mode') && typeof startMatrixAnimation === 'function') {
      startMatrixAnimation();
  }

  document.addEventListener("visibilitychange", () => {
    const matrixCanvasVisibility = document.getElementById('matrix-canvas'); 
    if (!matrixCanvasVisibility || bodyElement.classList.contains('light-mode')) return;

    if (document.hidden) {
      if (matrixCanvasVisibility.animationIntervalId) { 
        clearInterval(matrixCanvasVisibility.animationIntervalId);
        // matrixCanvasVisibility.animationIntervalId = null; // Keep it nullified
      }
    } else {
      if (typeof startMatrixAnimation === 'function') { 
        startMatrixAnimation(); 
      }
    }
  });
  // === END OF THEME TOGGLE FUNCTIONALITY ===

}); // End of DOMContentLoaded