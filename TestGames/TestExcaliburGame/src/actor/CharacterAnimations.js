import * as ex from 'excalibur';
import { Images } from '../resources.js';
import { DOWN, LEFT, RIGHT, UP, WALK } from '../constants.js';

const WALK_ANIM_SPEED = 150;
const charSpritesheetGridConfig = {
	columns: 10,
	rows: 10,
	spriteWidth: 32,
	spriteHeight: 32,
};

const linkSpriteSheet = ex.SpriteSheet.fromImageSource({
	image: Images.linkSheetImage,
	grid: charSpritesheetGridConfig,
});

const SPRITESHEET_MAP = {
	LINK: linkSpriteSheet,
};

const ANIMATION_CONFIGS = {
	[DOWN]: {
		WALK: [[0, 1], WALK_ANIM_SPEED],
	},
	[UP]: {
		WALK: [[10, 11], WALK_ANIM_SPEED],
	},
	[LEFT]: {
		WALK: [[20, 21], WALK_ANIM_SPEED],
	},
	[RIGHT]: {
		WALK: [[30, 31], WALK_ANIM_SPEED],
	},
};

// export const generateCharacterAnimations = (spriteSheetKey) => {
//   const sheet = SPRITESHEET_MAP[spriteSheetKey];
//   let payload = {};
//   [UP, DOWN, LEFT, RIGHT].forEach((dir) => {
//     payload[dir] = {};
//     [WALK].forEach((pose) => {
//       const [frames, speed] = ANIMATION_CONFIGS[dir][pose];
//       payload[dir][pose] = ex.Animation.fromSpriteSheet(
//         sheet,
//         [...frames],
//         speed
//       );
//     });
//   });
//   return payload;
// };

export const generateCharacterAnimations = (spriteSheetKey) => {
	spriteSheetKey = linkSpriteSheet;
	const sheet = spriteSheetKey;
	if (!sheet) {
		console.error(`SpriteSheet for key "${spriteSheetKey}" not found.`);
		return {};
	}
	let payload = {};
	[UP, DOWN, LEFT, RIGHT].forEach((dir) => {
		payload[dir] = {};
		[WALK].forEach((pose) => {
			const [frames, speed] = ANIMATION_CONFIGS[dir][pose];
			payload[dir][pose] = ex.Animation.fromSpriteSheet(
				sheet,
				[...frames],
				speed,
			);
		});
	});
	return payload;
};
