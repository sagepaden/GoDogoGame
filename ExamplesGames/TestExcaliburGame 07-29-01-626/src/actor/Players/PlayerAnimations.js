import { WALK, SIT, LAY } from '../../constants';

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

		// If a dedicated action is happening, use that.
		if (actor.actionAnimation) {
			if (actor.actionAnimation instanceof ex.Animation) {
				// If it's an animation, use it.
				actor.graphics.use(actor.actionAnimation);
			} else if (actor.actionAnimation instanceof ex.Sprite) {
				// If it's a single-frame sprite, use it as the current drawing.
				actor.setDrawing(actor.actionAnimation);
			}
			console.log('Current drawing:', actor.currentDrawing);
			return;
		}

		// Use correct directional frame
		if (actor.skinAnims && actor.skinAnims[actor.facing]) {
			actor.graphics.use(actor.skinAnims[actor.facing][WALK]);
		} else {
			console.error(`Invalid skinAnims or facing value for actor.`);
			return;
		}

		// Use animating version if we are moving
		const walkingMsLeft = actor.walkingMsLeft ?? 0;
		if (actor.vel.x !== 0 || actor.vel.y !== 0 || walkingMsLeft > 0) {
			actor.graphics.current[0].graphic.play();
		} else {
			// Otherwise, park at frame 0 for standing still
			actor.graphics.current[0].graphic.pause();
			actor.graphics.current[0].graphic.goToFrame(0);
		}
	}
}

// 	// Logic for syncing Player state to the relevant Animation to show
// 	showRelevantAnim() {
// 		const { actor } = this;

// 		// Always prioritize showing PAIN if we are in pain.
// 		// if (actor.hasGhostPainState || actor.painState) {
// 		//   actor.graphics.use(actor.skinAnims[actor.facing][PAIN]);
// 		//   return;
// 		// }

// 		// If a dedicated action is happening, use that.

// 		if (actor.skinAnims && actor.skinAnims[actor.facing]) {
// 			actor.graphics.use(actor.skinAnims[actor.facing][WALK]);
// 		} else {
// 			console.error(`Invalid skinAnims or facing value for actor.`);
// 		}

// 		// if (actor.actionAnimation) {
// 		//   actor.graphics.use(actor.actionAnimation.frame);
// 		//   return;
// 		// }

// 		// // Use correct directional frame
// 		// actor.graphics.use(actor.skinAnims[actor.facing][WALK]);

// 		// Use animating version if we are moving
// 		const walkingMsLeft = actor.walkingMsLeft ?? 0;
// 		if (actor.vel.x !== 0 || actor.vel.y !== 0 || walkingMsLeft > 0) {
// 			actor.graphics.current[0].graphic.play();
// 			return;
// 		}

// 		// Otherwise, park at frame 0 for standing still
// 		actor.graphics.current[0].graphic.pause();
// 		actor.graphics.current[0].graphic.goToFrame(0);
// 	}
// }
