const botaoEnviar = document.getElementById('enviar');
const PaiLista = document.querySelector('.lista_tarefas');
const textBox = document.querySelector('input');
var conteudoTextBox;

const listaDeElementos = JSON.parse(localStorage.getItem('itens')) || [];

var ano;
var dataAtual;
var dia;
var mes;

function enviaLista() {
    localStorage.setItem('itens', JSON.stringify(listaDeElementos));
}

function criaNota(conteudoTextBox, ano, dia, mes) {
    const elementoItem = document.createElement('elementoItem');
    elementoItem.classList.add('tarefas');

    const elementoDivTarefasTitulo = document.createElement('div');
    elementoDivTarefasTitulo.classList.add('tarefas__titulo');
    elementoItem.append(elementoDivTarefasTitulo);

    const elementoDivTarefasTituloH2 = document.createElement('h2');
    elementoDivTarefasTituloH2.classList.add('tarefas__titulo-titulo');

    elementoDivTarefasTituloH2.innerHTML = `${dia}/${mes}/${ano}`;
    elementoDivTarefasTitulo.append(elementoDivTarefasTituloH2);

    const botaoEditar = document.createElement('button');
    elementoDivTarefasTitulo.append(botaoEditar);
    
    const svg = document.createElement('img');
    svg.setAttribute('src', './assets/imgs/caneta.svg');
    botaoEditar.append(svg);
    
    const elementoDivTarefasConteudo = document.createElement('div');
    elementoDivTarefasConteudo.classList.add('tarefas__conteudo');
    elementoDivTarefasConteudo.textContent = conteudoTextBox;
    elementoItem.append(elementoDivTarefasConteudo);
    
    const elementoDivTarefasConteudoP = document.createElement('p');
    elementoDivTarefasConteudo.append(elementoDivTarefasConteudoP);
    
    botaoEditar.onclick = () => {
        const attTarefa = prompt('Editando nota:');
        if (attTarefa) {
            elementoDivTarefasConteudoP.textContent = attTarefa
            itemLista.item = attTarefa;
            enviaLista();
        }
    }

    return elementoItem;
}

botaoEnviar.addEventListener('click', function () {
    conteudoTextBox = textBox.value;
    if (textBox.value) {
        ano = new Date().getFullYear().toString().slice(-2);
        dataAtual = new Date();
        dia = dataAtual.getDate();
        mes = dataAtual.getMonth() + 1;
        const containerItem = criaNota(conteudoTextBox, ano, dia, mes);
        var itemLista = {
            item: conteudoTextBox,
            ano,
            dia,
            mes
        }
        listaDeElementos.push(itemLista);
        enviaLista()

        if (PaiLista.firstChild) {
            PaiLista.insertBefore(containerItem, PaiLista.firstChild);
        } else {
            PaiLista.appendChild(containerItem);
        }

        textBox.value = '';
    }
});

listaDeElementos.forEach(itemLista => {
    const containerItem = criaNota(itemLista.item, itemLista.ano, itemLista.dia, itemLista.mes);
    if (PaiLista.firstChild) {
        PaiLista.insertBefore(containerItem, PaiLista.firstChild);
    } else {
        PaiLista.appendChild(containerItem);
    }
});