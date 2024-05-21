
const quadrado = document.getElementById("quadrado");
const comida = document.getElementById("comida");


function quadradoMove(x, y){
    quadrado.style.left=`${x}px`;
    quadrado.style.top=`${y}px`;

}

function calculaDistancia(x,y,x2,y2){
    var dist;
    dist=Math.floor(Math.sqrt((x-x2)**2+(y-y2)**2));

return dist;
}

var bo=true;

document.addEventListener('mousemove',(event)=>{

    if(bo==true){
        comida.style.left = `10px`;
        comida.style.top = `10px`;
        var posX=10;
        var posY=10;
        bo=false;
    }


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
    }


});

