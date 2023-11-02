import * as ex from 'excalibur';
import {
	ANCHOR_CENTER,
	DOWN,
	EVENT_INITIAL_DATA_REQUESTED,
	EVENT_SEND_PLAYER_UPDATE,
	LEFT,
	SCALE_2x,
	TAG_ANY_PLAYER,
	UP,
	WALK,
} from '../../constants.js';
import { DirectionQueue } from '../../classes/DirectionQueue.js';
import { generateCharacterAnimations } from '../characterAnimations.js';
import { PlayerAnimations } from './PlayerAnimations.js';

// These are action keys for the sword and arrows
// const ACTION_1_KEY = ex.Input.Keys.Z;
// const ACTION_2_KEY = ex.Input.Keys.X;

export class Player extends ex.Actor {
	constructor(x, y, skinId) {
		super({
			pos: new ex.Vector(x, y),
			width: 24,
			height: 24,
			scale: SCALE_2x,
			collider: ex.Shape.Box(11, 10, ANCHOR_CENTER, new ex.Vector(0, 4)),
			collisionType: ex.CollisionType.Active,
		});
		this.pos = new ex.Vector(100, 100);
		this.facing = DOWN;
		this.directionQueue = new DirectionQueue();
		this.skinId = skinId;
		this.painState = null;
		this.isPainFlashing = false;
		this.skinAnims = generateCharacterAnimations(skinId);
		this.actionAnimation = null;
	}

	onInitialize(engine) {
		// For debug only, show collisions
		// new DrawShapeHelper(this);

		// Be known as a Player (for enemies)
		this.addTag(TAG_ANY_PLAYER);

		this.playerAnimations = new PlayerAnimations(this);

		// When a new player joins, I will send them my current state string
		engine.on(EVENT_INITIAL_DATA_REQUESTED, () => {
			engine.emit(
				EVENT_SEND_PLAYER_UPDATE,
				this.createNetworkUpdateString(),
			);
		});
	}

	// Concats enough state to send to other players
	createNetworkUpdateString() {
		const actionType = this.actionAnimation?.type ?? 'NULL';
		const isInPain = Boolean(this.painState);
		const x = Math.round(this.pos.x);
		const y = Math.round(this.pos.y);
		return `${actionType}|${x}|${y}|${this.vel.x}|${this.vel.y}|${this.skinId}|${this.facing}|${isInPain}|${this.isPainFlashing}`;
	}

	onPreUpdate(engine, delta) {
		// Update direction controls with any input happening
		this.directionQueue.update(engine);

		// Work on dedicated animation if we are doing one
		this.playerAnimations.progressThroughActionAnimation(delta);

		// Do actions and movement
		if (!this.actionAnimation) {
			this.onPreUpdateMovement(engine, delta);
			// this.onPreUpdateActionKeys(engine);
		}

		// Update current animation according to state
		this.playerAnimations.showRelevantAnim();
	}

	onPreUpdateMovement(engine, delta) {

		const keyboard = engine.input.keyboard;
		const WALKING_SPEED = 90; // 160

		this.vel.x = 0;
		this.vel.y = 0;
		if (keyboard.isHeld(ex.Input.Keys.Left)) {
			this.vel.x = -1;
		}
		if (keyboard.isHeld(ex.Input.Keys.Right)) {
			this.vel.x = 1;
		}
		if (keyboard.isHeld(ex.Input.Keys.Up)) {
			this.vel.y = -1;
		}
		if (keyboard.isHeld(ex.Input.Keys.Down)) {
			this.vel.y = 1;
		}

		// Normalize walking speed
		if (this.vel.x !== 0 || this.vel.y !== 0) {
			this.vel = this.vel.normalize();
			this.vel.x = this.vel.x * WALKING_SPEED;
			this.vel.y = this.vel.y * WALKING_SPEED;
		}

		this.facing = this.directionQueue.direction ?? this.facing;
	}
}
