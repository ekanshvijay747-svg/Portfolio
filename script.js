// Apple Product Launch Presentation Portfolio - Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const dots = document.querySelectorAll('.nav-dot');
  let currentSlide = 0;

  // 1. Intersection Observer for Scroll Snapping & Reveal Animations
  const observerOptions = {
    root: null,
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        const index = parseInt(entry.target.getAttribute('data-index'), 10);
        if (!isNaN(index)) {
          currentSlide = index;
          updateActiveDot(index);
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

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

  // 2. Navigation Dots Click Handlers
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      if (!isNaN(slideIndex) && sections[slideIndex]) {
        sections[slideIndex].scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 3. Presentation Keynote Keyboard Navigation (Arrow Keys / Page Keys / Space)
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

  // 4. Graceful Image Fallback (Displays sleek Apple-style placeholder if asset is pending)
  const images = document.querySelectorAll('.media-frame img');
  images.forEach((img) => {
    img.addEventListener('error', () => {
      const frame = img.parentElement;
      const fileName = img.getAttribute('src');
      frame.classList.add('image-fallback');
      frame.innerHTML = `
        <svg class="fallback-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
        <span class="fallback-text">${fileName}</span>
      `;
    });
  });
});
