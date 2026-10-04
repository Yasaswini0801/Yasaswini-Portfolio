/**
 * Neelisetty Yasaswini - Personal Portfolio Website Script
 * Clean Vanilla JavaScript for interactive UI, animations, and form handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Dynamic Typewriter Effect
  // --------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  const phrases = [
    'AI & Machine Learning',
    'Deep Learning Architectures',
    'Computer Vision & Embeddings',
    'Intelligent Systems'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typingElement) {
    typeEffect();
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Menu Toggle
  // --------------------------------------------------------------------------
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  // Close mobile menu when any navigation link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu) {
        navMenu.classList.remove('show-menu');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. Header Scrolled State & Back to Top Visibility
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header styling on scroll
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button opacity
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'all';
      } else {
        backToTopBtn.style.opacity = '0.7';
      }
    }
  });

  // --------------------------------------------------------------------------
  // 4. ScrollSpy / Active Link Highlighting
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (activeLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach((link) => link.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // --------------------------------------------------------------------------
  // 5. Contact Form Submission Feedback
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all required fields.';
        return;
      }

      // Visual feedback on send
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
          <strong>Thank you, ${name}!</strong> Your message has been prepared. 
          To enable live delivery directly to your inbox, connect this form to Formspree, EmailJS, or your preferred service.
        `;
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-regular fa-paper-plane"></i>';

        // Auto hide notification after 8 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
          formStatus.className = 'form-status';
        }, 8000);
      }, 900);
    });
  }

  // --------------------------------------------------------------------------
  // 6. Dynamic Year in Footer
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
