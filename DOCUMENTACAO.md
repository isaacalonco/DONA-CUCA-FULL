# Documentação Técnica Completa - Dona Cuca Pão de Queijo

Esta documentação fornece uma visão aprofundada da arquitetura, padrões e tecnologias implementados no frontend do site da Dona Cuca. O projeto é um site estático moderno, altamente focado em performance (Core Web Vitals), modularidade e internacionalização (i18n).

---

## 1. Visão Geral e Arquitetura

O projeto foi construído utilizando **HTML5, CSS3 puro (com variáveis CSS e Grid/Flexbox) e Vanilla JavaScript**. Não há dependências de frameworks pesados (como React ou Vue) ou bibliotecas de UI (como Bootstrap), o que garante um carregamento inicial extremamente rápido e controle total sobre o DOM.

### Princípios Arquiteturais:
- **Modularidade JS**: Uso do padrão ES6 Modules (`type="module"`) para isolar responsabilidades (UI, Animações, i18n, API).
- **Componentização Sem Framework**: Reuso de código HTML complexo através de JavaScript injetando elementos no DOM (ex: `Header.js` e `Footer.js`).
- **Otimização de Assets**: Todos os recursos de mídia pesados utilizam formatos de nova geração (`.webp`), e vídeos possuem carregamento diferido (`preload="none"` com atributo `poster`).
- **Internacionalização (i18n) Client-Side**: O site suporta 3 idiomas (PT-BR, EN-US, ES), gerenciados via JSON estáticos e API `fetch`.

---

## 2. Estrutura de Diretórios

O projeto segue uma estrutura convencional, onde cada tipo de arquivo reside em seu respectivo escopo:

```text
/DONA-CUCA-FULL
├── assets/          # Imagens, vídeos, ícones (preferencialmente WebP e MP4)
├── css/             # Arquivos de estilização isolados por página/contexto
│   ├── style.css      # Variáveis globais, reset e tipografia
│   ├── home.css       # Estilos específicos da página inicial
│   ├── produtos.css   # Estilos para páginas de listagem e detalhes
│   └── ...
├── js/              # Lógica da aplicação
│   ├── components/    # (Header.js, Footer.js) para injeção de HTML
│   ├── modules/       # (ui.js, i18n.js, animations.js) lógica core
│   ├── contato.js     # Validação de form e integração WhatsApp
│   ├── parceiro.js    # Validação e máscara de formulário de parceria
│   ├── popup.js       # Motor global de janelas modais customizadas
│   └── main.js        # Entry-point (importa e inicializa módulos)
├── locales/         # Dicionários de internacionalização
│   ├── pt.json
│   ├── en.json
│   └── es.json
├── produto/         # Sub-diretório de páginas de detalhes de produtos
├── contato/         # Diretório do formulário de contato genérico
├── parceiro/        # Diretório do formulário B2B
├── sobre/           # Página institucional
└── index.html       # Landing page (Hero, Vídeo, Produtos em Destaque)
```

---

## 3. Módulos Core do JavaScript (`js/modules/`)

### 3.1 `ui.js`
Responsável pela interface do usuário e interações DOM globais.
- **Menu Mobile**: Alterna o estado (aberto/fechado) da navbar e do ícone de hambúrguer.
- **Smooth Scroll**: Intercepta cliques em âncoras (`<a href="#id">`) e rola suavemente compensando a altura do header fixo.
- **Hero Video Player**: Lida com a interatividade da "Thumb" do vídeo. Ao clicar no botão de play, ele substitui a thumb e inicia o vídeo.
- **Header Scroll Effect**: Adiciona/remove a classe `.scrolled` no `<header>` quando a tela passa de 50px de rolagem (ativa o fundo opaco).
- **Products Dropdown**: Controla o comportamento de expansão e clique fora do menu de produtos na navbar.

### 3.2 `i18n.js`
Sistema de internacionalização autônomo.
- Identifica a URL do arquivo `.json` baseado na linguagem selecionada e carrega via `fetch()`.
- Percorre o DOM procurando pelo atributo `data-i18n="[CHAVE]"` e `data-i18n-placeholder`.
- Injeta dinamicamente as strings correspondentes traduzidas.
- Salva o idioma selecionado em `localStorage` para persistência entre as páginas do site.
- Expõe uma função global de auxílio `window.t(key, fallback)` para traduzir strings dinâmicas (utilizada pelo `popup.js` e em mensagens do WhatsApp).

### 3.3 `animations.js`
Gerencia a visibilidade e transições através da API `IntersectionObserver`.
- Todos os elementos com a classe `.reveal` começam ocultos no CSS (`opacity: 0; transform: translateY(30px)`).
- Quando entram na viewport, a classe `.active` é adicionada pelo JS, ativando uma transição CSS nativa de entrada suave.

---

## 4. O Componente de Popup Global (`js/popup.js`)

A aplicação desabilita o uso da função obstrutiva padrão do navegador (`alert()`) em favor de uma solução visual rica. 
O arquivo `popup.js` encapsula tanto a estrutura HTML/CSS quanto a lógica de injeção da modal.

- **Autossuficiente**: O CSS (classes `.dc-popup-*`) é gerado via JS na tag `<head>` no primeiro uso, não necessitando importação de arquivo CSS extra.
- **Tipagem Visual**: Permite passar um parâmetro `tipo` (`'contato'`, `'parceiro'`, `'erro'`, `'sucesso'`) que muda dinamicamente as cores e ícones FontAwesome renderizados.
- **Acessibilidade**: Captura a tecla `Escape` (ESC) para fechamento e suporte a cliques "fora" do modal (overlay).
- **Interface Pública**: Expõe `window.showPopup(opcoes)`, que aceita callbacks (`onConfirm`, `onClose`) para interações avançadas como redirecionamentos após validação.

---

## 5. Validação de Formulários e Integração WhatsApp

A comunicação primária com o cliente/parceiro da Dona Cuca ocorre via WhatsApp.

### `contato.js` e `parceiro.js`
Estes scripts operam nas páginas `/contato/` e `/parceiro/`, respectivamente:
1. **Validação Frontend**: O botão "Enviar" checa obrigatoriedade de campos e Regex de e-mail (para ambos). O formulário de parceiros inclui uma *mask* (Regex em tempo de input) para formatar o telefone dinamicamente no padrão brasileiro: `(XX) XXXXX-XXXX`.
2. **Sistema de Tradução e Interpolação**: Os textos do template de disparo contêm variáveis dinâmicas `{nome}`, `{telefone}` que são trocadas via `String.prototype.replace()`. A língua do template segue a língua atual ativa no módulo de `i18n`.
3. **Fluxo de UX**: 
   - Ao preencher tudo corretamente, o JS não envia imediatamente o link. 
   - Ele trava o botão (`disabled = true`) e exibe o `window.showPopup` informando que o cliente será direcionado.
   - Apenas mediante confirmação (botão estilo "WhatsApp"), a URI `https://wa.me/...` com os dados convertidos via `encodeURIComponent()` é aberta em nova aba (`_blank`).
   - O formulário real é então escondido e um card de agradecimento "Sucesso" é exibido em seu lugar (`display: block`).

---

## 6. Componentização do DOM (Header e Footer)

Para garantir DRT (Don't Repeat Yourself) em arquivos estáticos `.html`, os elementos globais de navegação são servidos dinamicamente.

- `js/components/Header.js`: Contém o template string gigante da Navbar e os *dropdowns* de linguagem. Ele seleciona o container `.header` das páginas e preenche via `innerHTML`.
- `js/components/Footer.js`: Similar ao Header, injeta o rodapé do site nas classes `.footer`.

**Vantagens**: A alteração de um link ou nova seção do menu reflete simultaneamente no site todo sem necessidade de motores backend (PHP/NodeJS) ou construtores (Webpack/Astro).

---