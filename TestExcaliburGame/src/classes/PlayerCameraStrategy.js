import * as ex from 'excalibur';
import { SCALE } from '../constants.js';

export class Player_CameraStrategy {
	constructor(target, map) {
		this.target = target;
		this.position = new ex.Vector(this.target.pos.x, this.target.pos.y);
		this.map = map;
	}

	action(target, camera, engine, delta) {
		const SPEED = 0.08;

		const distance = this.position.distance(this.target.pos);
		if (distance > 2) {
			this.position.x = lerp(this.position.x, this.target.pos.x, SPEED);
			this.position.y = lerp(this.position.y, this.target.pos.y, SPEED);
		}
		return this.position;
	}
}

function lerp(currentValue, destinationValue, time) {
	return currentValue * (1 - time) + destinationValue * time;
}
