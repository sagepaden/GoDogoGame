import * as ex from "excalibur";
import {
  ARROWACTION,
  DOWN,
  SCALE_2x,
  SWORDACTION,
  TAG_ANY_PLAYER,
} from "../../constants.js";
import { generateCharacterAnimations } from "../character-animations.js";
import { PlayerActions } from "./PlayerActions.js";
import { PlayerAnimations } from "./PlayerAnimations.js";

// These are just "ghosts" of other Players. They don't collide, they only update based on network updates
export class NetworkPlayer extends ex.Actor {
  constructor(x, y) {
    super({
      pos: new ex.Vector(x, y),
      width: 32,
      height: 32,
      scale: SCALE_2x,
    });

    this.skinId = "LINK";
    this.skinAnims = generateCharacterAnimations(this.skinId);
    this.facing = DOWN;
    this.walkingMsLeft = 0;

    this.actionAnimation = null;
    this.hasGhostPainState = false;
    this.isPainFlashing = false;
  }

  onInitialize(_engine) {
    this.addTag(TAG_ANY_PLAYER);
    this.playerActions = new PlayerActions(this);
    this.playerAnimations = new PlayerAnimations(this);
  }

  // Redefine internal object of animations when the skinId changes
  regenAnims(newSkinId) {
    this.skinId = newSkinId;
    this.skinAnims = generateCharacterAnimations(this.skinId);
  }

  // Convert a network update to friendly values for this actor
  onStateUpdate(newUpdate) {
    if (newUpdate.actionType === SWORDACTION && !this.actionAnimation) {
      this.playerActions?.actionSwingSword();
    }
    if (newUpdate.actionType === ARROWACTION && !this.actionAnimation) {
      this.playerActions?.actionShootArrow();
    }

    // Reset timer to show Walking MS for a bit if we have moved since last update
    const wasX = this.pos.x;
    const wasY = this.pos.y;
    this.pos.x = newUpdate.x;
    this.pos.y = newUpdate.y;
    const hasPosDiff = wasX !== this.pos.x || wasY !== this.pos.y;
    if (hasPosDiff) {
      this.walkingMsLeft = 100; //Assume walking for this time if new pos came in
    }

    // Use the latest facing and pain values from the network
    this.facing = newUpdate.facing ?? this.facing;
    this.hasGhostPainState = newUpdate.isInPain;

    // If we are newly in pain flashing, kick off a flash series
    const wasPainFlashing = this.isPainFlashing;
    if (!wasPainFlashing && newUpdate.isPainFlashing) {
      this.playerActions?.flashSeries();
    }

    // Redefine internal animations to new skin if a new one has come in
    if (this.skinId !== newUpdate.skinId) {
      this.regenAnims(newUpdate.skinId);
    }
  }

  onPreUpdate(engine, delta) {
    // Work on dedicated animation if we are doing one
    this.playerAnimations.progressThroughActionAnimation(delta);

    // work down walking
    if (this.walkingMsLeft > 0) {
      this.walkingMsLeft -= delta;
    }

    // Update current animation according to state
    this.playerAnimations.showRelevantAnim();
  }
}
