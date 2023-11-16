import * as ex from "excalibur";
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
} from "../../constants.js";
import { DirectionQueue } from "../../classes/DirectionQueue.js";
import { generateCharacterAnimations } from "../CharacterAnimations.js";
//import { PlayerAnimations } from "./PlayerAnimations.js";

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
    //this.playerAnimations = new PlayerAnimations(this);
    // this.networkUpdater = new NetworkUpdater(
    // 	engine,
    // 	EVENT_SEND_PLAYER_UPDATE,
    // );

    // When a new player joins, I will send them my current state string
    engine.on(EVENT_INITIAL_DATA_REQUESTED, () => {
      engine.emit(EVENT_SEND_PLAYER_UPDATE, this.createNetworkUpdateString());
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
    const actionType = this.actionAnimation?.type ?? "NULL";
    const isInPain = Boolean(this.painState);
    const x = Math.round(this.pos.x);
    const y = Math.round(this.pos.y);
    return `${actionType}|${x}|${y}|${this.vel.x}|${this.vel.y}|${this.skinId}|${this.facing}|${isInPain}|${this.isPainFlashing}`;
  }

  onPreUpdate(engine, delta) {
    // Update direction controls with any input happening
    this.directionQueue.update(engine);

    // Work on dedicated animation if we are doing one
    // this.playerAnimations.progressThroughActionAnimation(delta);

    // Do actions and movement
    if (!this.actionAnimation) {
      this.onPreUpdateMovement(engine, delta);
      //this.onPreUpdateActionKeys(engine);
    }

    // Update current animation according to state
    //this.playerAnimations.showRelevantAnim();

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
    if (keyboard.isHeld(ex.Input.Keys.Z)) {
      this.vel.y = 0;
      this.vel.x = 0;
    }
    if (keyboard.isHeld(ex.Input.Keys.X)) {
      this.vel.y = 0;
      this.vel.x = 0;
    }

    // Normalize walking speed
    if (this.vel.x !== 0 || this.vel.y !== 0) {
      this.vel = this.vel.normalize();
      this.vel.x = this.vel.x * WALKING_SPEED;
      this.vel.y = this.vel.y * WALKING_SPEED;
    }

    this.facing = this.directionQueue.direction ?? this.facing;
  }

  // onPreUpdateActionKeys(engine) {
  //     // Don't allow actions while in pain.
  //     if (this.painState) {
  //         return;
  //     }

  //     // Register action keys
  //     if (engine.input.keyboard.wasPressed(ACTION_1_KEY)) {
  //         this.playerActions.actionSwingSword();
  //         return;
  //     }
  //     if (engine.input.keyboard.wasPressed(ACTION_2_KEY)) {
  //         this.playerActions.actionShootArrow();
  //         return;
  //     }
}
// // Listen for Number keys to change skin
// [
//   { key: ex.Input.Keys.X, skinId: "LAYDOWN" },
//   { key: ex.Input.Keys.Y, skinId: "SIT" },
// ].forEach(({ key, skinId }) => {
//   if (engine.input.keyboard.wasPressed(key)) {
//     this.skinId = skinId;
//     this.skinAnims = generateCharacterAnimations(skinId);
//   }
// });

// JUST FOR Testing, fake pain on SPACE key
// if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
//   this.takeDamage();
// }
