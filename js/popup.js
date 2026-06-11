(function () {
  if (!document.getElementById('dona-cuca-popup-styles')) {
    const style = document.createElement('style');
    style.id = 'dona-cuca-popup-styles';
    style.textContent = `
      /* ===== Overlay ===== */
      .dc-popup-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.35s ease, visibility 0.35s ease;
      }

      .dc-popup-overlay.dc-active {
        opacity: 1;
        visibility: visible;
      }

      /* ===== Card ===== */
      .dc-popup-card {
        background: #fff;
        border-radius: 20px;
        padding: 48px 40px 36px;
        max-width: 440px;
        width: 90%;
        text-align: center;
        position: relative;
        box-shadow:
          0 25px 60px rgba(0, 0, 0, 0.25),
          0 0 0 1px rgba(252, 163, 17, 0.08);
        transform: scale(0.85) translateY(30px);
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                    opacity 0.35s ease;
      }

      .dc-popup-overlay.dc-active .dc-popup-card {
        transform: scale(1) translateY(0);
        opacity: 1;
      }

      /* ── Botão fechar (X) ── */
      .dc-popup-close {
        position: absolute;
        top: 14px;
        right: 16px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #999;
        cursor: pointer;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s, color 0.2s;
      }

      .dc-popup-close:hover {
        background: #f2f2f2;
        color: #333;
      }

      /* ── Ícone animado ── */
      .dc-popup-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        font-size: 2.2rem;
        animation: dc-icon-bounce 0.6s 0.3s ease both;
      }

      .dc-popup-icon.dc-sucesso {
        background: linear-gradient(135deg, #d4edda, #b7e4c7);
        color: #1b7a3d;
      }

      .dc-popup-icon.dc-parceiro {
        background: linear-gradient(135deg, #fff3cd, #ffe49c);
        color: #b8860b;
      }

      .dc-popup-icon.dc-contato {
        background: linear-gradient(135deg, #d1ecf1, #9fd8e5);
        color: #0c7a8a;
      }

      .dc-popup-icon.dc-erro {
        background: linear-gradient(135deg, #f8d7da, #f5c2c7);
        color: #842029;
      }

      @keyframes dc-icon-bounce {
        0%   { transform: scale(0); }
        50%  { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      /* ── Título ── */
      .dc-popup-titulo {
        font-family: 'Playfair Display', serif;
        font-size: 1.6rem;
        font-weight: 700;
        color: #333;
        margin-bottom: 10px;
      }

      /* ── Mensagem ── */
      .dc-popup-mensagem {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.95rem;
        color: #666;
        line-height: 1.7;
        margin-bottom: 28px;
      }

      /* ── Barra decorativa ── */
      .dc-popup-barra {
        width: 50px;
        height: 3px;
        border-radius: 3px;
        background: linear-gradient(90deg, #fca311, #e8950d);
        margin: 0 auto 24px;
      }

      /* ── Botão principal ── */
      .dc-popup-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 14px 32px;
        border: none;
        border-radius: 50px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .dc-popup-btn.dc-btn-whatsapp {
        background: linear-gradient(135deg, #25D366, #128C7E);
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);
      }

      .dc-popup-btn.dc-btn-whatsapp:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(37, 211, 102, 0.5);
      }

      .dc-popup-btn.dc-btn-dourado {
        background: linear-gradient(135deg, #fca311, #e8950d);
        box-shadow: 0 4px 15px rgba(252, 163, 17, 0.35);
      }

      .dc-popup-btn.dc-btn-dourado:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(252, 163, 17, 0.5);
      }

      /* ── Texto secundário ── */
      .dc-popup-sub {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.8rem;
        color: #999;
        margin-top: 14px;
      }

      /* ── Confetti / partículas ── */
      .dc-confetti {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        animation: dc-confetti-fall 1s ease forwards;
        pointer-events: none;
      }

      @keyframes dc-confetti-fall {
        0%   { opacity: 1; transform: translate(0, 0) scale(1) rotate(0); }
        100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.3) rotate(360deg); }
      }

      /* ── Responsividade ── */
      @media (max-width: 480px) {
        .dc-popup-card {
          padding: 36px 24px 28px;
        }
        .dc-popup-titulo {
          font-size: 1.35rem;
        }
        .dc-popup-icon {
          width: 64px;
          height: 64px;
          font-size: 1.8rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function criarConfetti(card) {
    const cores = ['#fca311', '#25D366', '#bc4749', '#e8950d', '#9fd8e5'];
    for (let i = 0; i < 12; i++) {
      const dot = document.createElement('span');
      dot.className = 'dc-confetti';
      dot.style.background = cores[Math.floor(Math.random() * cores.length)];
      dot.style.left = `${50 + (Math.random() - 0.5) * 20}%`;
      dot.style.top = '35%';
      dot.style.setProperty('--dx', `${(Math.random() - 0.5) * 200}px`);
      dot.style.setProperty('--dy', `${-60 - Math.random() * 120}px`);
      dot.style.animationDelay = `${0.3 + Math.random() * 0.3}s`;
      card.appendChild(dot);
    }
  }

  function fecharPopup(overlay) {
    overlay.classList.remove('dc-active');
    setTimeout(() => overlay.remove(), 400);
  }

  /**
   * Exibe um popup personalizado.
   *
   * @param {Object} opcoes
   * @param {'parceiro'|'contato'|'erro'} opcoes.tipo — Define ícone e cor
   * @param {string}              opcoes.titulo    — Título do popup
   * @param {string}              opcoes.mensagem  — Texto descritivo (aceita HTML)
   * @param {string}              opcoes.textoBotao — Texto do botão
   * @param {'whatsapp'|'dourado'} opcoes.estiloBotao — Estilo do botão
   * @param {boolean}             opcoes.mostrarSub — Mostrar subtexto do WhatsApp
   * @param {Function}            opcoes.onConfirm — Callback ao clicar no botão
   * @param {Function}            opcoes.onClose   — Callback ao fechar sem confirmar
   */

  window.showPopup = function (opcoes) {
    const {
      tipo = 'contato',
      titulo = 'Sucesso!',
      mensagem = '',
      textoBotao = 'Continuar',
      estiloBotao = 'whatsapp',
      mostrarSub = true,
      onConfirm = null,
      onClose = null,
    } = opcoes;

    const icones = {
      parceiro: '<i class="fa-solid fa-handshake"></i>',
      contato: '<i class="fa-solid fa-paper-plane"></i>',
      sucesso: '<i class="fa-solid fa-circle-check"></i>',
      erro: '<i class="fa-solid fa-triangle-exclamation"></i>',
    };

    const overlay = document.createElement('div');
    overlay.className = 'dc-popup-overlay';
    overlay.innerHTML = `
      <div class="dc-popup-card">
        <button class="dc-popup-close" aria-label="Fechar">&times;</button>
        <div class="dc-popup-icon dc-${tipo}">
          ${icones[tipo] || icones.sucesso}
        </div>
        <h3 class="dc-popup-titulo">${titulo}</h3>
        <div class="dc-popup-barra"></div>
        <p class="dc-popup-mensagem">${mensagem}</p>
        <button class="dc-popup-btn dc-btn-${estiloBotao}">
          ${estiloBotao === 'whatsapp' ? '<i class="fa-brands fa-whatsapp"></i>' : ''}
          ${textoBotao}
        </button>
        ${mostrarSub ? `<p class="dc-popup-sub">${window.t ? window.t('popup-redirect-subtext', 'Você será redirecionado ao WhatsApp') : 'Você será redirecionado ao WhatsApp'}</p>` : ''}
      </div>
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.classList.add('dc-active');
      criarConfetti(overlay.querySelector('.dc-popup-card'));
    });


    overlay.querySelector('.dc-popup-close').addEventListener('click', () => {
      if (onClose) onClose();
      fecharPopup(overlay);
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        if (onClose) onClose();
        fecharPopup(overlay);
      }
    });

    overlay.querySelector('.dc-popup-btn').addEventListener('click', () => {
      if (onConfirm) onConfirm();
      fecharPopup(overlay);
    });

    const onEsc = (e) => {
      if (e.key === 'Escape') {
        if (onClose) onClose();
        fecharPopup(overlay);
        document.removeEventListener('keydown', onEsc);
      }
    };
    document.addEventListener('keydown', onEsc);
  };
})();
