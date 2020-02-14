/**
 * Class :
 *    -GeneratorBox
 *    -ParticleManager
 *    -Particle
 *    -GeneratorPoint
 * */


/**
 *  Sources des particules
 *  -frequence de naissances
 *
 *  */
class GeneratorBox {
  constructor() {
    this.nbBirth=0; // nbr de particule à naitre
    this.birthRate=15; // frequence
    this.min = new Vector(0,0);
    this.max = new Vector(0,0);
    this.longmin = 10;
    this.longmax = 100;
    this.vMin = new Vector(0,0);
    this.vMAx = new Vector(0,0);
    this.Allforce = [];
  }

  initParticle(p) {
    p.position.x = randInt(this.min.x,this.max.x);
    p.position.y = randInt(this.min.y,this.max.y);
    p.color.r = randInt(0,255);
    p.color.g = randInt(0,255);
    p.color.b = randInt(0,255);
    p.isAlive = true;
    p.long = randInt(this.longmin,this.longmax);
    p.vitesse.x = randInt(this.vMin.x,this.vMAx.x);
    p.vitesse.y = randInt(this.vMin.y,this.vMAx.y);
    p.Allforce = this.Allforce;
  }
};



/**
 * La particule avec sa position
 *  */
class Particle {
  constructor() {
    this.oldPosition = new Vector(0,0);
    this.position=new Vector(0,0);
    this.color={r:0,g:0,b:0,a:1};
    this.isAlive=false;
    this.long=0;
    this.oldVitesse = new Vector(0,0);
    this.vitesse= new Vector(0,0);
    this.Allforce = [];
    this.acceleration = new Vector(0,0);
    this.masse = 1;
  }

  /* Afficher la particules*/
  draw() {
    if(this.isAlive){
      var color = 'rgba('+this.color.r +','+ this.color.g+',' + this.color.b+ ',' + this.color.a +')';
      ctx.fillStyle = color;
      ctx.fillRect(this.position.x,this.position.y,3,3);
    }
  }

};

/**
 *  initialise la liste des particules (tableau de taille fixe).
 *  La méthode update se chargera des naissances/disparitions.
 * */
class ParticleManager {
  constructor() {
    this.all=[];
    this.nbAliveMax=2000;
    //this.generator = new GeneratorBox();
    for(var i=0;i<this.nbAliveMax;++i) {
      this.all.push(new Particle());
    }
    this.generatorList=[];
  }

  /* naissance/disparitions*/
  update() {
    /*
    var i = 0;
    var k = this.nbAliveMax/this.generatorList.length;
    for (var j=0;j<this.generatorList.length;j++){
      for(i;i<k;++i) {
        this.generatorList[j].initParticle(this.all[i]);
      }
      i = k;
      k += k;
    }
    */

    /*
    NOTE : Pour eviter le break un tant que la particules n'est pas en vie est possible mais on ne créera plus birthRate particules à chaque update mais une particules !
    */

    /* On incremente la nombre de naissance de birthRate*/
    for (var j=0;j<this.generatorList.length;j++){
        this.generatorList[j].nbBirth += this.generatorList[j].birthRate;
    }
    /* Parcour des particules*/
    for (var i=0;i<this.nbAliveMax;i++){
      /* Si la particules n'est pas 'en vie'*/
      var particules = this.all[i];
      if (!particules.isAlive){
        /*Parcour des génerateur*/
        for (var k=0;k<this.generatorList.length;k++){
            /* Si le generateur peut creer une particules le fait*/
            var generateur= this.generatorList[k];
            if(generateur.nbBirth>=1){
              generateur.initParticle(this.all[i]);
              generateur.nbBirth -= 1;
              break;
            }
        }
      }
      /* Si la particules est 'en vie'*/
      else {
        particules.long -= 1;
        /* si elle n'a plus de longevité elle meurt et alpha est remis à 1 */
        if(particules.long == 0){
          particules.isAlive = false;
          particules.color.a = 1;
        }
        else{
          /* disparition lisse*/
          if(particules.long <= 10){
            particules.color.a -= 0.1 ;
          }
        }
      }
    }
  }

  draw() {
    for(var i=0;i<this.nbAliveMax;++i) {
      this.all[i].draw();
    }
  }
};

/**
 *
 * */
class GeneratorPoint{

}
