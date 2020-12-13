# Space-Invaders// Space Invaders
// Autor: Ayo Oyewole
// Adaptado por: Gilson Pereira
// Código fonte original: http://www.ayodeji.ca/space-invaders/

// Programa principal

var tela
var c;

var canhao;
var laser;
var alien;
var alien2;
var alien3;
var NaveInimiga;
var espaço;

var canhaoX = 180;
var canhaoY = 529;
var laserX = 193;
var laserY = 520;
var alienX = 0;
var alienY = 0;
var alien2X = 0;
var alien2Y = 0;
var alien3X = 0;
var alien3Y = 0;
var NaveInimigaX = 0;
var NaveInimigaY = 0;
var inicioLaser = false;
var impactoLaserX;
var laserMovendo;
var intervalo = 10;  //altera a velocidade de descida dos aliens
var posicao = 0;
var posicaoInimiga = 0;

var alienLinhas = [10, 38, 66, 94, 122, 150, 178, 206, 234, 262, 290];
var alienColunas = [55, 85, 115, 145, 175];
var aliensRestantes = [];

var NaveInimigaLinhas = [ -555, ] //coloquei numero alto pra nao aparecer logo de inicio
var NaveInimigaColunas = [ 10,]
var NaveInimigaRestantes = []

const C_ALTURA = 600;
const C_LARGURA = 400;

const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_ACIMA = 38;

onkeydown = moverCanhao; // Define função chamada ao se pressionar uma tecla

iniciar(); // Chama função inicial do jogo


// Sub-rotinas (funções)


function iniciar() {
    tela = document.getElementById("tela");
    c = tela.getContext("2d");
	
	c.fillStyle = "espaço";
	c.fillRect(0, 0, C_LARGURA, C_ALTURA);
    
    posicionarNaveInimiga()
    posicionarAlien();
    carregarImagens();
    
    //posicionarNaveInimiga();    //---> Funaçao para uma nave ficar passando da esquerda pra direita atirando


    setInterval("moverNaveInimiga()",intervalo)
	setInterval("moverAliens()",intervalo );
    setInterval("alienAtingido()", 5);
}    

function posicionarAlien() {
    for (var i = 0; i < alienLinhas.length; i++){
        for (var j = 0; j < alienColunas.length; j++){
            var novoAlien = {
                posX : alienLinhas[i],
                posY : alienColunas[j],
                foiAtingido : false
			};
			
            aliensRestantes[aliensRestantes.length] = novoAlien;
        }
    }
}    


function posicionarNaveInimiga(){
    for (var i = 0; i < NaveInimigaLinhas.length; i++){
        for (var j = 0; j < NaveInimigaColunas.length; j++){
            var novoNaveInimiga = {
                posX : NaveInimigaLinhas[i],
                posY : NaveInimigaColunas[j],
                foiAtingido : false
			};
			
            NaveInimigaRestantes[NaveInimigaRestantes.length] = novoNaveInimiga;
        }
    }
    
}

function carregarImagens() {
    canhao = new Image();
    canhao.src = "canhao.png";
    canhao.onload = function(){
        c.drawImage(canhao, canhaoX, canhaoY);
    }
    
    laser = new Image();
    laser.src = "laser.png";
    
    alien = new Image();
    alien.src = "alien.png";

    alien2 = new Image();
    alien2.src = "alien2.png"

    alien3 = new Image();
    alien3.src = "alien3.png"


    espaço = new Image();
    espaço.src = "espaço.png";
    espaço.onload = function(){
        c.drawImage(espaço,0,0)
    }

    NaveInimiga = new Image();
    NaveInimiga.src = "naveInimiga.png";

}

function moverAliens(){
        if (posicao <= 65){
            alienX += 1;
            posicao += 1;
        } else if ((posicao > 65) && (posicao <= 80)){
            alienX += 1;
           alienY += 1
            posicao += 1;            
        } else if ((posicao > 80) && (posicao <= 147)){
            alienX -= 1;
            posicao += 1;
        } else if ((posicao > 147) && (posicao < 162)){
            alienX -= 1;
            alienY += 1;
            posicao += 1;
        } else{
            posicao = 0;
        }
        
        for (var i = 0; i < aliensRestantes.length; i++){
            if (!aliensRestantes[i].foiAtingido){
                c.fillRect((alienX + aliensRestantes[i].posX - 1), (alienY + aliensRestantes[i].posY - 1), 31, 32);
                c.drawImage(alien, (alienX + aliensRestantes[i].posX), (alienY + aliensRestantes[1].posY));
                c.drawImage(alien, (alienX + aliensRestantes[i].posX), (alienY + aliensRestantes[2].posY));
                c.drawImage(alien2, (alienX + aliensRestantes[i].posX), (alienY + aliensRestantes[3].posY));
                c.drawImage(alien2, (alienX + aliensRestantes[i].posX), (alienY + aliensRestantes[4].posY));
                c.drawImage(alien3, (alienX + aliensRestantes[i].posX), (alienY + aliensRestantes[5].posY));
                
                
                
                
                if ((aliensRestantes[i].posY + alienY + 23) >= 530){
                    fimDeJogo();
                }
            }
        }
}

function moverNaveInimiga(){
    if((posicaoInimiga<= 10) && (posicaoInimiga < 162)){
        NaveInimigaX += 1;
        posicaoInimiga += 1;
    }else{
        posicaoInimiga = 0;
    }
  
    for (var i = 0; i < NaveInimigaRestantes.length; i++){
        if (!NaveInimigaRestantes[i].foiAtingido){
            c.fillRect((NaveInimigaX + NaveInimigaRestantes[i].posX - 1), (NaveInimigaY + NaveInimigaRestantes[i].posY - 1), 31, 32);
            c.drawImage(NaveInimiga, (NaveInimigaX + NaveInimigaRestantes[i].posX), (NaveInimigaY + NaveInimigaRestantes[i].posY));
            
        }
    }    
}

function alienAtingido(){
    for(var i = 0; i < aliensRestantes.length; i++){
        if ((laserY >= (alienY + aliensRestantes[i].posY)) && (laserY <= (alienY + aliensRestantes[i].posY + 20)) && 
            (impactoLaserX >= (alienX + aliensRestantes[i].posX - 5)) && (impactoLaserX <= (alienX + aliensRestantes[i].posX + 18))){
            if (!aliensRestantes[i].foiAtingido){
                c.fillStyle = "espaço";
                c.fillRect((alienX + aliensRestantes[i].posX - 1), (alienY + aliensRestantes[i].posY - 1), 31, 32);
                aliensRestantes[i].foiAtingido = true;
                c.fillRect(impactoLaserX, laserY, 6, 19);
                laserY = 0;
            }
        }
    }    
}


//IMAGEM DE FUNDO OK 
function fimDeJogo(){
    
    canhaoX = 180;
    laserX = 193;
    laserY = 520;
    alienX = 0;
    alienY = 0;
    posicao = 0;
    aliensRestantes = [];
    inicioLaser = false;
	
    c.fillStyle = "espaço";
    c.fillRect(0, 0, C_LARGURA, C_ALTURA);
    c.drawImage(espaço,0,0)
    
    c.textAlign = "center";
    c.font = "35px Courier";
    c.fillStyle = "yellow";
    c.fillText("O Império venceu  ", C_LARGURA/2, C_ALTURA/2);
    onkeydown = null;

}
//529   // colocamo 1 pra nao aparecer o bug da reta preta , assim aparecnedo na parte superior do jogo
function moverCanhao(tecla){
    var codigo = tecla.keyCode;
    
    if ((codigo == TECLA_DIREITA) && (canhaoX <= 360)){
        c.fillStyle = "espaço";
        c.drawImage(espaço,0,0)
        c.fillRect(canhaoX, 1, 48, 1);
        canhaoX += 8;
        laserX += 8;
        c.drawImage(canhao, canhaoX, canhaoY);
        
    }
    
    if ((codigo == TECLA_ESQUERDA) && (canhaoX >= 9)){
        c.fillStyle = "espaço";
        c.drawImage(espaço,0,0)
        c.fillRect(canhaoX, 1, 48, 1);
        canhaoX -= 8;
        laserX -= 8;
        c.drawImage(canhao, canhaoX, canhaoY);
        
    }
    
    if ((codigo == TECLA_ACIMA) && !inicioLaser){
        inicioLaser = true;
        c.drawImage(laser, laserX, laserY);
        
        impactoLaserX = laserX;
        laserMovendo = setInterval("dispararLaser()", 1); //altera a velocidade do tiro quanto maior mais lento 
    }
}

// criar function dispararLaserInimigo
function dispararLaserInimigo(){

    
}

function dispararLaser(){
    if (inicioLaser && (laserY >= 60)){
        laserY -= 10;
        c.fillStyle = "espaço.png";
        
        c.fillRect(impactoLaserX, (laserY + 10), 6, 19);
		
        if (laserY >= 70){
            c.drawImage(laser, impactoLaserX, laserY);
            
        }
    }
	
    if (laserY < 60){
        clearInterval(laserMovendo);
        inicioLaser = false;
        laserY = 500;
    }
}
