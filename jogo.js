

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
let acm2 = new Array();

 for(i=0;i<tam;i++){
        acm2[i]=0;
    }


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

    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight ;
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
    
    const maxWidth = window.innerWidth ;
    const maxHeight = window.innerHeight ;
    x= Math.floor(Math.random() * maxWidth);
    y = Math.floor(Math.random() * maxHeight);

    return [x,y]
}

function geraGoal(i){
    
        [xgoal2[i],ygoal2[i]]=geraPontoAleatorio();

}



function trajetoria(){
    let ky=10;
    let ki=1;
    let kp=0.2;
    let velocidadegoal;
    let lambda;
    let erro2;
    let angulogoal;
    let dt=0.1;


    for (i=0;i<tam;i++){
        
        
        angulogoal=calculaAngulo(posX[i],posY[i],xgoal2[i],ygoal2[i]);

        velocidadegoal=kp*norm(xgoal2[i]-posX[i],ygoal2[i]-posY[i]);
        
        erro2=angulogoal-angulo[i];
        acm2[i]=acm2[i]+erro2;
        lambda=ky*(erro2)+ ki*acm2[i]*dt ;

        angulo[i]=angulo[i]+(lambda)*dt;
        
        posX[i]=posX[i]+velocidadegoal*Math.cos(angulo[i])*dt;
        posY[i]=posY[i]+velocidadegoal*Math.sin(angulo[i])*dt;

        if(calculaDistancia(posX[i],posY[i],xgoal2[i],ygoal2[i])<5){
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


const interval2=setInterval(trajetoria,20);



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
       geraGoal(i); 
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

