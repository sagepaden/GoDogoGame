import * as ex from "excalibur";
import { Images } from "../resources.js";
import { SWORD_SWING_1 } from "./Sword.js";
import {
  DOWN,
  LEFT,
  RIGHT,
  SCALE_2x,
  TAG_PLAYER_WEAPON,
  UP,
} from "../constants.js";

const arrowSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.arrowSheetImage,
  grid: {
    columns: 1,
    rows: 4,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});

const arrowDownAnim = ex.Animation.fromSpriteSheet(arrowSpriteSheet, [0], 100);
const arrowUpAnim = ex.Animation.fromSpriteSheet(arrowSpriteSheet, [1], 100);
const arrowLeftAnim = ex.Animation.fromSpriteSheet(arrowSpriteSheet, [2], 100);
const arrowRightAnim = ex.Animation.fromSpriteSheet(arrowSpriteSheet, [3], 100);

export class Arrow extends ex.Actor {
  constructor(x, y, direction) {
    super({
      pos: new ex.Vector(x, y),
      width: 16,
      height: 16,
      scale: SCALE_2x,
    });

    this.addTag(TAG_PLAYER_WEAPON);
    this.owner = null; // Assigned on creation by body who creates this.

    // Expire after so much time
    this.msRemaining = 2000;

    // Travel in direction
    const ARROW_VELOCITY = 300;
    if (direction === DOWN) {
      this.graphics.use(arrowDownAnim);
      this.vel.y = ARROW_VELOCITY;
    }
    if (direction === UP) {
      this.graphics.use(arrowUpAnim);
      this.vel.y = -ARROW_VELOCITY;
    }
    if (direction === LEFT) {
      this.graphics.use(arrowLeftAnim);
      this.vel.x = -ARROW_VELOCITY;
    }
    if (direction === RIGHT) {
      this.graphics.use(arrowRightAnim);
      this.vel.x = ARROW_VELOCITY;
    }
  }

  // Remove me if I hit something
  onDamagedSomething() {
    this.kill();
  }

  onPreUpdate(_engine, delta) {
    // Remove after time has passed.
    // Fun note: originally tried this when the arrow goes "off screen", but it's not necessarily off-screen for other players
    this.msRemaining -= delta;
    if (this.msRemaining <= 0) {
      this.kill();
    }
  }
}
