const form = document.getElementById('contactForm');
const btnEnviar = document.getElementById('btnEnviar');

const nomeInput = document.getElementById('nome');
const telefoneInput = document.getElementById('telefone');
const emailInput = document.getElementById('email');
const mensagemInput = document.getElementById('mensagem');

/* ===== Máscara telefone ===== */

telefoneInput.addEventListener('input', (e) => {

    let valor = e.target.value.replace(/\D/g, '').slice(0, 11);

    if (valor.length > 10) {
        valor = valor.replace(
            /^(\d{2})(\d{5})(\d{4}).*/,
            '($1) $2-$3'
        );
    } else if (valor.length > 6) {
        valor = valor.replace(
            /^(\d{2})(\d{4})(\d+).*/,
            '($1) $2-$3'
        );
    } else if (valor.length > 2) {
        valor = valor.replace(
            /^(\d{2})(\d+)/,
            '($1) $2'
        );
    } else if (valor.length > 0) {
        valor = valor.replace(
            /^(\d*)/,
            '($1'
        );
    }

    e.target.value = valor;
});

/* ===== Validação ===== */

function validarFormulario() {

    const nome = nomeInput.value.trim();
    const telefone = telefoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!nome || !telefone || !email) {
        alert('Preencha Nome, Telefone e E-mail.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert('Digite um e-mail válido.');
        return false;
    }

    return true;
}

/* ===== Enviar ===== */

function enviarFormulario() {

    if (!validarFormulario()) return;

    const nome = nomeInput.value.trim();
    const telefone = telefoneInput.value.trim();
    const email = emailInput.value.trim();
    const mensagem = mensagemInput.value.trim();

    const texto = `
Olá, Dona Cuca! 👋

Gostaria de ser parceiro.

👤 Nome: ${nome}
📞 Telefone: ${telefone}
📧 E-mail: ${email}

💬 Mensagem:
${mensagem || 'Não informada'}
`;

    /* anima botão */

    btnEnviar.disabled = true;

    /* mostra sucesso */

    setTimeout(() => {

        form.style.display = 'none';

        document.getElementById('formSuccess').style.display = 'block';

        /* abre whatsapp */

        window.open(
            `https://wa.me/5561995122550?text=${encodeURIComponent(texto)}`,
            '_blank'
        );

    }, 700);
}

/* ===== Clique botão ===== */

btnEnviar.addEventListener('click', enviarFormulario);

/* ===== Enter nos inputs ===== */

document.querySelectorAll('#contactForm input').forEach((input) => {

    input.addEventListener('keydown', (e) => {

        if (e.key === 'Enter') {
            enviarFormulario();
        }

    });

});