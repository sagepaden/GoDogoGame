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
	SIT,
	LAY,
} from '../../constants.js';
import { DirectionQueue } from '../../classes/DirectionQueue.js';
import { generateCharacterAnimations } from '../CharacterAnimations.js';
import { PlayerAnimations } from './PlayerAnimations.js';

// These are action keys for the sword and arrows
// const ACTION_1_KEY = ex.Input.Keys.Z;
// const ACTION_2_KEY = ex.Input.Keys.X;

export class Player extends ex.Actor {
	constructor(x, y, skinId) {
		super({
			pos: new ex.Vector(x, y),
			width: 32,
			height: 32,
			scale: SCALE_2x,
			collider: ex.Shape.Box(11, 10, ANCHOR_CENTER, new ex.Vector(0, 4)),
			collisionType: ex.CollisionType.Active,
		});

		this.facing = DOWN;
		this.directionQueue = new DirectionQueue();
		this.skinId = skinId;
		this.painState = null;
		this.isPainFlashing = false;
		this.skinAnims = generateCharacterAnimations(skinId);
		this.actionAnimation = null;

		// this.on('collisionstart', (evt) => this.onCollisionStart(evt));
	}

	onInitialize(engine) {
		// For debug only, show collisions
		// new DrawShapeHelper(this);

		// Be known as a Player (for enemies)
		this.addTag(TAG_ANY_PLAYER);

		// Register Sword, Arrow actions

		// this.playerActions = new PlayerActions(this);
		this.playerAnimations = new PlayerAnimations(this);
		// this.networkUpdater = new NetworkUpdater(
		// 	engine,
		// 	EVENT_SEND_PLAYER_UPDATE,
		// );

		// When a new player joins, I will send them my current state string
		engine.on(EVENT_INITIAL_DATA_REQUESTED, () => {
			engine.emit(
				EVENT_SEND_PLAYER_UPDATE,
				this.createNetworkUpdateString(),
			);
		});
	}

	//   Damage stuff

	//   onCollisionStart(evt) {
	//     // Take damage from other Player's weapons
	//     if (evt.other.hasTag(TAG_PLAYER_WEAPON) && evt.other.owner !== this) {
	//       this.takeDamage();
	//       evt.other.onDamagedSomething();
	//     }

	//     // Take damage from external things (Enemies, etc)
	//     if (evt.other.hasTag(TAG_DAMAGES_PLAYER)) {
	//       this.takeDamage();
	//     }
	//   }

	//   takeDamage() {
	//     // No pain if already in pain
	//     if (this.isPainFlashing) {
	//       return;
	//     }

	//     // Start a new pain moment
	//     const PAIN_VELOCITY = 150;
	//     this.painState = {
	//       msLeft: 220,
	//       painVelX: this.facing === LEFT ? PAIN_VELOCITY : -PAIN_VELOCITY,
	//       painVelY: this.facing === UP ? PAIN_VELOCITY : -PAIN_VELOCITY,
	//     };

	//     // Flash for a little bit
	//     this.playerActions?.flashSeries();
	//   }

	// Concats enough state to send to other players
	createNetworkUpdateString() {
		const actionType = this.actionAnimation?.type ?? 'NULL';
		const isInPain = Boolean(this.painState);
		const x = Math.round(this.pos.x);
		const y = Math.round(this.pos.y);
		return `${actionType}|${x}|${y}|${this.vel.x}|${this.vel.y}|${this.skinId}|${this.facing}|${isInPain}|${this.isPainFlashing}`;
	}

	onPreUpdate(engine, delta) {
		if (this.action === 'SIT' || this.action === 'LIE') {
			this.vel.setTo(0, 0);
			return;
		}
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

		// Update everybody else
		//     const networkUpdateStr = this.createNetworkUpdateString();
		//     this.networkUpdater.sendStateUpdate(networkUpdateStr);
	}

	onPreUpdateMovement(engine, delta) {
		// Work down pain state
		// if (this.painState) {
		//   this.vel.x = this.painState.painVelX;
		//   this.vel.y = this.painState.painVelY;

		//   // Work on getting rid of pain
		//   this.painState.msLeft -= delta;
		//   if (this.painState.msLeft <= 0) {
		//     this.painState = null;
		//   }
		//   return;
		// }

		const keyboard = engine.input.keyboard;
		const WALKING_SPEED = 160; // 160

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

	onPreUpdateActionKeys(engine) {
		// Example key press handling to change state
		if (engine.input.keyboard.wasPressed(ex.Input.Keys.S)) {
			this.changeState('SIT');
		} else if (engine.input.keyboard.wasPressed(ex.Input.Keys.L)) {
			this.changeState('LAY');
		} else if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
			// Assuming 'IDLE' is the state for standing/walking
			this.changeState('IDLE');
		}

		// Listen for Number keys to change skin
		[
			{ key: ex.Input.Keys.C, skinId: 'LINK' },
			{ key: ex.Input.Keys.Digit2, skinId: 'BLUELINK' },
			{ key: ex.Input.Keys.Digit3, skinId: 'YELLOWLINK' },
			{ key: ex.Input.Keys.Digit4, skinId: 'REDLINK' },
			{ key: ex.Input.Keys.Digit5, skinId: 'MARIN' },
			{ key: ex.Input.Keys.Digit6, skinId: 'TARIN' },
		].forEach(({ key, skinId }) => {
			if (engine.input.keyboard.wasPressed(key)) {
				this.skinId = skinId;
				this.skinAnims = generateCharacterAnimations(skinId);
			}
		});
	}
}

// JUST FOR Testing, fake pain on SPACE key
// if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
//   this.takeDamage();
// }

// import * as ex from 'excalibur';
// import {
// 	generateCharacterAnimations,
// 	ANIMATION_CONFIGS,
// } from '../CharacterAnimations.js';
// import { DirectionQueue } from '../../classes/DirectionQueue.js';
// import { PlayerAnimations } from './PlayerAnimations.js';
// import {
// 	DOWN,
// 	SIT,
// 	SCALE_2x,
// 	WALK,
// 	ANCHOR_CENTER,
// 	TAG_ANY_PLAYER,
// 	EVENT_INITIAL_DATA_REQUESTED,
// } from '../../constants.js';

// export class Player extends ex.Actor {
// 	constructor(x, y, skinId = 'LINK') {
// 		super({
// 			pos: new ex.Vector(x, y),
// 			width: 32,
// 			height: 32,
// 			scale: SCALE_2x,
// 			collider: ex.Shape.Box(11, 10, ANCHOR_CENTER, new ex.Vector(0, 4)),
// 			collisionType: ex.CollisionType.Active,
// 		});

// 		this.facing = DOWN;
// 		this.skinId = skinId;
// 		this.skinAnims = generateCharacterAnimations(skinId);
// 		this.playerAnimations = new PlayerAnimations(this);
// 		this.currentPosture = WALK;

// 		// Initialize animations
// 		this.graphics.onPreDraw = (ctx, delta) => {
// 			this.playerAnimations.showRelevantAnim(delta);
// 		};
// 	}

// 	changePosture(posture) {
// 		const directionAnims = this.skinAnims[this.facing];
// 		if (!directionAnims) {
// 			console.error(
// 				`Animations for facing direction "${this.facing}" not found.`,
// 			);
// 			return;
// 		}

// 		const sprite = directionAnims[posture];
// 		if (!sprite) {
// 			console.error(
// 				`Sprite for posture "${posture}" in direction "${this.facing}" not found.`,
// 			);
// 			return;
// 		}

// 		this.graphics.use(sprite);
// 		this.currentPosture = posture;

// 		// Define getIndex inside the constructor or as a method of Player
// 		const getIndex = (index) => {
// 			const columns = 4; // Assuming 4 columns as per your spritesheet
// 			return {
// 				column: index % columns,
// 				row: Math.floor(index / columns),
// 			};
// 		};
// 		this.facing = DOWN;
// 		this.directionQueue = new DirectionQueue();
// 		this.skinId = skinId;
// 		this.painState = null;
// 		this.isPainFlashing = false;
// 		this.skinAnims = generateCharacterAnimations(skinId);
// 		this.actionAnimation = null;
// 		this.currentPosture = WALK;
// 		// this.on('collisionstart', (evt) => this.onCollisionStart(evt));
// 	}

// 	changePosture(posture) {
// 		console.log('Changing posture to:', posture);
// 		this.actionAnimation = this.skinAnims[this.facing][posture];
// 		console.log('New action animation:', this.actionAnimation);
// 		if (this.actionAnimation instanceof ex.Sprite) {
// 			this.setDrawing('action', this.actionAnimation);
// 		}
// 	}

// 	onInitialize(engine) {
// 		this.skinAnims = generateCharacterAnimations(engine, this.skinId);

// 		// For debug only, show collisions
// 		// new DrawShapeHelper(this);

// 		// Be known as a Player (for enemies)
// 		this.addTag(TAG_ANY_PLAYER);

// 		// Register Sword, Arrow actions

// 		// this.playerActions = new PlayerActions(this);
// 		this.playerAnimations = new PlayerAnimations(this);
// 		// this.networkUpdater = new NetworkUpdater(
// 		// 	engine,
// 		// 	EVENT_SEND_PLAYER_UPDATE,
// 		// );

// 		// When a new player joins, I will send them my current state string
// 		engine.on(EVENT_INITIAL_DATA_REQUESTED, () => {
// 			engine.emit(
// 				EVENT_SEND_PLAYER_UPDATE,
// 				this.createNetworkUpdateString(),
// 			);
// 		});
// 	}

// 	//   Damage stuff

// 	//   onCollisionStart(evt) {
// 	//     // Take damage from other Player's weapons
// 	//     if (evt.other.hasTag(TAG_PLAYER_WEAPON) && evt.other.owner !== this) {
// 	//       this.takeDamage();
// 	//       evt.other.onDamagedSomething();
// 	//     }

// 	//     // Take damage from external things (Enemies, etc)
// 	//     if (evt.other.hasTag(TAG_DAMAGES_PLAYER)) {
// 	//       this.takeDamage();
// 	//     }
// 	//   }

// 	//   takeDamage() {
// 	//     // No pain if already in pain
// 	//     if (this.isPainFlashing) {
// 	//       return;
// 	//     }

// 	//     // Start a new pain moment
// 	//     const PAIN_VELOCITY = 150;
// 	//     this.painState = {
// 	//       msLeft: 220,
// 	//       painVelX: this.facing === LEFT ? PAIN_VELOCITY : -PAIN_VELOCITY,
// 	//       painVelY: this.facing === UP ? PAIN_VELOCITY : -PAIN_VELOCITY,
// 	//     };

// 	//     // Flash for a little bit
// 	//     this.playerActions?.flashSeries();
// 	//   }

// 	// Concats enough state to send to other players
// 	createNetworkUpdateString() {
// 		const actionType = this.actionAnimation?.type ?? 'NULL';
// 		const isInPain = Boolean(this.painState);
// 		const x = Math.round(this.pos.x);
// 		const y = Math.round(this.pos.y);
// 		return `${actionType}|${x}|${y}|${this.vel.x}|${this.vel.y}|${this.skinId}|${this.facing}|${isInPain}|${this.isPainFlashing}`;
// 	}

// 	onPreUpdate(engine, delta) {
// 		// When Z is pressed, change posture to SIT and stop any movement
// 		if (engine.input.keyboard.wasPressed(ex.Input.Keys.Z)) {
// 			// Directly set the current drawing to the sit sprite
// 			this.graphics.visible = false; // Assuming this makes the current sprite invisible
// 			this.add(this.sitSprite); // Add the sit sprite as a child actor
// 			this.vel.setTo(0, 0); // Stop the player's movement
// 		}

// 		// Update direction controls with any input happening
// 		this.directionQueue.update(engine);

// 		// Work on dedicated animation if we are doing one
// 		this.playerAnimations.progressThroughActionAnimation(delta);

// 		// Do actions and movement
// 		if (!this.actionAnimation) {
// 			this.onPreUpdateMovement(engine, delta);
// 			this.onPreUpdateActionKeys(engine);
// 		}

// 		// Update current animation according to state
// 		this.playerAnimations.showRelevantAnim();

// 		// Update everybody else
// 		//     const networkUpdateStr = this.createNetworkUpdateString();
// 		//     this.networkUpdater.sendStateUpdate(networkUpdateStr);
// 	}

// 	onPreUpdateMovement(engine, delta) {
// 		// Work down pain state
// 		// if (this.painState) {
// 		//   this.vel.x = this.painState.painVelX;
// 		//   this.vel.y = this.painState.painVelY;

// 		//   // Work on getting rid of pain
// 		//   this.painState.msLeft -= delta;
// 		//   if (this.painState.msLeft <= 0) {
// 		//     this.painState = null;
// 		//   }
// 		//   return;
// 		// }

// 		const keyboard = engine.input.keyboard;
// 		const WALKING_SPEED = 160; // 160

// 		this.vel.x = 0;
// 		this.vel.y = 0;
// 		if (keyboard.isHeld(ex.Input.Keys.Left)) {
// 			this.vel.x = -1;
// 		}
// 		if (keyboard.isHeld(ex.Input.Keys.Right)) {
// 			this.vel.x = 1;
// 		}
// 		if (keyboard.isHeld(ex.Input.Keys.Up)) {
// 			this.vel.y = -1;
// 		}
// 		if (keyboard.isHeld(ex.Input.Keys.Down)) {
// 			this.vel.y = 1;
// 		}
// 		// if (keyboard.isHeld(ex.Input.Keys.Z)) {
// 		// 	this.vel.y = 0;
// 		// 	this.vel.x = 0;
// 		// }
// 		if (keyboard.wasPressed(ex.Input.Keys.Z)) {
// 			// Turn off the current frame and replace it with the 'sit' sprite
// 			this.graphics.show(this.sitSprite);
// 			this.vel.setTo(0, 0); // Stop the player's movement
// 		}

// 		// Normalize walking speed
// 		if (this.vel.x !== 0 || this.vel.y !== 0) {
// 			this.vel = this.vel.normalize();
// 			this.vel.x = this.vel.x * WALKING_SPEED;
// 			this.vel.y = this.vel.y * WALKING_SPEED;
// 		}

// 		this.facing = this.directionQueue.direction ?? this.facing;
// 	}

// 	onPreUpdateActionKeys(engine) {
// 		// Don't allow actions while in pain.
// 		if (this.painState) {
// 			return;
// 		}

// 		//     // Register action keys
// 		// if (engine.input.keyboard.wasPressed(ACTION_1_KEY)) {
// 		// 	this.playerActions.actionSit();
// 		// 	return;
// 		// }
// 		// if (engine.input.keyboard.wasPressed(ACTION_2_KEY)) {
// 		// 	this.playerActions.actionShootArrow();
// 		// 	return;
// 		// }

// 		// Listen for Number keys to change skin
// 		// [
// 		// 	{ key: ex.Input.Keys.Digit1, skinId: 'LINK' },
// 		// 	{ key: ex.Input.Keys.Digit2, skinId: 'BLUELINK' },
// 		// 	{ key: ex.Input.Keys.Digit3, skinId: 'YELLOWLINK' },
// 		// 	{ key: ex.Input.Keys.Digit4, skinId: 'REDLINK' },
// 		// 	{ key: ex.Input.Keys.Digit5, skinId: 'MARIN' },
// 		// 	{ key: ex.Input.Keys.Digit6, skinId: 'TARIN' },
// 		// ].forEach(({ key, skinId }) => {
// 		// 	if (engine.input.keyboard.wasPressed(key)) {
// 		// 		this.skinId = skinId;
// 		// 		this.skinAnims = generateCharacterAnimations(skinId);
// 		// 	}
// 	}
// }

// // JUST FOR Testing, fake pain on SPACE key
// // if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
// //   this.takeDamage();
// // }