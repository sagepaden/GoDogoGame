import * as ex from 'excalibur';
import { Images } from '../resources.js';
import { DOWN, LEFT, RIGHT, UP, WALK, SIT, LAY } from '../constants.js';

const WALK_ANIM_SPEED = 100;
const charSpritesheetGridConfig = {
	columns: 4,
	rows: 6,
	spriteWidth: 64,
	spriteHeight: 64,
};

export const linkSpriteSheet = ex.SpriteSheet.fromImageSource({
	image: Images.linkSheetImage,
	grid: charSpritesheetGridConfig,
});

// const furnitureSpriteSheetGridConfig = {
//   columns: 4,
//   rows: 4,
//   spriteWidth: 64,
//   spriteHeight: 64,
// };

// const furnitureSpriteSheet = ex.FurnitureSheet.fromImageSource({
//   image: Images.indoorImage,
//   grid: furnitureSpriteSheetGridConfig,
// });

const SPRITESHEET_MAP = {
	LINK: linkSpriteSheet,
};

export const ANIMATION_CONFIGS = {
	[DOWN]: {
		WALK: [[12, 13, 14, 15], WALK_ANIM_SPEED],
		SIT: [[19]],
		LAY: [[23]],
	},
	[UP]: {
		WALK: [[0, 1, 2, 3], WALK_ANIM_SPEED],
		SIT: [[16]],
		LAY: [[20]],
	},
	[LEFT]: {
		WALK: [[4, 5, 6, 7], WALK_ANIM_SPEED],
		SIT: [[17]],
		LAY: [[22]],
	},
	[RIGHT]: {
		WALK: [[8, 9, 10, 11], WALK_ANIM_SPEED],
		SIT: [[18]],
		LAY: [[21]],
	},
};

// const ANIMATION_CONFIGS = {
// 	[DOWN]: {
// 		WALK: [[12, 13, 14, 15], WALK_ANIM_SPEED],
// 		SIT: [[19], WALK_ANIM_SPEED],
// 		LAY: [[23], WALK_ANIM_SPEED],
// 	},
// 	[UP]: {
// 		WALK: [[0, 1, 2, 3], WALK_ANIM_SPEED],
// 		SIT: [[16], WALK_ANIM_SPEED],
// 		LAY: [[20], WALK_ANIM_SPEED],
// 	},
// 	[LEFT]: {
// 		WALK: [[4, 5, 6, 7], WALK_ANIM_SPEED],
// 		SIT: [[17], WALK_ANIM_SPEED],
// 		LAY: [[22], WALK_ANIM_SPEED],
// 	},
// 	[RIGHT]: {
// 		WALK: [[8, 9, 10, 11], WALK_ANIM_SPEED],
// 		SIT: [[18], WALK_ANIM_SPEED],
// 		LAY: [[21], WALK_ANIM_SPEED],
// 	},
// };

// export const generateCharacterAnimations = (engine, spriteSheetKey) => {
// 	const sheet = SPRITESHEET_MAP['LINK'];
// 	if (!sheet) {
// 		console.error(`SpriteSheet for key "${spriteSheetKey}" not found.`);
// 		return {};
// 	}

// 	let payload = {};
// 	[UP, DOWN, LEFT, RIGHT].forEach((dir) => {
// 		payload[dir] = {};
// 		Object.entries(ANIMATION_CONFIGS[dir]).forEach(([pose, config]) => {
// 			const indices = config[0];
// 			if (indices.length === 1) {
// 				// Single sprite
// 				const index = indices[0];
// 				const row = Math.floor(
// 					index / charSpritesheetGridConfig.columns,
// 				);
// 				const column = index % charSpritesheetGridConfig.columns;
// 				console.log(
// 					`Index for ${pose} in direction ${dir}:`,
// 					index,
// 					`Row:`,
// 					row,
// 					`Column:`,
// 					column,
// 				);
// 				payload[dir][pose] = sheet.getSprite(column, row);
// 			} else {
// 				// Animation
// 				const sprites = indices.map((index) => {
// 					const row = Math.floor(
// 						index / charSpritesheetGridConfig.columns,
// 					);
// 					const column = index % charSpritesheetGridConfig.columns;
// 					console.log(
// 						`Index for frame in ${pose} in direction ${dir}:`,
// 						index,
// 						`Row:`,
// 						row,
// 						`Column:`,
// 						column,
// 					);
// 					return sheet.getSprite(column, row);
// 				});
// 				payload[dir][pose] = new ex.Animation({
// 					engine: engine, // pass the engine instance here
// 					sprites: sprites,
// 					speed: config[1],
// 					loop: true,
// 				});
// 			}
// 		});
// 	});
// 	return payload;
// };
	export const generateCharacterAnimations = (spriteSheetKey, engine) => {
		const keyboard = ex.Input.keyboard;
		const dogState = WALK;
		const sheet = SPRITESHEET_MAP[spriteSheetKey];
		let payload = {};
		[UP, DOWN, LEFT, RIGHT].forEach((dir) => {
			payload[dir] = {};
			if (keyboard.isHeld(ex.Input.Keys.Z)) {
				dogState = SIT
			}
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