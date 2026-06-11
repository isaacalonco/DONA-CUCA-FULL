/**
 * i18n.js — Módulo de internacionalização (tradução)
 */

const STORAGE_KEY_LANG = 'dona-cuca-lang';
const STORAGE_KEY_FLAG = 'dona-cuca-flag';
const DEFAULT_LANGUAGE = 'pt';
const DEFAULT_FLAG = 'br';


window.t = function (key, defaultValue = '') {
  if (window.currentTranslations && window.currentTranslations[key] !== undefined) {
    return window.currentTranslations[key];
  }
  return defaultValue;
};

/** Cache de traduções já carregadas para evitar requisições repetidas */
const translationsCache = {};

/** Idioma ativo no momento */
let activeLanguage = DEFAULT_LANGUAGE;

/**
 * Descobre o caminho base até a pasta `locales/` independentemente
 * de qual subpasta o HTML esteja (raiz, /produto, /sobre, etc.).
 *
 * Usa a localização do próprio script como referência, garantindo
 * que funcione tanto com caminhos relativos quanto absolutos.
 *
 * @param {string} languageCode - Código do idioma (ex: "pt", "en", "es")
 * @returns {string} URL completa do arquivo JSON de tradução
 */
function buildLocaleUrl(languageCode) {
  try {
    const scriptTag = document.querySelector('script[src*="script.js"]');
    const baseUrl = scriptTag ? scriptTag.src : window.location.href;
    return new URL(`../locales/${languageCode}.json`, baseUrl).href;
  } catch {
    return `locales/${languageCode}.json`;
  }
}

/**
 * Carrega o arquivo de tradução para o idioma solicitado.
 * Utiliza cache para evitar requisições duplicadas ao servidor.
 *
 * @param {string} languageCode - Código do idioma (ex: "pt", "en", "es")
 * @returns {Promise<Object|null>} Objeto com as traduções ou null em caso de erro
 */
export async function loadTranslations(languageCode) {
  if (translationsCache[languageCode]) {
    return translationsCache[languageCode];
  }

  const localeUrl = buildLocaleUrl(languageCode);

  try {
    const response = await fetch(localeUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ao carregar "${localeUrl}"`);
    }

    const translationData = await response.json();
    translationsCache[languageCode] = translationData;
    return translationData;
  } catch (error) {
    console.error(
      `[i18n] Falha ao carregar traduções para "${languageCode}":`,
      error.message
    );
    return null;
  }
}

/**
 * Aplica as traduções carregadas a todos os elementos do DOM
 * que possuam os atributos `data-i18n` (textos) e
 * `data-i18n-placeholder` (placeholders de inputs).
 *
 * @param {Object|null} translationData - Objeto com pares chave/valor de tradução
 */
export function applyTranslations(translationData) {
  if (!translationData) return;

  const textElements = document.querySelectorAll('[data-i18n]');
  textElements.forEach(element => {
    const translationKey = element.getAttribute('data-i18n');
    if (translationData[translationKey] !== undefined) {
      element.innerHTML = translationData[translationKey];
    }
  });

  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(element => {
    const translationKey = element.getAttribute('data-i18n-placeholder');
    if (translationData[translationKey] !== undefined) {
      element.placeholder = translationData[translationKey];
    }
  });
}

/**
 * Atualiza os indicadores visuais do seletor de idioma no header
 * (bandeira e sigla do idioma).
 *
 * @param {string} languageCode - Código do idioma (ex: "pt")
 * @param {string} flagCode - Código do país para a bandeira (ex: "br")
 */
function updateLanguageIndicator(languageCode, flagCode) {
  const flagImage = document.getElementById('current-flag');
  const languageLabel = document.getElementById('current-lang-text');

  if (flagImage) {
    flagImage.src = `https://flagcdn.com/w20/${flagCode}.png`;
  }
  if (languageLabel) {
    languageLabel.textContent = languageCode.toUpperCase();
  }
}

/**
 * Define o idioma ativo, carrega as traduções, aplica ao DOM
 * e persiste a escolha no localStorage.
 *
 * @param {string} languageCode - Código do idioma
 * @param {string} flagCode - Código do país para a bandeira
 */
export async function setLanguage(languageCode, flagCode) {
  const translationData = await loadTranslations(languageCode);
  applyTranslations(translationData);
  window.currentTranslations = translationData;

  activeLanguage = languageCode;
  document.documentElement.lang = languageCode;

  updateLanguageIndicator(languageCode, flagCode);

  try {
    localStorage.setItem(STORAGE_KEY_LANG, languageCode);
    localStorage.setItem(STORAGE_KEY_FLAG, flagCode);
  } catch (error) {
    console.warn('[i18n] Não foi possível salvar preferência de idioma:', error.message);
  }
}

/**
 * Conecta os event listeners ao dropdown de seleção de idioma.
 * Deve ser chamado após o DOM estar pronto (incluindo Web Components).
 */
export function initLanguageSelector() {
  const languageSelector = document.querySelector('.language-selector');
  const languageOptions = document.querySelectorAll('.lang-dropdown li');

  if (languageSelector) {
    const toggleDropdown = (event) => {
      event.stopPropagation();
      const isOpen = languageSelector.classList.contains('open');
      languageSelector.classList.toggle('open', !isOpen);
      languageSelector.setAttribute('aria-expanded', !isOpen);
    };

    languageSelector.addEventListener('click', toggleDropdown);
    languageSelector.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleDropdown(event);
      }
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.language-selector')) {
        languageSelector.classList.remove('open');
        languageSelector.setAttribute('aria-expanded', 'false');
      }
    });
  }

  languageOptions.forEach(option => {
    option.addEventListener('click', function handleLanguageClick(event) {
      event.stopPropagation();

      const languageCode = this.getAttribute('data-lang');
      const flagCode = this.getAttribute('data-flag');

      if (!languageCode || !flagCode) return;

      setLanguage(languageCode, flagCode);

      if (languageSelector) {
        languageSelector.classList.remove('open');
        languageSelector.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/**
 * Restaura o idioma salvo pelo usuário (ou usa o padrão).
 * Deve ser chamado na inicialização da página.
 */
export function restoreSavedLanguage() {
  let savedLanguage = DEFAULT_LANGUAGE;
  let savedFlag = DEFAULT_FLAG;

  try {
    savedLanguage = localStorage.getItem(STORAGE_KEY_LANG) || DEFAULT_LANGUAGE;
    savedFlag = localStorage.getItem(STORAGE_KEY_FLAG) || DEFAULT_FLAG;
  } catch {
  }

  setLanguage(savedLanguage, savedFlag);
}

/** @returns {string} O código do idioma ativo no momento */
export function getActiveLanguage() {
  return activeLanguage;
}
