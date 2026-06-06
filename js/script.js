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
// To receive emails: sign up at formspree.io, create a form,
// then replace YOUR_FORM_ID below with your form's ID (e.g. "xabcdefg").
const FORMSPREE_ID = 'YOUR_FORM_ID';

const form = document.getElementById('newsletterForm');
if (form) {
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const btn   = form.querySelector('button[type="submit"]');
        if (!input || !btn) return;

        const email = input.value.trim();
        if (!email) return;

        const original = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = input.disabled = true;

        try {
            const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, _replyto: email })
            });

            if (res.ok) {
                btn.textContent = "You're in.";
                btn.style.background = '#16a34a';
                btn.style.borderColor = '#16a34a';
                input.value = '';
                setTimeout(() => {
                    btn.textContent = original;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    input.disabled = btn.disabled = false;
                }, 6000);
            } else {
                throw new Error();
            }
        } catch {
            btn.textContent = 'Try again.';
            btn.disabled = input.disabled = false;
            setTimeout(() => { btn.textContent = original; }, 3000);
        }
    });
}
