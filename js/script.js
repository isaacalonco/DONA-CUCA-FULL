import './components/Header.js';
import './components/Footer.js';

import { initScrollAnimations } from './modules/animations.js';
import { initLanguageSelector, restoreSavedLanguage } from './modules/i18n.js';
import {
  initMobileMenu,
  initSmoothScroll,
  initHeroVideoPlayer,
  initTestimonialCarousel,
  initHeaderScrollEffect,
  initProductsDropdown
} from './modules/ui.js';

document.addEventListener('DOMContentLoaded', () => {
  try {

    initMobileMenu();
    initSmoothScroll();
    initHeroVideoPlayer();
    initTestimonialCarousel();
    initHeaderScrollEffect();
    initProductsDropdown();

    initScrollAnimations();

    initLanguageSelector();
    restoreSavedLanguage();
  } catch (error) {
    console.error('[DonaCuca] Erro durante a inicialização:', error);
  }
});
