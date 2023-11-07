import * as ex from "excalibur";
import { Images } from "../resources.js";
import { DOWN, LEFT, RIGHT, UP, WALK, SIT, LAYDOWN, C } from "../constants.js";

const WALK_ANIM_SPEED = 100;
const charSpritesheetGridConfig = {
  columns: 4,
  rows: 4,
  spriteWidth: 64,
  spriteHeight: 64,
};

const linkSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.linkSheetImage,
  grid: charSpritesheetGridConfig,
});

const SIT_ANIM_SPEED = 50;
const sitSheetImage = ex.SpriteSheet.fromImageSource({
  image: Images.sitSheetImage,
  grid: {
    rows: 1,
    columns: 4,
    spriteWidth: 64,
    spriteHeight: 64,
  },
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
  SIT: sitSheetImage,
};

const ANIMATION_CONFIGS = {
  [DOWN]: {
    WALK: [[12, 13, 14, 15], WALK_ANIM_SPEED],
    SIT: [[]]
  },
  [UP]: {
    WALK: [[0, 1, 2, 3], WALK_ANIM_SPEED],
  },
  [LEFT]: {
    WALK: [[4, 5, 6, 7], WALK_ANIM_SPEED],
  },
  [RIGHT]: {
    WALK: [[8, 9, 10, 11], WALK_ANIM_SPEED],
  },
  [C]: {
    SIT: [[0, 1, 2, 3], SIT_ANIM_SPEED],
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
        speed
      );
    });
  });
  return payload;
};
