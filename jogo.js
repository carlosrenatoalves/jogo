
const quadrado = document.getElementById("quadrado");
const comida = document.getElementById("comida");
const titulo = document.getElementById("titulo");
const botao = document.getElementById("botao");
let largura = 30;
let altura = 30;
let pont = 0;



function quadradoMove(x, y) {  //faz o quadrado se mover
    quadrado.style.left = `${x}px`;
    quadrado.style.top = `${y}px`;

}

function calculaDistancia(x, y, x2, y2) { // calcula a distancia entre o quadrado e a comida
    var dist;
    dist = Math.floor(Math.sqrt((x - x2) ** 2 + (y - y2) ** 2));

    return dist;
}


var bo = true;
if (bo == true) {
    comida.style.left = `10px`;
    comida.style.top = `10px`;
    var posX = 10;
    var posY = 10;
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

});

function norm(largura, altura) {
    return Math.sqrt(largura ** 2 + altura ** 2);
}


document.addEventListener('mousemove', (event) => {

    const mousex = event.clientX;
    const mousey = event.clientY;

    quadradoMove(mousex, mousey);
    var dist = calculaDistancia(mousex, mousey, posX + 15, posY + 15);

    if (dist < Math.floor(0.2 * norm(largura, altura))) {

        const maxWidth = window.innerWidth - 3;
        const maxHeight = window.innerHeight - 3;
        posX = Math.floor(Math.random() * maxWidth);
        posY = Math.floor(Math.random() * maxHeight);

        comida.style.left = `${posX}px`;
        comida.style.top = `${posY}px`;

        largura = largura + 5;
        altura = altura + 5;
        quadrado.style.width = `${largura}px`;
        quadrado.style.height = `${altura}px`;
        quadrado.style.marginLeft = `${-largura / 2}px`;
        quadrado.style.marginTop = `${-altura / 2}px`;

        pont++;
        titulo.textContent = `Pontuação:${pont}`;
    }
});

