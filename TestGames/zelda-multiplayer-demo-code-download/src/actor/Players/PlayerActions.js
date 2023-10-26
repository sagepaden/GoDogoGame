import { SpriteSequence } from "../../classes/SpriteSequence.js";
import { ARROWACTION, SWORD1, SWORD2, SWORDACTION } from "../../constants.js";
import {
  Sword,
  SWORD_SWING_1,
  SWORD_SWING_2,
  SWORD_SWING_3,
} from "../Sword.js";
import { Arrow } from "../Arrow.js";

export class PlayerActions {
  constructor(actor) {
    this.actor = actor;
    this.engine = actor.scene.engine;
  }

  actionSwingSword() {
    const SWORD_SWING_SPEED = 50; //50;
    const { actor, engine } = this;

    // Create a new sequence with dedicated callback per frame
    actor.actionAnimation = new SpriteSequence(
      SWORDACTION,
      [
        {
          frame: actor.skinAnims[actor.facing][SWORD1],
          duration: SWORD_SWING_SPEED,
          actorObjCallback: (swordInstance) => {
            // Change sword's frame to match character on frame 1
            swordInstance.useFrame(SWORD_SWING_1, actor.facing);
          },
        },
        {
          frame: actor.skinAnims[actor.facing][SWORD2],
          duration: SWORD_SWING_SPEED,
          actorObjCallback: (swordInstance) => {
            // Change sword's frame to match character on frame 2
            swordInstance.useFrame(SWORD_SWING_2, actor.facing);
          },
        },
        {
          frame: actor.skinAnims[actor.facing][SWORD2],
          duration: SWORD_SWING_SPEED * 2, // Hold this one out for a bit longer
          actorObjCallback: (swordInstance) => {
            // Change sword's frame to match character on frame 3
            swordInstance.useFrame(SWORD_SWING_3, actor.facing);
          },
        },
      ],
      (swordInstance) => {
        // When series is over, clear out the dedicated animation and remove the Sword instance
        actor.actionAnimation = null;
        swordInstance.kill();
      }
    );

    // Create the Sword instance, assign my actor as owner, and add to scene
    const sword = new Sword(actor.pos.x, actor.pos.y, actor.facing);
    engine.add(sword);
    sword.owner = actor;

    // Assign this sword instance to be controllable by each frame above
    actor.actionAnimation.actorObject = sword;
  }

  actionShootArrow() {
    const SHOOT_ARROW_SPEED = 155;
    const { actor, engine } = this;

    // Create a new sequence,
    actor.actionAnimation = new SpriteSequence(
      ARROWACTION,
      [
        {
          frame: actor.skinAnims[actor.facing][SWORD1],
          duration: SHOOT_ARROW_SPEED,
          actorObjCallback: () => {},
        },
        {
          // On this frame, create an Arrow in the same facing direction as my actor
          frame: actor.skinAnims[actor.facing][SWORD2],
          duration: SHOOT_ARROW_SPEED,
          actorObjCallback: () => {
            const arrow = new Arrow(actor.pos.x, actor.pos.y, actor.facing);
            arrow.owner = actor;
            engine.add(arrow);
          },
        },
      ],
      () => {
        // Clear out dedicated animation when this series is complete
        actor.actionAnimation = null;
      }
    );
  }

  // Toggle Opacity on and off a few times, setting flag `isPainFlashing` to true while it's happening
  // We'll use `isPainFlashing` to make sure no other damage is accepted during this grace period
  async flashSeries() {
    const { actor } = this;
    actor.isPainFlashing = true;
    const PAIN_FLASH_SPEED = 100;
    for (let i = 0; i <= 4; i++) {
      actor.graphics.opacity = 0;
      await actor.actions.delay(PAIN_FLASH_SPEED).toPromise();
      actor.graphics.opacity = 1;
      await actor.actions.delay(PAIN_FLASH_SPEED).toPromise();
    }
    actor.isPainFlashing = false;
  }
}
