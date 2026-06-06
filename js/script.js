// ── Nav: transparent → solid on scroll ──────────────────────────
const nav = document.getElementById('nav');
if (nav) {
    const syncNav = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', syncNav, { passive: true });
    syncNav();
}

// ── Mobile nav toggle ────────────────────────────────────────────
const toggle = document.getElementById('navToggle');
const menu   = document.getElementById('navMenu');
if (toggle && menu) {
    toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('.nav__link, .nav__cta').forEach(el => {
        el.addEventListener('click', () => {
            menu.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

// ── Scroll reveal with stagger ───────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = [...(entry.target.parentElement?.querySelectorAll('.reveal:not(.visible)') ?? [])];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), Math.max(0, idx) * 90);
        revealObs.unobserve(entry.target);
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Footer year ──────────────────────────────────────────────────
const yrEl = document.getElementById('yr');
if (yrEl) yrEl.textContent = new Date().getFullYear();

// ── Newsletter form ──────────────────────────────────────────────
const form = document.getElementById('newsletterForm');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const btn   = form.querySelector('button[type="submit"]');
        if (!input || !btn) return;

        const original = btn.textContent;
        btn.textContent = "You're in! 🎉";
        btn.style.cssText = 'background:#22c55e;border-color:#22c55e';
        input.value = '';
        input.disabled = btn.disabled = true;

        setTimeout(() => {
            btn.textContent = original;
            btn.style.cssText = '';
            input.disabled = btn.disabled = false;
        }, 5000);
    });
}
