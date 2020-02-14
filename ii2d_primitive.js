/**
 *
 * Vector
 *
 *  */
class Vector {
  constructor(x,y) {
    this.x=x;
    this.y=y;
  }

  setRandInt(x,y){
    this.x = randInt(x.x,y.x);
    this.y = randInt(x.y,y.y);
  }

  setXY(x,y){
    this.x=x;
    this.y=y;
  }

  /*Addition avec un vecteur*/
  add(x){
    this.x += x.x;
    this.y += x.y;
  }

  /*Multiplication avec un nombre*/
  mult(x){
    this.x *= x;
    this.y *= x;
  }

  /*Division avec un nombre*/
  div(x){
    this.x /= x;
    this.y /= x;
  }

  soustra(x){
    this.x -= x.x;
    this.y -= x.y;
  }
  dot(x){
    return this.x*x.x+this.y*x.y;
  }
}
