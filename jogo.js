
const quadrado = document.getElementById("quadrado");
let comida = new Array();
for (i = 0; i < 30; i++) {
    comida[i] = document.createElement("img");
    comida[i].src="comida.png";
    comida[i].className="comida";
    document.body.appendChild(comida[i]);
}
const titulo = document.getElementById("titulo");
const botao = document.getElementById("botao");
let largura = 30;
let altura = 30;
let pont = 0;
let posX = new Array();
let posY = new Array();

function quadradoMove(x, y) {  //faz o quadrado se mover
    quadrado.style.left = `${x}px`;
    quadrado.style.top = `${y}px`;

}

function calculaDistancia(x, y, x2, y2) { // calcula a distancia entre o quadrado e a comida
    var dist;
    dist = Math.floor(Math.sqrt((x - x2) ** 2 + (y - y2) ** 2));

    return dist;
}

function posicaoComida(i) {

        const maxWidth = window.innerWidth - 3;
        const maxHeight = window.innerHeight - 3;
        posX[i] = Math.floor(Math.random() * maxWidth);
        posY[i] = Math.floor(Math.random() * maxHeight);

        comida[i].style.left = `${posX[i]}px`;
        comida[i].style.top = `${posY[i]}px`;
}



var bo = true;
if (bo == true) {

    for(i=0;i<30;i++){
        posicaoComida(i);
    }
    

    bo = false;
    titulo.textContent = `Pontuação:${pont}`;
}

quadrado.style.cursor = "none";

botao.addEventListener('click', () => {
    pont = 0;
    titulo.textContent = `Pontuação:${pont}`;
    quadrado.style.width = `30px`;
    quadrado.style.height = `30px`;
    quadrado.style.marginLeft = `-15px`;
    quadrado.style.marginTop = `-15px`;
    largura = 30;
    altura = 30;

    for(i=0;i<30;i++){
        posicaoComida(i);
    }

});

function norm(largura, altura) {
    return Math.sqrt(largura ** 2 + altura ** 2);
}


document.addEventListener('mousemove', (event) => {

    const mousex = event.clientX;
    const mousey = event.clientY;

    quadradoMove(mousex, mousey);


    for (i = 0; i < 30; i++) {
        var dist = calculaDistancia(mousex, mousey, posX[i] + 15, posY[i] + 15);

        if (dist < Math.floor(0.25 * norm(largura, altura))) {

            posicaoComida(i);

            largura = largura + 5;
            altura = altura + 5;
            quadrado.style.width = `${largura}px`;
            quadrado.style.height = `${altura}px`;
            quadrado.style.marginLeft = `${-largura / 2}px`;
            quadrado.style.marginTop = `${-altura / 2}px`;

            pont++;
            titulo.textContent = `Pontuação:${pont}`;
        }
    }
});

