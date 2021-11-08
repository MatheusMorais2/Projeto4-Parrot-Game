let numeroCarta = prompt("Com quantas cartas você quer jogar? (Numero par entre 4 e 14)");

while (numeroCarta % 2 !== 0 || numeroCarta < 4 || numeroCarta > 14) {
    numeroCarta = prompt("Com quantas cartas você quer jogar? (Entre 4 e 14)");
}

numeroCarta = parseInt(numeroCarta);
let baralho = [];
let cartasAbertas = [];
let gifsAbertos = [];
let pontuacao = 0;

// Adicionar o numero certo de cartas no baralho
for (let i=0; i< numeroCarta/2; i++){
    baralho.push('/imagens/'+(i+1)+'.gif');
    baralho.push('/imagens/'+(i+1)+'.gif');
    console.log(baralho[i]);
}

baralho.sort(comparador); // Após esta linha,o baralho estará embaralhado
console.log(baralho);

// Função para randomizar o baralho
function comparador() { 
	return Math.random(baralho) - 0.5;
}

// Adicionar as cartas na tela
const main = document.querySelector('main');
for (let j=0; j<numeroCarta; j++) {
    main.innerHTML += 
    `<div class="card" onclick="virarCarta(this)">
            <div class="front-face face">
              <img src="imagens/front.png">
            </div>
            <div class="back-face face">
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
  console.log(gifsAbertos);
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
  console.log(gifsAbertos);
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
    alert("Parabens, voce venceu o jogo!");
  }
}

