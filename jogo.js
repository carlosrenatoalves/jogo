
const quadrado = document.getElementById("quadrado");
const comida = document.getElementById("comida");
const titulo=document.getElementById("titulo");
var largura=10;
var altura=10;
var pont=0;


function quadradoMove(x, y){  //faz o quadrado se mover
    quadrado.style.left=`${x}px`;
    quadrado.style.top=`${y}px`;

}

function calculaDistancia(x,y,x2,y2){ // calcula a distancia entre o quadrado e a comida
    var dist;
    dist=Math.floor(Math.sqrt((x-x2)**2+(y-y2)**2));

return dist;
}

var bo=true;
if(bo==true){
    comida.style.left = `10px`;
    comida.style.top = `10px`;
    var posX=10;
    var posY=10;
    bo=false;
}

titulo.textContent=`Pontuação:${pont}`;

document.addEventListener('mousemove',(event)=>{
    
    const mousex=event.clientX;
    const mousey=event.clientY;

    quadradoMove(mousex,mousey);
    var dist=calculaDistancia(mousex,mousey,posX,posY);
    if(dist<20){
        const maxWidth = window.innerWidth - 3;
        const maxHeight = window.innerHeight - 3;
        posX = Math.floor(Math.random() * maxWidth);
        posY = Math.floor(Math.random() * maxHeight);
        comida.style.left = `${posX}px`;
        comida.style.top = `${posY}px`;
        largura=largura+2;
        altura=altura+2;
        quadrado.style.width=`${largura}px`;
        quadrado.style.height=`${altura}px`;
        pont++;
        titulo.textContent=`Pontuação:${pont}`;
    }
});

