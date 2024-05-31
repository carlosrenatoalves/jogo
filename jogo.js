

// ################################### Declaração de Variáveis##########################


const tam = 200;

const quadrado = document.getElementById("quadrado");

let comida = new Array();

for (i = 0; i < tam; i++) {

    comida[i] = document.createElement("img");
    comida[i].src = "comida.png";
    comida[i].className = "comida";
    document.body.appendChild(comida[i]);
}       

const titulo = document.getElementById("titulo");
const botao = document.getElementById("botao");
let largura = 30;
let altura = 30;
let pont = 0;
let posX = new Array();
let posY = new Array();
let angulo=new Array();
let xgoal2= new Array();
let ygoal2=new Array();

//###################################### Funções ########################################

function quadradoMove(x, y) {  //faz o quadrado se mover
    
    quadrado.style.left = `${x}px`;
    quadrado.style.top = `${y}px`;
}

function calculaDistancia(x, y, x2, y2) { // calcula a distancia entre o quadrado e a comida
    var dist;
    dist = Math.floor(Math.sqrt((x - x2) ** 2 + (y - y2) ** 2));

    return dist;
}


function moveComida(i,x,y,tetha){

    comida[i].style.left = `${Math.floor(x)}px`;
    comida[i].style.top  = `${Math.floor(y)}px`;
    comida[i].style.transform = `rotate(${Math.floor((180/Math.PI)*tetha)}deg)`;
}

function setPosicaoInicial(i) {

    const maxWidth = window.innerWidth - 3;
    const maxHeight = window.innerHeight - 3;
    posX[i] = (Math.random() * maxWidth);
    posY[i] = (Math.random() * maxHeight);
    angulo[i]=(Math.random()*Math.PI/2);

    moveComida(i,posX[i],posY[i],angulo[i])

}


function norm(largura, altura) {
    return Math.sqrt(largura ** 2 + altura ** 2);
}

function calculaAngulo(x,y,xgoal,ygoal){
return Math.atan2((ygoal-y),(xgoal-x))
}

function geraPontoAleatorio(){
    let x;let y;
    
    const maxWidth = window.innerWidth - 3;
    const maxHeight = window.innerHeight - 3;
    x= Math.floor(Math.random() * maxWidth);
    y = Math.floor(Math.random() * maxHeight);

    return [x,y]
}

function geraGoal(i){
    
        [xgoal2[i],ygoal2[i]]=geraPontoAleatorio();

}



function trajetoria(){
    let ky=1000;
    let velocidadegoal=1000;
    let lambda;
    let erro2;
    let acm2=0;
    let angulogoal;

    for (i=0;i<tam;i++){
        
        
        angulogoal=calculaAngulo(posX[i],posY[i],xgoal2[i],ygoal2[i]);
        
        erro2=angulogoal-angulo[i];
        acm2=acm2+erro2;
        lambda=ky*(erro2)+ 70*acm2*0.001 ;

        angulo[i]=angulo[i]+(lambda)*0.001;
        
        posX[i]=posX[i]+velocidadegoal*Math.cos(angulo[i])*0.001;
        posY[i]=posY[i]+velocidadegoal*Math.sin(angulo[i])*0.001;

        if(calculaDistancia(posX[i],posY[i],xgoal2[i],ygoal2[i])<0.01){
            geraGoal(i);
        }
        
        moveComida(i,posX[i],posY[i],angulo[i]+3.14/4);

    }
}   


//################################# Inicio do Jogo ##########################
var bo = true;
if (bo == true) {
   
    for (i = 0; i < tam; i++) {
        setPosicaoInicial(i);
        geraGoal(i);
    }
    bo = false;
    titulo.textContent = `Massa:${pont}`;
}


quadrado.style.cursor = "none";

const interval2=setInterval(trajetoria,1);



//################################## Reseta Jogo#################################


botao.addEventListener('click', () => {   // reset jogo
    pont = 0;
    titulo.textContent = `Massa:${pont}`;
    quadrado.style.width = `30px`;
    quadrado.style.height = `30px`;
    quadrado.style.marginLeft = `-15px`;
    quadrado.style.marginTop = `-15px`;
    largura = 30;
    altura = 30;

    for (i = 0; i < tam; i++) {
        setPosicaoInicial(i);
    }

});



// #######################################  Movimrntaç~so mouse ################################


document.addEventListener('mousemove', (event) => {

    const mousex = event.clientX;
    const mousey = event.clientY;

    quadradoMove(mousex, mousey);

    for (i = 0; i < tam; i++) {

        var dist = calculaDistancia(mousex, mousey, posX[i] + 15, posY[i] + 15);

        if (dist < Math.floor(0.25 * norm(largura, altura))) {

            setPosicaoInicial(i);

            if (largura < 1000) {
                largura = largura + 1;
                altura = altura + 1;
                quadrado.style.width = `${largura}px`;
                quadrado.style.height = `${altura}px`;
                quadrado.style.marginLeft = `${-largura / 2}px`;
                quadrado.style.marginTop = `${-altura / 2}px`;
            }

            pont++;
            titulo.textContent = `Massa:${pont}`;
        }
    }
});

