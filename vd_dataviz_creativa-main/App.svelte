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
			let engine, world;
			let particles = [], plinkos = [], bounds = [];
			let cols = 4, rows = 9, particleSize = 10, plinkoSize = 14;

			p.setup = function() {
				p.createCanvas(600, 700);
				engine = Engine.create();
				world = engine.world;
				world.gravity.y = 2;

				// Add plinkos
				const spacing = p.width / cols;
				for (let j = 0; j < rows; j++) {
					for (let i = 0; i <= cols; i++) {
						let x = i * spacing;
						if (j % 2 === 0) x += spacing / 2;
						let y = spacing + j * spacing;
						plinkos.push(new Plinko(p, x, y, plinkoSize));
					}
				}

				// Add boundaries
				bounds.push(new Boundary(p, p.width / 2, p.height + 50, p.width, 100));
				for (let i = 0; i <= cols; i++) {
					let x = i * spacing;
					let h = 100;
					let w = 10;
					let y = p.height - h / 2;
					bounds.push(new Boundary(p, x, y, w, h));
				}

				// Function to add a new particle
				function newParticle() {
					particles.push(new Particle(p, p.random(100, 500), 0, particleSize));
				}

				newParticle(); // Initial particle
			};

			p.draw = function() {
				p.background(51);
				Matter.Engine.update(engine);

				// Display and update particles
				for (let i = particles.length - 1; i >= 0; i--) {
					particles[i].show(p);
					if (particles[i].isOffScreen(p.width, p.height)) {
						World.remove(world, particles[i].body);
						particles.splice(i, 1);
					}
				}

				// Display plinkos
				plinkos.forEach(plinko => plinko.show(p));

				// Display boundaries
				bounds.forEach(boundary => boundary.show(p));
			};
		};

		myP5 = new p5(sketch);

		return () => {
			myP5.remove();
		};
	});
  </script>
  
  <div></div>
  