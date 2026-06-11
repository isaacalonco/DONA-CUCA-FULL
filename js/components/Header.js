/**
 * Header.js — Web Component do cabeçalho do site
 */

class AppHeader extends HTMLElement {
  connectedCallback() {
    const basePath = this.getBasePath();
    this.innerHTML = this.buildHeaderHTML(basePath);
  }

  /**
   * Detecta o prefixo de caminho relativo necessário
   * com base na localização do arquivo HTML atual.
   *
   * - Se o HTML está na raiz → retorna "" (caminhos diretos)
   * - Se está em /produto/, /sobre/ ou /parceiro/ → retorna "../"
   *
   * @returns {string} Prefixo de caminho relativo
   */
  getBasePath() {
    const currentPath = window.location.pathname.toLowerCase();
    const subfolders = ['produto', 'sobre', 'parceiro', 'contato'];

    const isInSubfolder = subfolders.some(folder =>
      currentPath.includes(`/${folder}/`)
    );

    return isInSubfolder ? '../' : '';
  }

  /**
   * Gera o HTML completo do header com os caminhos
   * de navegação já resolvidos.
   *
   * @param {string} base - Prefixo de caminho relativo ("" ou "../")
   * @returns {string} HTML do header
   */
  buildHeaderHTML(base) {
    return `
    <header class="header">
      <div class="container header-container">
        <div class="logo">
          <img src="${base}assets/logo/logo.png" alt="Dona Cuca">
        </div>

        <button class="mobile-menu-btn" aria-label="Abrir menu">
          <i class="fa-solid fa-bars"></i>
        </button>

        <nav class="nav-menu">
          <ul class="nav-list">
            <li><a href="${base}index.html" data-i18n="nav-home">INÍCIO</a></li>
            <li><a href="${base}sobre/index.html" data-i18n="nav-about">A DONA CUCA</a></li>
            <li class="menu-dropdown">
              <a href="#produtos" class="linkprincipal" aria-expanded="false" role="button">
                <span data-i18n="nav-products">PRODUTOS</span>
                <i class="fa-solid fa-chevron-down text-xs"></i>
              </a>
              <ul class="submenu">
                <li><a href="${base}produto/paes-de-queijo.html" data-i18n="nav-products-paes">Pães de Queijo</a></li>
                <li><a href="${base}produto/biscoitos.html" data-i18n="nav-products-biscoitos">Biscoitos de Queijo</a></li>
                <li><a href="${base}produto/especiais.html" data-i18n="nav-products-sabores">Sabores Especiais</a></li>
              </ul>
            </li>
            <li><a href="${base}parceiro/index.html" data-i18n="nav-partner">SEJA UM PARCEIRO</a></li>
            <li><a href="${base}contato/index.html" data-i18n="nav-contact">FALE COM A GENTE</a></li>
            <li class="language-selector" tabindex="0" aria-expanded="false" role="button" aria-label="Seletor de Idioma">
              <div class="lang-current">
                <img src="https://flagcdn.com/w20/br.png" alt="Português" id="current-flag">
                <span><span id="current-lang-text">PT</span> <i class="fa-solid fa-chevron-down text-xs"></i></span>
              </div>
              <ul class="lang-dropdown">
                <li data-lang="pt" data-flag="br"><img src="https://flagcdn.com/w20/br.png" alt="Português"> <span data-i18n="lang-pt">Português</span></li>
                <li data-lang="en" data-flag="us"><img src="https://flagcdn.com/w20/us.png" alt="English"> <span data-i18n="lang-en">English</span></li>
                <li data-lang="es" data-flag="es"><img src="https://flagcdn.com/w20/es.png" alt="Español"> <span data-i18n="lang-es">Español</span></li>
              </ul>
            </li>
          </ul>
          <a href="https://wa.me/5561995122550?text=${encodeURIComponent('Olá! Gostaria de realizar um pedido.')}" class="btn btn-primary btn-header" data-i18n="btn-order" target="_blank">Peça agora</a>
        </nav>
      </div>
    </header>`;
  }
}

customElements.define('app-header', AppHeader);
