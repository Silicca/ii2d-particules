var canvas;
var ctx; // !!! context 2D (drawing)

var engine;

var mousex_old = 0;
var mousey_old = 0;

var gen1;
/* Lance la fonction main au chargement de la page html*/
window.addEventListener("load",main);

function main() {
   	canvas=document.getElementById("canvas"); //Recupère le canvas
  	ctx=canvas.getContext("2d"); // Définis le contexte de rendu 2D
    canvas.addEventListener('mousedown',handleMouseDown,false);
    canvas.addEventListener('mouseup',handleMouseUp,false);
    //scene_tp2();
    scene_tp4();
}




function scene_tp4(){
  engine=new Engine();
  var gravity = new Vector(0,6);
  var wind = new Vector(10,0);
  gen1 = new GeneratorBox();
  /*Cadre de l'apparition*/
  gen1.min.setXY(100,100);
  gen1.max.setXY(100,100);
  /*vitesse*/
  gen1.vMin.setXY(-15,-15);
  gen1.vMAx.setXY(15,15);
  /*force*/
  gen1.Allforce.push(gravity);

  var gen2 = new GeneratorBox();
  gen2.min.setXY(400,150);
  gen2.max.setXY(400,150);
  gen2.vMin.setXY(-15,-15);
  gen2.vMAx.setXY(15,15);
  gen2.Allforce.push(gravity);

  engine.particleManager.generatorList.push(gen1,gen2); // ajoute au tableau generatorList
  var coef = 0.7;
  var obs1=new Circle(new Vector(100,100),50);
  obs1.coef = coef;
  var obs2=new Circle(new Vector(250,200),20);
  obs2.coef = coef;
  var obs3=new Segment(new Vector(200,400),new Vector(300,300));
  obs3.coef = coef;
  engine.obstacleManager.all.push(obs1,obs2,obs3);

  engine.start();
}


/*Cercle + pluie de paillettes */
function scene_tp3(){
  engine=new Engine();
  var gravity = new Vector(0,6);
  var wind = new Vector(10,0);
  gen1 = new GeneratorBox();
  /*Cadre de l'apparition*/
  gen1.min.setXY(100,100);
  gen1.max.setXY(100,100);
  /*vitesse*/
  gen1.vMin.setXY(-15,-15);
  gen1.vMAx.setXY(15,15);
  /*force*/
  gen1.Allforce.push(gravity);

  var gen2 = new GeneratorBox();
  gen2.min.setXY(400,150);
  gen2.max.setXY(400,150);
  gen2.vMin.setXY(-15,-15);
  gen2.vMAx.setXY(15,15);
  gen2.Allforce.push(gravity);

  engine.particleManager.generatorList.push(gen1,gen2); // ajoute au tableau generatorList

  var obs1=new Circle(new Vector(100,100),50);
  var obs2=new Circle(new Vector(250,200),20);
  engine.obstacleManager.all.push(obs1,obs2);

  engine.start();
}


/*Pluie de paillettes*/
function scene_tp2(){
  engine=new Engine();
  var gravity = new Vector(0,10);
  gen1 = new GeneratorBox();
  /*Cadre de l'apparition*/
  gen1.min.setXY(100,100);
  gen1.max.setXY(100,100);
  /*vitesse*/
  gen1.vMin.setXY(-15,-15);
  gen1.vMAx.setXY(15,15);
  /*force*/
  gen1.Allforce.push(gravity);

  var gen2 = new GeneratorBox();
  gen2.min.setXY(400,150);
  gen2.max.setXY(400,150);
  gen2.vMin.setXY(-15,-15);
  gen2.vMAx.setXY(15,15);
  gen2.Allforce.push(gravity);



  engine.particleManager.generatorList.push(gen1,gen2); // ajoute au tableau generatorList

  engine.start();
}

function handleMouseUp(event){
  canvas.removeEventListener('mousemove',handleMouseMove,false);
  if(engine.refObstacle != null){
    engine.refObstacle.color = 'rgb(200,0,0)';
  }
}
function handleMouseDown(event) {
  canvas.addEventListener('mousemove',handleMouseMove,false);
  // get the mouse relative to canvas
  mouseX = event.layerX-canvas.offsetLeft;
  mouseY = (event.layerY-canvas.offsetTop)-1.0;

  mousex_old = mouseX;
  mousey_old = mouseY;
  engine.selection(mouseX,mouseY);
  //gen1.min.setXY(mouseX,mouseY);
  //gen1.max.setXY(mouseX,mouseY);
}

function handleMouseMove(event){
  // get the mouse relative to canvas
  mouseX = event.layerX-canvas.offsetLeft;
  mouseY = (event.layerY-canvas.offsetTop)-1.0;


  var x = mouseX - mousex_old;
  var y = mouseY - mousey_old;
  mousex_old = mouseX;
  mousey_old = mouseY;


  engine.move(x,y);
  //gen1.min.setXY(mouseX,mouseY);
  //gen1.max.setXY(mouseX,mouseY);
}
