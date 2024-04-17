class Plinko {
    constructor(p, x, y, r) {
      this.p = p;
      this.r = r;
      this.color = p.color(p.random(80, 175));
      const options = {
        isStatic: true,
        density: 1,
        restitution: 1,
        friction: 0
      };
      this.body = Matter.Bodies.circle(x, y, r, options);
      Matter.World.add(world, this.body);
    }
  
    show() {
      this.p.fill(this.color);
      this.p.noStroke();
      const { x, y } = this.body.position;
      this.p.push();
      this.p.translate(x, y);
      this.p.ellipse(0, 0, this.r * 2);
      this.p.pop();
    }
  }
  