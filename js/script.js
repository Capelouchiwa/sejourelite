// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// Booking Form Submission
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const date = document.getElementById('date').value;
    const nights = document.getElementById('nights').value;
    const service = document.getElementById('service').value;
    const budget = document.getElementById('budget').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const notes = document.getElementById('notes').value;

    // Format date
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Create WhatsApp message
    let message = '🌟 *NOUVELLE RÉSERVATION SEJOURELITE* 🌟\n\n';
    message += '📋 *INFORMATIONS CLIENT*\n';
    message += `👤 Nom: ${name}\n`;
    message += `🌍 Pays: ${country}\n`;
    message += `✈️ Ville: ${city}\n\n`;
    message += '📅 *DÉTAILS DU SÉJOUR*\n';
    message += `📍 Arrivée: ${formattedDate}\n`;
    message += `🛏️ Nuits: ${nights}\n`;
    message += `🎯 Service: ${service}\n`;
    if (budget) {
      message += `💰 Budget: ${budget} USD\n`;
    }
    message += '\n📱 *CONTACT*\n';
    message += `WhatsApp: ${whatsapp}\n`;
    if (notes) {
      message += `\n💬 *DEMANDES SPÉCIALES*\n${notes}\n`;
    }
    message += '\n✅ Merci ! Nous confirmons sous 15 minutes.';

    // Send to WhatsApp
    const whatsappNumber = '22300000000'; // Change this to your number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset form
    bookingForm.reset();
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeUp 0.8s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with animation potential
document.querySelectorAll('.service-card, .step-card, .testimonial-card, .stat-box').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const startTime = Date.now();

  const timer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / duration;

    if (progress >= 1) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      const current = Math.floor(start + (target - start) * progress);
      element.textContent = current + (target.toString().includes('+') ? '+' : '');
    }
  }, 10);
}

// Trigger counter animation on scroll
const countElements = document.querySelectorAll('.stat-number');
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countElements.forEach(el => {
        const text = el.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        animateCounter(el, number);
      });
      countersAnimated = true;
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (countElements.length > 0) {
  counterObserver.observe(countElements[0].closest('section'));
}

// Navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.borderBottomColor = 'rgba(212, 175, 55, 0.1)';
  } else {
    navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-container')) {
    navMenu?.classList.remove('active');
  }
});

console.log('SejourElite - Premium hotel booking platform loaded ✅');