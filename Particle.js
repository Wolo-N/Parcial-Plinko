import { random } from 'p5';
import { World, Bodies } from 'matter-js';

class Particle {
    constructor(p, x, y, r) {
      this.p = p;
      this.r = r;
      this.color = p.color(p.random(255), p.random(255), p.random(255));
      const options = {
        isStatic: false,
        mass: 0,
        density: 1,
        restitution: 0.5,
        friction: 1
      };
      x += p.random(-1, 1);
      this.body = Matter.Bodies.circle(x, y, r, options);
      Matter.World.add(world, this.body);
    }
  
    isOffScreen() {
      const { x, y } = this.body.position;
      return (x < -50 || x > this.p.width + 50 || y > this.p.height + 50);
    }
  
    show() {
      this.p.noStroke();
      this.p.fill(this.color);
      const pos = this.body.position;
      this.p.push();
      this.p.translate(pos.x, pos.y);
      this.p.ellipse(0, 0, this.r * 2);
      this.p.pop();
    }
  }
  