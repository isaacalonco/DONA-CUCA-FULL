/**
 * ui.js — Módulo de interações de interface
 */


/**
 * Alterna o ícone do botão mobile entre hambúrguer e X.
 *
 * @param {HTMLElement} menuButton - O botão do menu mobile
 * @param {boolean} isOpen - Se o menu está aberto
 */
function toggleMenuIcon(menuButton, isOpen) {
  const icon = menuButton?.querySelector('i');
  if (!icon) return;

  icon.classList.toggle('fa-bars', !isOpen);
  icon.classList.toggle('fa-xmark', isOpen);
}

export function initMobileMenu() {
  const menuButton = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (!menuButton || !navMenu) return;

  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isOpen = navMenu.classList.contains('active');
    toggleMenuIcon(menuButton, isOpen);
  });

  const navLinks = document.querySelectorAll('.nav-list a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      toggleMenuIcon(menuButton, false);
    });
  });
}

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function handleAnchorClick(event) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      event.preventDefault();

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetElement.getBoundingClientRect().top
        + window.scrollY
        - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

export function initHeroVideoPlayer() {
  const heroVideo = document.getElementById('heroVideo');
  const playButton = document.getElementById('heroPlayBtn');

  if (!heroVideo || !playButton) return;

  playButton.addEventListener('click', () => {
    if (heroVideo.paused) {
      heroVideo.play();
      playButton.style.display = 'none';
      heroVideo.setAttribute('controls', 'true');
    }
  });

  heroVideo.addEventListener('pause', () => {
    playButton.style.display = 'flex';
    heroVideo.removeAttribute('controls');
  });

  heroVideo.addEventListener('play', () => {
    playButton.style.display = 'none';
    heroVideo.setAttribute('controls', 'true');
  });
}


export function initTestimonialCarousel() {
  const carouselTrack = document.querySelector('.carousel-track');
  if (!carouselTrack) return;

  const testimonialCards = carouselTrack.querySelectorAll('.testimonial-card');
  testimonialCards.forEach(card => {
    const clonedCard = card.cloneNode(true);
    carouselTrack.appendChild(clonedCard);
  });
}

export function initHeaderScrollEffect() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

export function initProductsDropdown() {
  const dropdownLink = document.querySelector('.linkprincipal');
  if (!dropdownLink) return;

  dropdownLink.addEventListener('click', function handleDropdownClick(event) {
    event.preventDefault();
    const parentLi = this.closest('.menu-dropdown');
    if (!parentLi) return;

    const isOpen = parentLi.classList.contains('open');
    parentLi.classList.toggle('open', !isOpen);
    this.setAttribute('aria-expanded', !isOpen);
  });


  document.addEventListener('click', (event) => {
    if (!event.target.closest('.menu-dropdown')) {
      const parentLi = document.querySelector('.menu-dropdown.open');
      if (parentLi) {
        parentLi.classList.remove('open');
        parentLi.querySelector('.linkprincipal')?.setAttribute('aria-expanded', 'false');
      }
    }
  });
}
