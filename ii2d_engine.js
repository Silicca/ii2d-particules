/**
 * "Moteur" de la simulation
 *
 * */

/* Gènere un entier positif entre a et b compris*/
var randInt=function(a,b) {
	return Math.floor(Math.random()*(b-a)+a);
}

var setAttributes=function(v,lAttrib) {
  for(var k in lAttrib) {
    v[k]=lAttrib[k];
  }
}



class Engine {
  constructor() {
    this.particleManager = new ParticleManager();
    this.time=0;
    this.deltaTime=0.1;
		this.obstacleManager = new ObstacleManager();
    this.refObstacle = null ;//ref de l'obstacle séléctioné
  }

	/**
	Nettois le canva
	*/
  draw() {
    ctx.clearRect(0,0,500,500);
		//this.aleaRectangle();
		this.particleManager.draw();
		this.obstacleManager.draw();
  }

	/**
	 *Affiche un rectangle aleatoire
	 */
	aleaRectangle(){
		ctx.fillStyle = 'rgb(200,0,0)'; // Couleur du canvas
		var p1 = new Vector();
		p1.setRandInt(new Vector(100,100),new Vector(200,200));
		ctx.fillRect(p1.x, p1.y, randInt(1,200), randInt(1,200)); // rectangle noir
	}

	/**
	Mise a jour des données
	*/
  updateData() {
		this.particleManager.update();
		this.accelerationCalcul();
		this.newParticulePosition();
		this.collision();
    this.obstacleManager.update();
  }

	accelerationCalcul(){
		for (var i=0;i<this.particleManager.nbAliveMax;i++){
			var particule = this.particleManager.all[i];
			if(particule.isAlive){
				 particule.acceleration.setXY(0,0);
				 for (var k=0;k<particule.Allforce.length;k++){
					 particule.acceleration.add(particule.Allforce[k]);
				 }
				 particule.acceleration.div(particule.masse)
			}
		}
	}

	newParticulePosition(){
		for (var i=0;i<this.particleManager.nbAliveMax;i++){
			var particule = this.particleManager.all[i];
			if(particule.isAlive){
				/* Mise a jour de v_old et x_old*/
				particule.oldVitesse.setXY(particule.vitesse.x,particule.vitesse.y);
				particule.oldPosition.setXY(particule.position.x,particule.position.y);

				var acc_x = particule.acceleration.x;
				var acc_y = particule.acceleration.y;
				particule.acceleration.mult(this.deltaTime);
				particule.vitesse.add(particule.acceleration);
				var v_x = particule.vitesse.x;
				var v_y = particule.vitesse.y;
				particule.vitesse.mult(this.deltaTime)
				particule.position.add(particule.vitesse);
				particule.vitesse.setXY(v_x,v_y);
				particule.acceleration.setXY(acc_x,acc_y);
			}
		}
	}

	collision(){
		for (var i=0;i<this.particleManager.nbAliveMax;i++){
			var particule = this.particleManager.all[i];
			if(particule.isAlive){
				for (var k=0;k<this.obstacleManager.all.length;k++){
					var obstacle = this.obstacleManager.all[k];
					this.solveCollision(particule,obstacle);
				}
			}
		}
	}

	solveCollision(particule,obstacle){
    var newoldpos = new Vector(particule.oldPosition.x,particule.oldPosition.y);
    newoldpos.add(obstacle.dataForOldPosParticule());
		var res = obstacle.intersect(newoldpos,particule.position);
		if(res.isIntersect == true){
			var n = res.normal;
			var pos = res.position;
      particule.oldPosition.setXY(newoldpos.x,newoldpos.y);
			this.impulse(particule,n,pos,obstacle);
			//particule.position.setXY(n.x,n.y);
			//particule.vitesse.setXY(0,0);
		}
	}

	impulse(particule,ncol,pcol,obstacle){
		var v_new_x = particule.vitesse.x;
		var v_new_y = particule.vitesse.y;

		var pcol_x = pcol.x;
		var pcol_y = pcol.y;

		var ncol_x = ncol.x;
		var ncol_y = ncol.y;

		var vnew = new Vector(v_new_x,v_new_y);
		//ncol deja unitaire ?

		//Calcule de vnew = ((Vnew.n)n)
		ncol.mult(vnew.dot(ncol));
		vnew.setXY(ncol.x,ncol.y);

		//calcule de Vcol = v - (1+epsi)Vnew
		vnew.mult(1+obstacle.coef);
		particule.vitesse.soustra(vnew);

		//Mise a jour de v_old et x_old
		particule.oldVitesse.setXY(v_new_x,v_new_y);
		particule.oldPosition.setXY(particule.position.x,particule.position.y);

		// remise a la normal de ncol
		ncol.setXY(ncol_x,ncol_y);

		// Calcule de H
		pcol.soustra(particule.position);
		ncol.mult(ncol.dot(pcol));

		ncol.mult(1+1);
		particule.position.add(ncol);
		//particule.position.setXY(pcol_x + ncol.x, pcol_y +ncol.y);
		//particule.position.setXY(pcol_x,pcol_y);
	}

  /*
  Selectionne un obstacle
  */
  selection(x,y){
      this.refObstacle = this.obstacleManager.closest(new Vector(x,y));
      if(this.refObstacle != null){
        this.refObstacle.color = 'rgb(0,0,200)';
      }
  }

  /*
  Bouge un obstacle
  */
  move(x,y){
      this.refObstacle.move(x,y);
  }

  loop() {
    this.time+=this.deltaTime;
    this.updateData(); // évolution des données
    this.draw(); // effacer le canva
    window.requestAnimationFrame(this.loop.bind(this)); // Affichage synchronisé (60FPS)
	}

  start() {
    this.loop();
  }

}
