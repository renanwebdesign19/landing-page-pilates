// Local interactions for the Eixo Pilates design case.
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// SVG files keep their original root dimensions; their wrappers scale with the layout.
function scaleAssets() {
  const scale = window.innerWidth >= 1100 ? Math.min(1, window.innerWidth / 1920) : 1;
  document.documentElement.style.setProperty('--asset-scale', scale);
  document.documentElement.style.setProperty('--icon-scale', scale);
  $$('.icon img').forEach(image => {
    if (window.innerWidth >= 1100) image.style.transform = `scale(${scale})`;
    else image.style.removeProperty('transform');
  });
}
scaleAssets();
window.addEventListener('resize', scaleAssets, { passive: true });

const heroVideo = $('.hero-video');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function syncMotion() {
  if (reducedMotion.matches || document.hidden) heroVideo.pause();
  else heroVideo.play().catch(() => {});
}
reducedMotion.addEventListener('change', syncMotion);
document.addEventListener('visibilitychange', syncMotion);
syncMotion();

// The countdown is illustrative, matching the opening state of the Figma case.
let remaining = 2 * 86400 + 16 * 3600 + 24 * 60 + 48;
const countdownEnd = Date.now() + remaining * 1000;
setInterval(() => {
  remaining = Math.max(0, Math.ceil((countdownEnd - Date.now()) / 1000));
  const units = { days: Math.floor(remaining / 86400), hours: Math.floor(remaining % 86400 / 3600), minutes: Math.floor(remaining % 3600 / 60), seconds: remaining % 60 };
  Object.entries(units).forEach(([key, value]) => {
    $(`[data-count="${key}"]`).textContent = String(value).padStart(2, '0');
  });
}, 1000);

const menuToggle = $('.mobile-menu-toggle');
const nav = $('.nav');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', expanded);
  menuToggle.setAttribute('aria-label', expanded ? 'Fechar menu' : 'Abrir menu');
  nav.classList.toggle('is-open', expanded);
});
$$('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
}));
const observer = new IntersectionObserver(entries => {
  entries.filter(entry => entry.isIntersecting).forEach(entry => {
    $$('.nav a').forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
$$('#inicio, #espaco, #aulas, #comentarios, #redes-sociais').forEach(section => observer.observe(section));

$$('.faq-item').forEach(item => item.addEventListener('toggle', () => {
  if (item.open) $$('.faq-item').forEach(other => { if (other !== item) other.open = false; });
}));

function openDialog(dialog) {
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}
$$('dialog').forEach(dialog => {
  $$('[data-close]', dialog).forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => { if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }});
  dialog.addEventListener('close', () => {
    document.body.style.removeProperty('overflow');
    $$('video', dialog).forEach(video => video.pause());
  });
});

const bookingDialog = $('.booking-dialog');
const bookingForm = $('#booking-form');
const dateField = $('[name="date"]', bookingForm);
const now = new Date();
dateField.min = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
$$('[data-book]').forEach(button => button.addEventListener('click', () => {
  $('.booking-form-view').hidden = false;
  $('.booking-success').hidden = true;
  $('[name="format"]', bookingForm).value = button.dataset.book;
  openDialog(bookingDialog);
}));
bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;
  const data = new FormData(bookingForm);
  const name = String(data.get('name')).trim().split(' ')[0];
  const day = new Date(`${data.get('date')}T12:00:00`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
  $('.success-text').textContent = `${name}, você escolheu ${String(data.get('format')).toLowerCase()} para ${day}, no período da ${String(data.get('period')).toLowerCase()}.`;
  $('.booking-form-view').hidden = true;
  $('.booking-success').hidden = false;
  bookingDialog.scrollTop = 0;
  $('.booking-success [data-close]').focus();
});

// Replace null with local MP4 paths when the testimonial clips are supplied.
const testimonials = [
  { poster: 'assets/imgRectangle12.png', video: null },
  { poster: 'assets/imgRectangle14.png', video: null },
  { poster: 'assets/imgRectangle15.png', video: null },
  { poster: 'assets/imgRectangle16.png', video: null }
];
$$('[data-testimonial]').forEach(button => button.addEventListener('click', () => {
  const media = testimonials[Number(button.dataset.testimonial)];
  const slot = $('.testimonial-dialog-media');
  slot.replaceChildren();
  if (media.video) {
    const video = document.createElement('video');
    video.src = media.video;
    video.poster = media.poster;
    video.controls = true;
    video.playsInline = true;
    slot.append(video);
    openDialog($('.testimonial-dialog'));
    video.play().catch(() => {});
  } else {
    const image = document.createElement('img');
    image.src = media.poster;
    image.alt = 'Capa do depoimento ilustrativo';
    const note = document.createElement('p');
    note.className = 'testimonial-placeholder';
    note.textContent = 'Prévia ilustrativa. O vídeo deste depoimento ainda não foi adicionado.';
    slot.append(image, note);
    openDialog($('.testimonial-dialog'));
  }
}));
