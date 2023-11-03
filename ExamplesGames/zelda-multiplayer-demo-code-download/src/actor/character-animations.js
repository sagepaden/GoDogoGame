import * as ex from "excalibur";
import { Images } from "../resources.js";
import {
  DOWN,
  LEFT,
  PAIN,
  RIGHT,
  SWORD1,
  SWORD2,
  UP,
  WALK,
} from "../constants.js";

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
const blueLinkSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.linkBlueSheetImage,
  grid: charSpritesheetGridConfig,
});
const redLinkSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.linkRedSheetImage,
  grid: charSpritesheetGridConfig,
});
const yellowLinkSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.linkYellowSheetImage,
  grid: charSpritesheetGridConfig,
});
const marinSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.marinSheetImage,
  grid: charSpritesheetGridConfig,
});
const tarinSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.tarinSheetImage,
  grid: charSpritesheetGridConfig,
});
const shopkeepSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.shopkeepSheetImage,
  grid: charSpritesheetGridConfig,
});

const SPRITESHEET_MAP = {
  LINK: linkSpriteSheet,
  BLUELINK: blueLinkSpriteSheet,
  REDLINK: redLinkSpriteSheet,
  YELLOWLINK: yellowLinkSpriteSheet,
  MARIN: marinSpriteSheet,
  TARIN: tarinSpriteSheet,
  SHOPKEEP: shopkeepSpriteSheet,
};

const ANIMATION_CONFIGS = {
  [DOWN]: {
    WALK: [[0, 1], WALK_ANIM_SPEED],
    SWORD1: [[2], WALK_ANIM_SPEED],
    SWORD2: [[3], WALK_ANIM_SPEED],
    PAIN: [[4], WALK_ANIM_SPEED],
  },
  [UP]: {
    WALK: [[10, 11], WALK_ANIM_SPEED],
    SWORD1: [[12], WALK_ANIM_SPEED],
    SWORD2: [[13], WALK_ANIM_SPEED],
    PAIN: [[14], WALK_ANIM_SPEED],
  },
  [LEFT]: {
    WALK: [[20, 21], WALK_ANIM_SPEED],
    SWORD1: [[22], WALK_ANIM_SPEED],
    SWORD2: [[23], WALK_ANIM_SPEED],
    PAIN: [[24], WALK_ANIM_SPEED],
  },
  [RIGHT]: {
    WALK: [[30, 31], WALK_ANIM_SPEED],
    SWORD1: [[32], WALK_ANIM_SPEED],
    SWORD2: [[33], WALK_ANIM_SPEED],
    PAIN: [[34], WALK_ANIM_SPEED],
  },
};

export const generateCharacterAnimations = (spriteSheetKey) => {
  const sheet = SPRITESHEET_MAP[spriteSheetKey];
  let payload = {};
  [UP, DOWN, LEFT, RIGHT].forEach((dir) => {
    payload[dir] = {};
    [WALK, SWORD1, SWORD2, PAIN].forEach((pose) => {
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

const moblinSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.moblinSheetImage,
  grid: {
    columns: 4,
    rows: 4,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});

const MOBLIN_ANIM_SPEED = 300;
export const generateMoblinAnimations = () => {
  return {
    [WALK]: {
      [DOWN]: ex.Animation.fromSpriteSheet(
        moblinSpriteSheet,
        [0, 1],
        MOBLIN_ANIM_SPEED
      ),
      [UP]: ex.Animation.fromSpriteSheet(
        moblinSpriteSheet,
        [4, 5],
        MOBLIN_ANIM_SPEED
      ),
      [LEFT]: ex.Animation.fromSpriteSheet(
        moblinSpriteSheet,
        [8, 9],
        MOBLIN_ANIM_SPEED
      ),
      [RIGHT]: ex.Animation.fromSpriteSheet(
        moblinSpriteSheet,
        [12, 13],
        MOBLIN_ANIM_SPEED
      ),
    },
    [PAIN]: {
      [DOWN]: ex.Animation.fromSpriteSheet(
        moblinSpriteSheet,
        [2, 3],
        MOBLIN_ANIM_SPEED
      ),
      [UP]: ex.Animation.fromSpriteSheet(
        moblinSpriteSheet,
        [6, 7],
        MOBLIN_ANIM_SPEED
      ),
      [LEFT]: ex.Animation.fromSpriteSheet(
        moblinSpriteSheet,
        [10, 11],
        MOBLIN_ANIM_SPEED
      ),
      [RIGHT]: ex.Animation.fromSpriteSheet(
        moblinSpriteSheet,
        [14, 15],
        MOBLIN_ANIM_SPEED
      ),
    },
  };
};
