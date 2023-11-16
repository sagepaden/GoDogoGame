import * as ex from "excalibur";
import { Images } from "../resources.js";
import { DOWN, LEFT, RIGHT, UP, WALK, SIT, LAY } from "../constants.js";

const WALK_ANIM_SPEED = 100;
const charSpritesheetGridConfig = {
  columns: 4,
  rows: 6,
  spriteWidth: 64,
  spriteHeight: 64,
};

const linkSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.linkSheetImage,
  grid: charSpritesheetGridConfig,
});

// const SIT_ANIM_SPEED = 50;
// const sitSheetImage = ex.SpriteSheet.fromImageSource({
//   image: Images.sitSheetImage,
//   grid: {
//     rows: 1,
//     columns: 4,
//     spriteWidth: 64,
//     spriteHeight: 64,
//   },
// });

// const laySheetImage = ex.SpriteSheet.fromImageSource({
//   image: Images.sitSheetImage,
//   grid: {
//     rows: 1,
//     columns: 4,
//     spriteWidth: 64,
//     spriteHeight: 64,
//   },
// });

const SPRITESHEET_MAP = {
  LINK: linkSpriteSheet,
};

const ANIMATION_CONFIGS = {
  [DOWN]: {
    WALK: [[12, 13, 14, 15], WALK_ANIM_SPEED],
    SIT: [[19], WALK_ANIM_SPEED],
    LAY: [[23], WALK_ANIM_SPEED],
  },
  [UP]: {
    WALK: [[0, 1, 2, 3], WALK_ANIM_SPEED],
    SIT: [[16], WALK_ANIM_SPEED],
    LAY: [[20], WALK_ANIM_SPEED],
  },
  [LEFT]: {
    WALK: [[4, 5, 6, 7], WALK_ANIM_SPEED],
    SIT: [[17], WALK_ANIM_SPEED],
    LAY: [[22], WALK_ANIM_SPEED],
  },
  [RIGHT]: {
    WALK: [[8, 9, 10, 11], WALK_ANIM_SPEED],
    SIT: [[18], WALK_ANIM_SPEED],
    LAY: [[21], WALK_ANIM_SPEED],
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
    [WALK, SIT, LAY].forEach((pose) => {
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