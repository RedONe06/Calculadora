//ideias: 
//refazer a última operação quando apertar o = de novo
//mostrar histório de c

'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
//Cria um vetor com os valores de id que contém "tecla", cada elemento do vetor vira um objeto.
const operadores = document.querySelectorAll('[id*=operador]');
//Cria um vetor com os valores de id que contém "operador", cada elemento do vetor vira um objeto.

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;
// Teste para ver se o operador foi definido 

/* A função só será executada se uma operação estiver definida. O número anterior já está guardado, 
 ao inserir um número novo 'novoNumero' é setado a true. O número atual é formatado. O resultado mostrado
 é a operação entre o número na memória, operador e o último número guardado.
 eval é uma função "parse" que muda o conteúdo string para cálculo.*/

const calcular = () => {
    if (operacaoPendente()) {
        novoNumero = true;
        const numeroAtual =
            parseFloat(display.textContent.replace(',', '.'));
        const resultado = eval
            (`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
    }
}

/* De modo geral, a função atualiza o display com a string que será passada para dentro do método e
acumula ela se não houver novo evento.
Se houver um novo número (novoNumero = true) então o display recebe o texto passado para a função 
e o formata. Quando o primeiro número aparece na tela "novoNumero" é setado a false. Para a próxima 
leitura de número, "novoNumero = false", portanto entra em else e acumula a string. Enquanto não houver
a definição de outro operador os algarismos continuarão se acumulando. 
*/

/* CONTEÚDO GERAL - DEFINIÇÃO DA FÓRMULA
novoNumero = true ----> qualquer número add vai ser novo
colocou o primeiro número = iniciou o acumulador
definiu um operador ----> operacaoPendente = defined
método calcular fica true e define novoNumero a true

quando roda o método atualizar display com o resultado, novoNumero = true.
Quando entra no if novoNumero = false.
Resultado +=
*/

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR');
    }
}

const inserirNumero = (evento) =>
    atualizarDisplay(evento.target.textContent);
numeros.forEach(numero => numero.addEventListener('click',
    inserirNumero));

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior =
            parseFloat(display.textContent.replace(',', '.'));
    }
}
operadores.forEach(operador => operador.addEventListener('click',
    selecionarOperador));
const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);
const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click',
    limparDisplay);
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click',
    limparCalculo);
const removerUltimoNumero = () => display.textContent =
    display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click',
    removerUltimoNumero);
const inverterSinal = () => {
    novoNumero = true
    atualizarDisplay(display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click',
    inverterSinal);
const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(',');
        } else {
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click',
    inserirDecimal);

const mapaTeclado = {
    '0': 'tecla0',
    '1': 'tecla1',
    '2': 'tecla2',
    '3': 'tecla3',
    '4': 'tecla4',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtrair',
    '+': 'operadorAdicionar',
    '=': 'igual',
    'Enter': 'igual',
    'Backspace': 'backspace',
    'c': 'limparDisplay',
    'Escape': 'limparCalculo',
    ',': 'decimal'
}
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla)
        !== -1;
    if (teclaPermitida())
        document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);