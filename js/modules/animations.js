const REVEAL_CLASSES = [
  '.scroll-reveal',
  '.scroll-reveal-left',
  '.scroll-reveal-right'
];

const OBSERVER_OPTIONS = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

/**
 * Adiciona a classe "active" ao elemento, disparando
 * a transição CSS de revelação.
 *
 * @param {Element} element - Elemento do DOM a ser revelado
 */
function revealElement(element) {
  element.classList.add('active');
}

export function initScrollAnimations() {
  const selectorString = REVEAL_CLASSES.join(', ');
  const revealElements = document.querySelectorAll(selectorString);

  if (revealElements.length === 0) return;

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealElement(entry.target);
        scrollObserver.unobserve(entry.target);
      }
    });
  }, OBSERVER_OPTIONS);

  revealElements.forEach(element => {
    scrollObserver.observe(element);
  });
}
