const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.09 });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

const tabs = [...document.querySelectorAll('[data-project]')];
const panels = [...document.querySelectorAll('[data-panel]')];
function activateProject(name) {
  tabs.forEach(tab => {
    const active = tab.dataset.project === name;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  panels.forEach(panel => {
    const active = panel.dataset.panel === name;
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });
}
tabs.forEach(tab => {
  tab.addEventListener('click', () => activateProject(tab.dataset.project));
  tab.addEventListener('mouseenter', () => {
    if (matchMedia('(hover:hover)').matches) activateProject(tab.dataset.project);
  });
});

const board = document.querySelector('[data-parallax-board]');
if (board && matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches) {
  const floaters = [...board.querySelectorAll('[data-float]')];
  board.addEventListener('pointermove', e => {
    const rect = board.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top) / rect.height - .5;
    floaters.forEach(el => {
      const depth = Number(el.dataset.float || 1);
      el.style.translate = `${x * 7 * depth}px ${y * 7 * depth}px`;
    });
  });
  board.addEventListener('pointerleave', () => floaters.forEach(el => el.style.translate = '0 0'));
}
