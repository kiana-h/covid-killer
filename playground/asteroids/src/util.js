const Util = {
  inherits(ChildClass, ParentClass) {
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.constructor = ChildClass;
  },

  randomVec(length) {
    //angle between 0 & 180
    const deg = 2 * Math.PI * Math.random();
    //get x & y value of degree
    const x = Math.cos(deg);
    const y = Math.sin(deg);
    //scale to speed/length
    return Util.scale([x,y], length);
  },

  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  wrap(cord , max){
    if (cord > max){
      return cord % max ;
    }
    else if (cord < 0){
      return max - (cord % max);
    }
    else{
      return cord;
    }
  },
  
  dist(pos1,pos2){
    const x = Math.abs(pos1[0] - pos2[0]);
    const y = Math.abs(pos1[1] - pos2[1]);
    return Math.sqrt(x*x + y*y);
  }

};

export default Util;