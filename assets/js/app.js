document.addEventListener('DOMContentLoaded', function () {
    const loginInput = document.getElementById('login');
    const senhaInput = document.getElementById('senha');
    const buttonLogin = document.getElementById('buttonLogin');

    const usuarios = [
        { usuario: 'admin', senha: 'admin' },
    ];

    buttonLogin.addEventListener('click', function () {
        realizarLogin();
    });

    senhaInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            realizarLogin();
        }
    });

    function realizarLogin() {
        const usuarioDigitado = loginInput.value;
        const senhaDigitada = senhaInput.value;

        // Verifica se as credenciais estão na lista
        const usuarioEncontrado = usuarios.find(user => user.usuario === usuarioDigitado && user.senha === senhaDigitada);

        if (usuarioEncontrado) {
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        } else {
            var paragrafo = document.querySelector('p')
            paragrafo.innerHTML = 'Usuário ou senha incorretos. Tente novamente.'
        }
    }
});
