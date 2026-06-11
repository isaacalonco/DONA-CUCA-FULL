const form = document.getElementById('contactForm');
const btnEnviar = document.getElementById('btnEnviar');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const mensagemInput = document.getElementById('mensagem');

function validarFormulario() {
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();

    if (!nome || !email) {
        showPopup({
            tipo: 'erro',
            titulo: window.t ? window.t('popup-req-fields-title', 'Campos obrigatorios') : 'Campos obrigatorios',
            mensagem: window.t ? window.t('popup-req-fields-msg-contact', 'Preencha os campos <strong>Nome</strong> e <strong>E-mail</strong> para continuar.') : 'Preencha os campos <strong>Nome</strong> e <strong>E-mail</strong> para continuar.',
            textoBotao: window.t ? window.t('popup-req-fields-button', 'Entendi') : 'Entendi',
            estiloBotao: 'dourado',
            mostrarSub: false
        });
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showPopup({
            tipo: 'erro',
            titulo: window.t ? window.t('popup-invalid-email-title', 'E-mail invalido') : 'E-mail invalido',
            mensagem: window.t ? window.t('popup-invalid-email-msg', 'Por favor, digite um <strong>e-mail valido</strong> para que possamos entrar em contato.') : 'Por favor, digite um <strong>e-mail valido</strong> para que possamos entrar em contato.',
            textoBotao: window.t ? window.t('popup-invalid-email-button', 'Corrigir') : 'Corrigir',
            estiloBotao: 'dourado',
            mostrarSub: false
        });
        return false;
    }

    return true;
}

function enviarFormulario() {
    if (!validarFormulario()) return;

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const mensagem = mensagemInput.value.trim();

    const msgVazia = window.t ? window.t('whatsapp-message-empty', 'Nao informada') : 'Nao informada';
    const templateMsg = window.t
        ? window.t('whatsapp-message-template', 'Ola, Dona Cuca!\n\nMeu nome e {nome}\nE-mail: {email}\n\nMensagem:\n{mensagem}')
        : 'Ola, Dona Cuca!\n\nMeu nome e {nome}\nE-mail: {email}\n\nMensagem:\n{mensagem}';

    const texto = templateMsg
        .replace('{nome}', nome)
        .replace('{email}', email)
        .replace('{mensagem}', mensagem || msgVazia);

    const whatsappUrl = `https://wa.me/5561995122550?text=${encodeURIComponent(texto)}`;

    btnEnviar.disabled = true;

    const popMsgTemplate = window.t
        ? window.t('popup-contact-ready-msg', '<strong>{nome}</strong>, sua mensagem sera enviada pelo WhatsApp.<br>Clique no botão abaixo para continuar.')
        : '<strong>{nome}</strong>, sua mensagem sera enviada pelo WhatsApp.<br>Clique no botão abaixo para continuar.';

    showPopup({
        tipo: 'contato',
        titulo: window.t ? window.t('popup-contact-ready-title', 'Mensagem pronta!') : 'Mensagem pronta!',
        mensagem: popMsgTemplate.replace('{nome}', nome),
        textoBotao: window.t ? window.t('popup-send-whatsapp', 'Enviar pelo WhatsApp') : 'Enviar pelo WhatsApp',
        estiloBotao: 'whatsapp',
        onConfirm: () => {
            window.open(whatsappUrl, '_blank');
            form.style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';
        },
        onClose: () => {
            btnEnviar.disabled = false;
        }
    });
}

btnEnviar.addEventListener('click', enviarFormulario);

document.querySelectorAll('#contactForm input, #contactForm textarea').forEach((input) => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            enviarFormulario();
        }
    });
});
