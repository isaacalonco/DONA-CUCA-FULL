/**
 * Footer.js — Web Component do rodapé do site
 */

class AppFooter extends HTMLElement {
  connectedCallback() {
    const basePath = this.getBasePath();
    this.innerHTML = this.buildFooterHTML(basePath);
  }

  /**
   * Detecta o prefixo de caminho relativo necessário
   * com base na localização do arquivo HTML atual.
   *
   * @returns {string} Prefixo de caminho relativo ("" ou "../")
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
   * Gera o HTML completo do footer com os caminhos
   * de navegação já resolvidos.
   *
   * @param {string} base - Prefixo de caminho relativo ("" ou "../")
   * @returns {string} HTML do footer
   */
  buildFooterHTML(base) {
    return `
    <footer class="footer">
      <div class="container footer-container">
        <!-- Coluna 1: Contato -->
        <div class="footer-col scroll-reveal">
          <h4 data-i18n="footer-col1">Ligue para nós</h4>
          <p class="phone-number">(61) 99512-2550</p>
          <ul class="contact-list">
            <li>
              <i class="fa-solid fa-location-dot"></i>
              <span data-i18n="footer-address">SIA Trecho 3 Lotes 625 a 695 - Loja 01, Brasília - DF</span>
            </li>
            <li><i class="fa-solid fa-envelope"></i> atendimento@donacuca.com.br</li>
          </ul>
        </div>

        <!-- Coluna 2: Informações -->
        <div class="footer-col scroll-reveal delay-100">
          <h4 data-i18n="footer-col2">Informações</h4>
          <ul class="footer-links">
            <li>
              <a href="${base}sobre/index.html">
                <i class="fa-solid fa-chevron-right text-xs"></i>
                <span data-i18n="footer-about">Sobre a Dona Cuca</span>
              </a>
            </li>
            <li>
              <a href="${base}parceiro/index.html">
                <i class="fa-solid fa-chevron-right text-xs"></i>
                <span data-i18n="footer-partner">Seja um parceiro</span>
              </a>
            </li>
            <li>
              <a href="${base}contato/index.html">
                <i class="fa-solid fa-chevron-right text-xs"></i>
                <span data-i18n="footer-contact">Fale com a gente</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Coluna 3: Acesso rápido -->
        <div class="footer-col scroll-reveal delay-200">
          <h4 data-i18n="footer-col3">Acesso rápido</h4>
          <ul class="footer-links">
            <li>
              <a href="${base}produto/paes-de-queijo.html">
                <i class="fa-solid fa-chevron-right text-xs"></i>
                <span data-i18n="footer-pao">Pão de queijo</span>
              </a>
            </li>
            <li>
              <a href="${base}produto/biscoitos.html">
                <i class="fa-solid fa-chevron-right text-xs"></i>
                <span data-i18n="footer-biscoito">Biscoito de queijo</span>
              </a>
            </li>
            <li>
              <a href="${base}produto/especiais.html">
                <i class="fa-solid fa-chevron-right text-xs"></i>
                <span data-i18n="footer-sabores">Sabores especiais</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Coluna 4: Horários e Redes Sociais -->
        <div class="footer-col scroll-reveal delay-300">
          <h4 data-i18n="footer-col4">Horários de atendimento</h4>
          <ul class="hours-list">
            <li><i class="fa-solid fa-clock"></i> <span data-i18n="footer-hours1">Segunda - Sexta: 8h às 18h</span></li>
            <li><i class="fa-solid fa-clock"></i> <span data-i18n="footer-hours2">Sábado: 8h às 12h</span></li>
            <li><i class="fa-solid fa-clock"></i> <span data-i18n="footer-hours3">Domingos e Feriados: Fechado</span></li>
          </ul>
          <div class="social-icons">
            <a href="https://www.instagram.com/donacucapaodequeijo"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://www.facebook.com/donacucapaodequeijo"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://wa.me/5561995122550"><i class="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Botão flutuante do WhatsApp -->
    <a href="https://wa.me/5561995122550" class="floating-whatsapp" target="_blank"
       aria-label="Fale conosco no WhatsApp">
      <i class="fa-brands fa-whatsapp"></i>
    </a>`;
  }
}

customElements.define('app-footer', AppFooter);
