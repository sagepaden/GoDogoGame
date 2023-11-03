import * as ex from "excalibur";
import { Images } from "../resources.js";
import {
  DOWN,
  LEFT,
  RIGHT,
  SCALE,
  SCALE_2x,
  SWORD1,
  SWORD2,
  TAG_PLAYER_WEAPON,
  UP,
} from "../constants.js";
import { DrawShapeHelper } from "../classes/DrawShapeHelper.js";

const swordSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.swordSheetImage,
  grid: {
    columns: 3,
    rows: 4,
    spriteWidth: 32,
    spriteHeight: 32,
  },
});

export const SWORD_SWING_1 = "SWORD_SWING_1";
export const SWORD_SWING_2 = "SWORD_SWING_2";
export const SWORD_SWING_3 = "SWORD_SWING_3";

export class Sword extends ex.Actor {
  constructor(x, y, direction) {
    super({
      pos: new ex.Vector(x, y),
      width: 32,
      height: 32,
      scale: SCALE_2x,
      color: ex.Color.DarkGray,
      collider: ex.Shape.Box(16, 16, ex.Vector.Zero, new ex.Vector(-8, -8)),
      collisionType: ex.CollisionType.Passive,
    });
    this.direction = direction;
    this.isUsed = false;
    this.owner = null; // Assigned on creation
    this.addTag(TAG_PLAYER_WEAPON);

    this.frames = {
      [DOWN]: {
        [SWORD_SWING_1]: ex.Animation.fromSpriteSheet(
          swordSpriteSheet,
          [0],
          100
        ),
        [SWORD_SWING_2]: ex.Animation.fromSpriteSheet(
          swordSpriteSheet,
          [1],
          100
        ),
        [SWORD_SWING_3]: ex.Animation.fromSpriteSheet(
          swordSpriteSheet,
          [2],
          100
        ),
      },
      [UP]: {
        [SWORD_SWING_1]: ex.Animation.fromSpriteSheet(
          swordSpriteSheet,
          [3],
          100
        ),
        [SWORD_SWING_2]: ex.Animation.fromSpriteSheet(
          swordSpriteSheet,
          [4],
          100
        ),
        [SWORD_SWING_3]: ex.Animation.fromSpriteSheet(
          swordSpriteSheet,
          [5],
          100
        ),
      },
      [LEFT]: {
        [SWORD_SWING_1]: ex.Animation.fromSpriteSheet(
          swordSpriteSheet,
          [6],
          100
        ),
        [SWORD_SWING_2]: ex.Animation.fromSpriteSheet(
          swordSpriteSheet,
          [7],
          100
        ),
        [SWORD_SWING_3]: ex.Animation.fromSpriteSheet(
          swordSpriteSheet,
          [8],
          100
        ),
      },
      [RIGHT]: {
        [SWORD_SWING_1]: ex.Animation.fromSpriteSheet(
          swordSpriteSheet,
          [9],
          100
        ),
        [SWORD_SWING_2]: ex.Animation.fromSpriteSheet(
          swordSpriteSheet,
          [10],
          100
        ),
        [SWORD_SWING_3]: ex.Animation.fromSpriteSheet(
          swordSpriteSheet,
          [11],
          100
        ),
      },
    };

    this.graphics.use(this.frames[direction][SWORD_SWING_1]);

    //Nudge in initial direction to line up with Player sprite
    if (direction === DOWN) {
      this.pos.x -= 5 * SCALE;
      this.pos.y += 9 * SCALE;
    }
    if (direction === UP) {
      this.pos.x += 5 * SCALE;
      this.pos.y -= 9 * SCALE;
    }
    if (direction === LEFT) {
      this.pos.x -= 8 * SCALE;
      this.pos.y -= 7 * SCALE;
    }
    if (direction === RIGHT) {
      this.pos.x += 8 * SCALE;
      this.pos.y -= 7 * SCALE;
    }
  }

  onInitialize(_engine) {
    //new DrawShapeHelper(this); // TODO - come back to this
  }

  onDamagedSomething() {
    this.isUsed = true;
  }

  useFrame(key, direction) {
    this.graphics.use(this.frames[direction][key]);
  }
}
