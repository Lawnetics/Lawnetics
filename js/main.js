// ===== MOBILE NAV =====
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  nav.classList.toggle('open');
}

// ===== FAQ TOGGLE =====
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ===== FORM SUBMIT =====
function handleFormSubmit(e) {
  if (e) e.preventDefault();
  
  const form = document.getElementById('contactForm');
  if (!form) return;

  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const service = formData.get('service');
  const message = formData.get('message');

  if (!name || !message) {
    alert('Please fill in your name and message.');
    return;
  }

  const whatsappNumber = '919289877177';
  const formattedMessage = `*New Inquiry from LawNetics*%0A%0A` +
    `*Name:* ${name}%0A` +
    `*Email:* ${email || 'N/A'}%0A` +
    `*Phone:* ${phone || 'N/A'}%0A` +
    `*Service:* ${service || 'General Enquiry'}%0A%0A` +
    `*Message:*%0A${message}`;

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${formattedMessage}`;

  // Open WhatsApp in a new tab
  window.open(whatsappURL, '_blank');

  const toast = document.getElementById('toast');
  if (toast) {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
    setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
    }, 4000);
  }
}

// ===== FADE IN OBSERVER =====
function initFadeIns() {
  setTimeout(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
  }, 100);
}

// ===== STICKY HEADER SCROLL =====
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 24px rgba(27,43,94,0.16)';
    } else {
      header.style.boxShadow = '0 2px 20px rgba(27,43,94,0.10)';
    }
  }
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initFadeIns();
  
  // Handle Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // Close mobile nav on outside click
  document.addEventListener('click', (e) => {
    const nav = document.getElementById('mobileNav');
    const hamburger = document.querySelector('.hamburger');
    if (nav && nav.classList.contains('open') && !nav.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
      nav.classList.remove('open');
    }
  });
});
