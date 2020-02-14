/**
 * Class :
 *    -Circle
 *    -ObstacleManager
 * */


/**
 *
 *  */
class Circle {
  constructor(centre,radius) {
    this.oldc = centre;
    this.centre = centre;
    this.radius = radius;
    this.coef = 1;
    this.color = 'rgb(200,0,0)';
  }
  draw(){
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3 ;
    ctx.beginPath();
    ctx.arc(this.centre.x, this.centre.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  intersect(p1,p2){
    // p1 = x_old
    // p2 = x_new

    var mil_x;
    var mil_y;
    var n_x;
    var n_y;

    var longeurP1 = this.longueur(p1,this.centre);
    var longueurP2 = this.longueur(p2,this.centre);

    //P1 dans le cercle
    //racine_carre((x_point - x_centre)² + (y_centre - y_point)) < rayon
    if(longeurP1 <= this.radius){
      // P2 en dehors du cercle
      if(longueurP2 >= this.radius){
        mil_x = (p1.x+p2.x)/2;
        mil_y = (p1.y+p2.y)/2;

        /*Position intersection*/
        var pos = new Vector(mil_x,mil_y);
        var n = new Vector(mil_x,mil_y);

        n.soustra(this.centre);
        n.div(Math.sqrt(Math.pow(n.x,2) + Math.pow(n.y,2)));

        return {isIntersect : true, normal : n, position : pos}
      }
    }

    // Inverse
    if(longueurP2 < this.radius){
      if(longeurP1 > this.radius){
        mil_x = (p1.x+p2.x)/2;
        mil_y = (p1.y+p2.y)/2;

        /*Position intersection*/
        var pos = new Vector(mil_x,mil_y);
        var n = new Vector(mil_x,mil_y);

        n.soustra(this.centre);
        n.div(Math.sqrt(Math.pow(n.x,2) + Math.pow(n.y,2)));

        return {isIntersect : true, normal : n, position : pos}
      }
    }
    return {isIntersect : false, normal : n, position : pos}
  }

  longueur(x,y){
    return Math.sqrt(Math.pow(x.x-y.x,2) + Math.pow( (y.y - x.y),2));
  }

  distance(point){
    // point dans le cercle
    var longeurpoint = this.longueur(point,this.centre)
    if( longeurpoint < this.radius){
        //console.log("IN");
        //console.log(this.radius-longeurpoint);
        return this.radius-longeurpoint;
    }
    // sur le cercle
    else if(longeurpoint == this.radius){
        //console.log("ON");
        //console.log(this.radius);
        return this.radius;
    }
    // en dehors
    else{
        //console.log("OUT");
        //console.log(longeurpoint-this.radius);
        return longeurpoint-this.radius;
    }
  }

  move(x,y){
    this.centre.setXY(this.centre.x + x,this.centre.y + y);
  }

  update(){
    this.oldc.setXY(this.centre.x,this.centre.y);
  }

  dataForOldPosParticule(){
    var vecteur = new Vector(this.centre.x,this.centre.y);
    vecteur.soustra(this.oldc);
    return vecteur;
  }

}


class Segment{
  constructor(a,b) {
    this.olda = a;
    this.oldb = b;
    this.a = a;
    this.b = b;
    this.coef = 1;
    this.color = 'rgb(200,0,0)';
    this.zone = null;
  }

  draw(){
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3 ;
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.stroke();
  }

  intersect(p1,p2){
    // p1 = x_old
    // p2 = x_new
    /*
    u = b-a
    n = (-uy,ux)
    */
    var normal_ab = this.normal(this.a,this.b);
    var normal_p1p2 = this.normal(p1,p2);
    var p = new Vector(this.a.x,this.a.y);
    if((this.signe(p1,this.a,normal_ab) != this.signe(p2,this.a,normal_ab)) && (this.signe(this.a,p1,normal_p1p2) != this.signe(this.b,p1,normal_p1p2)) ){
      normal_ab.div(Math.sqrt(Math.pow(normal_ab.x,2) + Math.pow(normal_ab.y,2))); // normer
      return {isIntersect : true, normal :normal_ab, position :p };
    }
    else{
        return {isIntersect : false, normal :normal_ab, position : p};
    }
  }

  normal(a,b){
    return new Vector(-(b.y-a.y),b.x-a.x);
  }

  signe(p,a,n){
    // signe de p-a par rapport a la normal n
    var x_n = n.x;
    var y_n = n.y;

    var p_x = p.x;
    var p_y = p.y;
    p.soustra(a);
    var signe = n.dot(p);
    p.setXY(p_x,p_y);
    n.setXY(x_n,y_n);
    if(signe > 0){
      return true;
    }
    else{
      return false;
    }
  }

  longueur(x,y){
    return Math.sqrt(Math.pow(x.x-y.x,2) + Math.pow( (y.y - x.y),2));
  }

  zoneA(point){
    var ax = this.a.x;
    var ay = this.a.y;
    var px = point.x;
    var py = point.y;

    point.soustra(this.a);
    this.a.soustra(this.b);

    var signe = point.dot(this.a);

    this.a.setXY(ax,ay);
    point.setXY(px,py);
    if(signe > 0){
      return true;
    }
    else{
      return false;
    }
  }

  zoneB(point){
    var bx = this.b.x;
    var by = this.b.y;
    var px = point.x;
    var py = point.y;
    point.soustra(this.b);
    this.b.soustra(this.a);

    var signe = point.dot(this.b);

    this.b.setXY(bx,by);
    point.setXY(px,py);
    if(signe > 0){
      return true;
    }
    else{
      return false;
    }
  }

  distance(point){

      if(this.zoneA(point)){
        //console.log("Zone A");
        this.zone = "A";
        return this.longueur(this.a,point);
      }
      else if(this.zoneB(point)){
        //console.log("Zone B");
        this.zone = "B"
        return this.longueur(this.b,point);
      }
      else{
        //console.log("Other");
        this.zone = "O";
        var normal_ab = this.normal(this.a,this.b);
        normal_ab.div(Math.sqrt(Math.pow(normal_ab.x,2) + Math.pow(normal_ab.y,2)));
        point.soustra(this.a);
        return Math.abs(normal_ab.dot(point));
      }
  }

  move(x,y){
    if(this.zone == "A"){
      this.a.setXY(this.a.x + x,this.a.y + y);
    }
    else if (this.zone == "B") {
      this.b.setXY(this.b.x + x,this.b.y + y);
    }
    else {
      this.a.setXY(this.a.x + x,this.a.y + y);
      this.b.setXY(this.b.x + x,this.b.y + y);
    }
  }

  update(){
    if(this.zone == "A"){
      this.olda.setXY(this.a.x,this.a.y);
    }
    else if (this.zone == "B") {
      this.oldb.setXY(this.b.x,this.b.y);
    }
    else {
      this.olda.setXY(this.a.x,this.a.y);
      this.oldb.setXY(this.b.x,this.b.y);
    }
  }

  dataForOldPosParticule(){





    if(this.zone == "A"){
      var vecteur = new Vector(this.a.x,this.a.y);
      vecteur.soustra(this.olda);
    }
    else if (this.zone == "B") {
      var vecteur = new Vector(this.b.x,this.b.y);
      vecteur.soustra(this.oldb);
    }
    else {
      var vecteur = new Vector(this.a.x,this.a.y);
      vecteur.soustra(this.olda);
    }


    return vecteur;
  }
}

/**
 *
 *  */
class ObstacleManager {
  constructor() {
    this.all = [];
  }
  draw(){
    for (var i=0;i<this.all.length;i++){
      this.all[i].draw();
    }
  }

  closest(point){

    var seuil = 40;

    if(this.all.length == 0){
      return null
    }
    else{
      var closestdist =   this.all[0].distance(point);
      var closest = this.all[0];
      //console.log("0 : " + closestdist);
      for (var i=1;i<this.all.length;i++){
        var obs = this.all[i].distance(point);
        //console.log(i + " : "+ obs);
        if(obs < closestdist){
          closestdist = obs;
          closest = this.all[i];
        }
      }
      //console.log(closestdist);
      if(closestdist > seuil){
        return null
      }
      else{
        return closest;
      }
    }
  }

  update(){
    for(var i=0; i< this.all.length;++i){
      var obstacle = this.all[i];
      obstacle.update();
    }
  }
}
