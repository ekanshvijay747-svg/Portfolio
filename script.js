// Apple Product Launch Presentation Portfolio - Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const dots = document.querySelectorAll('.nav-dot');
  const dropdown = document.getElementById('projectsDropdown');
  const dropdownTrigger = document.getElementById('dropdownTrigger');
  let currentSlide = 0;

  // 1. Projects Dropdown Menu Toggle & Outside Click
  if (dropdown && dropdownTrigger) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('is-open');
      dropdownTrigger.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('is-open');
        dropdownTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dropdown.classList.contains('is-open')) {
        dropdown.classList.remove('is-open');
        dropdownTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Intersection Observer for Smooth Scroll Snapping & Reveal Animations
  const observerOptions = {
    root: null,
    threshold: 0.35
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = parseInt(entry.target.getAttribute('data-index'), 10);
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (!isNaN(index)) {
          currentSlide = index;
          updateActiveDot(index);
        }
      } else {
        // Reset when out of viewport so scroll-down / re-entry triggers smooth Apple reveal
        entry.target.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // Trigger entrance animation on first slide upon load
  requestAnimationFrame(() => {
    if (sections.length > 0) {
      sections[0].classList.add('is-visible');
    }
  });

  function updateActiveDot(index) {
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });
  }

  // 3. Navigation Dots Click Handlers
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      if (!isNaN(slideIndex) && sections[slideIndex]) {
        sections[slideIndex].scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 4. Keynote Keyboard Navigation (Arrow Keys / Page Keys / Space)
  window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey)) {
      if (currentSlide < sections.length - 1) {
        e.preventDefault();
        sections[currentSlide + 1].scrollIntoView({ behavior: 'smooth' });
      }
    } else if (['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)) {
      if (currentSlide > 0) {
        e.preventDefault();
        sections[currentSlide - 1].scrollIntoView({ behavior: 'smooth' });
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      sections[0].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'End') {
      e.preventDefault();
      sections[sections.length - 1].scrollIntoView({ behavior: 'smooth' });
    }
  });
});
