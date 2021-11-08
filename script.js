let numeroCarta = prompt("Com quantas cartas você quer jogar? (Numero par entre 4 e 14)");

while (numeroCarta % 2 !== 0 || numeroCarta < 4 || numeroCarta > 14) {
    numeroCarta = prompt("Com quantas cartas você quer jogar? (Entre 4 e 14)");
}

numeroCarta = parseInt(numeroCarta);
let baralho = [];
let cartasAbertas = [];
let gifsAbertos = [];
let pontuacao = 0;
let jogadas = 0;
let segundos = 0;
let minutos = 0;


for (let i=0; i< numeroCarta/2; i++){ // Adicionar o numero certo de cartas no baralho
    baralho.push('/imagens/'+(i+1)+'.gif');
    baralho.push('/imagens/'+(i+1)+'.gif');
    console.log(baralho[i]);
}

baralho.sort(comparador); // Após esta linha,o baralho estará embaralhado
console.log(baralho);


function comparador() { // Função para randomizar o baralho
	return Math.random(baralho) - 0.5;
}

const relogio = document.querySelector('.relogio'); // Adicionar o timer 
const meuTimer = setInterval(timer, 1000);

const main = document.querySelector('main'); // Adicionar as cartas na tela
for (let j=0; j<numeroCarta; j++) {
    main.innerHTML += 
    `<div class="card" onclick="virarCarta(this)" data-identifier="card">
            <div class="front-face face" >
              <img src="imagens/front.png" data-identifier="front-face">
            </div>
            <div class="back-face face" data-identifier="back-face">
                <img src="${baralho[j]}">
            </div>
    </div>`;
}

function virarCarta(carta) {
  //console.log(carta.childNodes[1]);
  //console.log(carta.childNodes[3]);

  let faceFrontal = carta.childNodes[1];
  let faceTraseira = carta.childNodes[3];
  faceFrontal.classList.add('back-face');
  faceTraseira.classList.remove('back-face');
  jogadas++;

  //console.log(carta.childNodes[1]);
  //console.log(carta.childNodes[3]);
  if (cartasAbertas.length < 2) {
    cartasAbertas.push(carta);
  }
  if (cartasAbertas.length === 2) {
    retornaGif();
    compararCartas();
  }
}

function retornaGif () {
  for (let i=0; i< 2; i++){
    let backface = cartasAbertas[i].childNodes[3];
    backface = backface.childNodes[1];
    gif = backface.getAttribute("src");
    gifsAbertos.push(gif);
  }
  //console.log(gifsAbertos);
}

function compararCartas() {
  if (gifsAbertos[0] == gifsAbertos[1]) {
    pontuacao++;
    console.log(pontuacao);
    console.log(cartasAbertas);
  } else {
    setTimeout(desvirarCartas, 1000);
  }
  setTimeout(zerarSelecionados, 1000);
  //console.log(gifsAbertos);
  acabarJogo();
}

function zerarSelecionados (){
  cartasAbertas = [];
  gifsAbertos = [];
}

function desvirarCartas() {
  for (let j=0; j<2;j++) {
    let faceFrontal = cartasAbertas[j].childNodes[1];
    let faceTraseira = cartasAbertas[j].childNodes[3];
    faceFrontal.classList.remove('back-face');
    faceTraseira.classList.add('back-face');
  }
}

function acabarJogo() {
  if (pontuacao === numeroCarta/2) {
    alert(`Voce ganhou em ${jogadas} jogadas e em ${(minutos*60) + segundos} segundos`);
    let decisao = prompt(`Deseja jogar mais uma vez? (sim ou nao)`);
    clearInterval(meuTimer);
    if (decisao === 'sim') {
      window.location.reload();
    }
  }
}

function timer () {
  relogio.innerHTML = `${minutos}:${segundos}`;
  segundos++;
  if (segundos === 60) {
    minutos++;
    segundos = 0;
  }
  //console.log(segundos);
}

