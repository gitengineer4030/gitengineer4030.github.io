(() => {
  'use strict';

  const CONTACT_EMAIL = 'syedabdulwaheed4030@gmail.com';

  /* Footer year (dynamic) */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Mobile navigation */
  const menu = document.getElementById('menu');
  const links = document.getElementById('links');

  const setMenu = (open) => {
    if (!menu || !links) return;
    links.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  if (menu && links) {
    menu.addEventListener('click', (e) => {
      e.stopPropagation();
      setMenu(!links.classList.contains('open'));
    });
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        setMenu(false);
        menu.focus();
      }
    });
    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') && !e.target.closest('.header')) setMenu(false);
    });
    window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => {
      if (e.matches) setMenu(false);
    });
  }

  /* Scroll reveal animations */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll(
    '.about-grid, .section-head, .job, .project-card, .skill-row, .education-card, .contact-panel'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* Contact form (no backend: opens Gmail or the device email app) */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const mailtoBtn = document.getElementById('mailto-btn');

  const setStatus = (text) => { if (status) status.textContent = text; };

  // Read and validate the form, returning the parts of the message
  const readForm = () => {
    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus('Please fill in all fields with a valid email address.');
      return null;
    }
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('subject') || '').trim();
    const message = String(data.get('message') || '').trim();
    const body = `${message}\n\n---\nFrom: ${name}\nReply to: ${email}`;
    return { subject, body };
  };

  if (form) {
    // Gmail: opens a new Gmail compose window in the browser (works without any installed app)
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const parts = readForm();
      if (!parts) return;
      const url = 'https://mail.google.com/mail/?view=cm&fs=1'
        + `&to=${encodeURIComponent(CONTACT_EMAIL)}`
        + `&su=${encodeURIComponent(parts.subject)}`
        + `&body=${encodeURIComponent(parts.body)}`;
      const win = window.open(url, '_blank');
      if (win) {
        win.opener = null;
        setStatus('Gmail is opening in a new tab with your message ready to send.');
      } else {
        setStatus('Your browser blocked the new tab. Allow pop-ups for this site, or use "Open in Email App".');
      }
    });
  }

  // Default email app: uses the device's mail app (for example Outlook or Apple Mail)
  if (mailtoBtn) {
    mailtoBtn.addEventListener('click', () => {
      const parts = readForm();
      if (!parts) return;
      setStatus('Opening your email app with the message ready to send…');
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(parts.subject)}&body=${encodeURIComponent(parts.body)}`;
    });
  }
})();
