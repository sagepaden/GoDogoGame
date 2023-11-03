import { useEffect, useRef } from 'react';

const useCharacter = () => {
	useEffect(() => {
		const character = document.querySelector('.character');
		const map = document.querySelector('.map');
		let x = 90;
		let y = 34;
		let held_directions = [];
		const speed = 1;

		const placeCharacter = () => {
			var pixelSize = parseInt(
				getComputedStyle(document.documentElement).getPropertyValue(
					'--pixel-size',
				),
			);

			const held_direction = held_directions[0];
			if (held_direction) {
				if (held_direction === directions.right) {
					x += speed;
				}
				if (held_direction === directions.left) {
					x -= speed;
				}
				if (held_direction === directions.down) {
					y += speed;
				}
				if (held_direction === directions.up) {
					y -= speed;
				}
				character.setAttribute('facing', held_direction);
			}
			character.setAttribute(
				'walking',
				held_direction ? 'true' : 'false',
			);

			//Limits (gives the illusion of walls)
			var leftLimit = -8;
			var rightLimit = 16 * 11 + 8;
			var topLimit = -8 + 32;
			var bottomLimit = 16 * 7;
			if (x < leftLimit) {
				x = leftLimit;
			}
			if (x > rightLimit) {
				x = rightLimit;
			}
			if (y < topLimit) {
				y = topLimit;
			}
			if (y > bottomLimit) {
				y = bottomLimit;
			}

			var camera_left = pixelSize * 66;
			var camera_top = pixelSize * 42;

			map.style.transform = `translate3d( ${
				-x * pixelSize + camera_left
			}px, ${-y * pixelSize + camera_top}px, 0 )`;
			character.style.transform = `translate3d( ${x * pixelSize}px, ${
				y * pixelSize
			}px, 0 )`;
		};

		const step = () => {
			placeCharacter();
			window.requestAnimationFrame(() => {
				step();
			});
		};
		step();

		const directions = {
			up: 'up',
			down: 'down',
			left: 'left',
			right: 'right',
		};

		const keys = {
			38: directions.up,
			37: directions.left,
			39: directions.right,
			40: directions.down,
		};

		document.addEventListener('keydown', (e) => {
			const dir = keys[e.which];
			if (dir && held_directions.indexOf(dir) === -1) {
				held_directions.unshift(dir);
			}
		});

		document.addEventListener('keyup', (e) => {
			const dir = keys[e.which];
			const index = held_directions.indexOf(dir);
			if (index > -1) {
				held_directions.splice(index, 1);
			}
		});
	}, []);
};
export default useCharacter;
