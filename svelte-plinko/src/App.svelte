<script>
	import { onMount } from 'svelte';
	import p5 from 'p5';
	import { Engine, World } from 'matter-js';
	import Particle from './lib/Particle';
	import Plinko from './lib/Plinko';
	import Boundary from './lib/Boundary';

	let myP5;

	onMount(() => {
		const sketch = (p) => {
			// Setup and draw functions using p
			// Initialize Particle, Plinko, and Boundary using 'new Particle(p, x, y, r)', etc.
		};

		myP5 = new p5(sketch);

		return () => {
		myP5.remove();
		};
	});
	
	import { onMount } from 'svelte';
	import p5 from 'p5';
	import Matter from 'matter-js';
  
	let myP5;
  
	onMount(() => {
	  const sketch = (p) => {
		let engine, world, particles = [], plinkos = [], bounds = [];
		let cols = 4, rows = 9, particleSize = 10, plinkoSize = 14;
  
		p.setup = function() {
		  p.createCanvas(600, 700);
		  engine = Matter.Engine.create();
		  world = engine.world;
		  world.gravity.y = 2;
  
		  // Add particles, plinkos, and boundaries here
		  // Use p.random instead of random, p.width instead of width
		  // Adapt the rest of your setup code here
  
		  newParticle();
		};
  
		function newParticle() {
		  const p = new Particle(p.random(100, 600), 0, particleSize);
		  particles.push(p);
		}
  
		p.draw = function() {
		  p.background(51);
		  Matter.Engine.update(engine);
		  // Draw particles, plinkos, and boundaries
		  // Adapt the show methods for p5.js
		};
  
		// Adapt Particle, Plinko, and Boundary classes to use p5 instance (p)
		// e.g., use p.fill(), p.ellipse() instead of global functions
	  };
  
	  myP5 = new p5(sketch);
  
	  return () => {
		myP5.remove();
	  };
	});
  </script>
  
  <div></div>
  