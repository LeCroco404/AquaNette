const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 80);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  document.querySelector('nav').style.boxShadow =
    window.scrollY > 50 ? '0 4px 30px rgba(10,61,95,0.1)' : 'none';
});

document.querySelector('form[name="devis"]').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  fetch('/', { method: 'POST', body: data })
    .then(() => {
      form.style.display = 'none';
      const success = document.getElementById('form-success');
      success.style.display = 'flex';
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 300);
    })
    .catch(() => { form.submit(); });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    ['modal-ml','modal-pc','modal-cgv'].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.classList.remove('open');
    });
  }
});

// Ouverture et fermeture des fenêtres légales (anciens attributs onclick).
document.querySelectorAll('[data-ouvrir]').forEach((el) => {
  el.addEventListener('click', () => document.getElementById(el.dataset.ouvrir).classList.add('open'));
});
document.querySelectorAll('[data-fermer]').forEach((el) => {
  el.addEventListener('click', () => document.getElementById(el.dataset.fermer).classList.remove('open'));
});
document.querySelectorAll('[data-fond-modale]').forEach((el) => {
  el.addEventListener('click', (e) => { if (e.target === el) el.classList.remove('open'); });
});
document.querySelectorAll('[data-nouvelle-demande]').forEach((el) => {
  el.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('form-success').style.display = 'none';
    document.querySelector('.contact-form:not(#form-success)').style.display = 'block';
  });
});
