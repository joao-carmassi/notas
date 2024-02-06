// Queries
const botaoEnviar = document.getElementById('enviar');
const PaiLista = document.querySelector('.lista_tarefas');
const textBox = document.querySelector('input');

// Vars
let itemLista;
let botaoDelete = [];

// Local Storage
let listaDeElementos = JSON.parse(localStorage.getItem('itens')) || [];

botaoEnviar.addEventListener('click', attLista);

function criarNota() {
    PaiLista.innerHTML = '';
    listaDeElementos.forEach(itemLista => {
        PaiLista.innerHTML += `
        <li class="tarefas">
            <div class="tarefas__titulo">
                <h2 class="tarefas__titulo-titulo">${itemLista.dia}/${itemLista.mes}/${itemLista.ano}</h2>
                <button class="botao-deletar" id="${itemLista.id}"><img src="./assets/imgs/lixo.svg" alt="${itemLista.id}"></button>
            </div>
            <div class="tarefas__conteudo">
                <p>${itemLista.item}</p>
            </div>
        </li>
        `
    });
    verificaBotoes();
}

function attLista() {
    if (textBox.value != '') {
        itemLista = getDate();
        itemLista.item = textBox.value;
        itemLista.id = listaDeElementos.length;

        listaDeElementos.push(itemLista);
        localStorage.setItem('itens', JSON.stringify(listaDeElementos));

        textBox.value = '';
        criarNota();
    }
}

function getDate() {
    const dataAtual = new Date();
    const anoNaoFormatado = dataAtual.getFullYear();
    const diaNaoFormatado = dataAtual.getDate();
    const mesNaoFormatado = dataAtual.getMonth() + 1;

    const mes = String(mesNaoFormatado).padStart(2, '0');
    const dia = String(diaNaoFormatado).padStart(2, '0');
    const ano = String(anoNaoFormatado).padStart(2, '0');

    return {
        mes,
        dia,
        ano
    }
}

function verificaBotoes() {
    botaoDelete = document.querySelectorAll('.botao-deletar');
    botaoDelete.forEach(botao => botao.addEventListener('click', apagarItem));
}

function apagarItem() {
    const idBotao = this.id;
    listaDeElementos = listaDeElementos.filter(item => item.id != idBotao);
    localStorage.setItem('itens', JSON.stringify(listaDeElementos));
    criarNota();
}

criarNota();