// import { WALK, SIT, LAYDOWN } from "../../constants";

// export class PlayerAnimations {
//   constructor(actor) {
//     this.actor = actor;
//   }

//   // Pass game loop delta time into the actionAnimation. Consuming time progresses the frames
//   progressThroughActionAnimation(delta) {
//     const { actor } = this;
//     if (actor.actionAnimation) {
//       actor.vel.x = 0; // Freeze in place
//       actor.vel.y = 0;
//       actor.actionAnimation.work(delta);
//     }
//   }

//   // Logic for syncing Player state to the relevant Animation to show
//   showRelevantAnim() {
//     const { actor } = this;

//     // Always prioritize showing PAIN if we are in pain.
//     // if (actor.hasGhostPainState || actor.painState) {
//     //   actor.graphics.use(actor.skinAnims[actor.facing][PAIN]);
//     //   return;
//     // }

//     // If a dedicated action is happening, use that.

//     if (actor.skinAnims && actor.skinAnims[actor.facing]) {
//       actor.graphics.use(actor.skinAnims[actor.facing][WALK]);
//     } else {
//       console.error(`Invalid skinAnims or facing value for actor.`);
//     }

//     if (actor.sitting) {
//       // Play the "SIT" animation
//       actor.graphics.use(actor.skinAnims[actor.facing][SIT]);
//       return;
//     } else if (actor.layingDown) {
//       // Play the "LAYDOWN" animation
//       actor.graphics.use(actor.skinAnims[actor.facing][LAYDOWN]);
//       return;
//     }
//     // if (actor.actionAnimation) {
//     //   actor.graphics.use(actor.actionAnimation.frame);
//     //   return;
//     // }

//     // // Use correct directional frame
//     // actor.graphics.use(actor.skinAnims[actor.facing][WALK]);

//     // Use animating version if we are moving
//     const walkingMsLeft = actor.walkingMsLeft ?? 0;
//     if (actor.vel.x !== 0 || actor.vel.y !== 0 || walkingMsLeft > 0) {
//       actor.graphics.current[0].graphic.play();
//       return;
//     }

//     // Otherwise, park at frame 0 for standing still
//     actor.graphics.current[0].graphic.pause();
//     actor.graphics.current[0].graphic.goToFrame(0);
//   }
// }

import { WALK, SIT, LAY } from "../../constants";

export class PlayerAnimations {
  constructor(actor) {
    this.actor = actor;
  }

  // Pass game loop delta time into the actionAnimation. Consuming time progresses the frames
  progressThroughActionAnimation(delta) {
    const { actor } = this;
    if (actor.actionAnimation) {
      actor.vel.x = 0; // Freeze in place
      actor.vel.y = 0;
      actor.actionAnimation.work(delta);
    }
  }

  // Logic for syncing Player state to the relevant Animation to show
  showRelevantAnim() {
    const { actor } = this;

    // Always prioritize showing PAIN if we are in pain.
    // if (actor.hasGhostPainState || actor.painState) {
    //   actor.graphics.use(actor.skinAnims[actor.facing][PAIN]);
    //   return;
    // }

    if (
      actor.skinAnims &&
      actor.skinAnims[actor.facing] &&
      actor.skinAnims[actor.facing][WALK]
    ) {
      actor.graphics.use(actor.skinAnims[actor.facing][WALK]);
    } else {
      console.error(`Invalid skinAnims or facing value for actor.`);
    }

    if (actor.sitting) {
      if (
        actor.skinAnims &&
        actor.skinAnims[actor.facing] &&
        actor.skinAnims[actor.facing][SIT]
      ) {
        // Play the "SIT" animation
        actor.graphics.use(actor.skinAnims[actor.facing][SIT]);
      } else {
        console.error(`Invalid sit or facing value for actor.`);
      }
      return;
    } else if (actor.layingDown) {
      if (
        actor.skinAnims &&
        actor.skinAnims[actor.facing] &&
        actor.skinAnims[actor.facing][LAY]
      ) {
        // Play the "LAYDOWN" animation
        actor.graphics.use(actor.skinAnims[actor.facing][LAY]);
      } else {
        console.error(`Invalid lay or facing value for actor.`);
      }
      return;
    }

    // Use animating version if we are moving
    const walkingMsLeft = actor.walkingMsLeft ?? 0;
    if (actor.vel.x !== 0 || actor.vel.y !== 0 || walkingMsLeft > 0) {
      actor.graphics.current[0].graphic.play();
      return;
    }

    // Otherwise, park at frame 0 for standing still
    actor.graphics.current[0].graphic.pause();
    actor.graphics.current[0].graphic.goToFrame(0);
  }
}
