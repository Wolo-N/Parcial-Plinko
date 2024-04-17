class Boundary {
    constructor(p, x, y, w, h) {
      this.p = p;
      this.w = w;
      this.h = h;
      const options = {
        density: 1,
        friction: 1,
        isStatic: true
      };
      this.body = Matter.Bodies.rectangle(x, y, w, h, options);
      Matter.World.add(world, this.body);
    }
  
    show() {
      this.p.fill(128);
      this.p.noStroke();
      const { x, y } = this.body.position;
      this.p.push();
      this.p.translate(x, y);
      this.p.rectMode(this.p.CENTER);
      this.p.rect(0, 0, this.w, this.h);
      this.p.pop();
    }
  }
  