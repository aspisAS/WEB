document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const button = contactForm.querySelector('button[type="submit"]');
  button.disabled = true;
  formNote.textContent = 'Sending…';
  try {
    const res = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    contactForm.reset();
    formNote.textContent = 'Thanks! Your message has been sent. We’ll be in touch soon.';
  } catch {
    formNote.textContent = 'Something went wrong. Please email post@aspis.no directly.';
  } finally {
    button.disabled = false;
  }
});
