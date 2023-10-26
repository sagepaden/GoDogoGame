import * as ex from "excalibur";
import { ANCHOR_TOP_LEFT, SCALE_2x } from "../../constants.js";
import { Images } from "../../resources.js";

const heartSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.heartSheetImage,
  grid: {
    columns: 3,
    rows: 1,
    spriteWidth: 8,
    spriteHeight: 8,
  },
});

export const emptyHeartAnim = ex.Animation.fromSpriteSheet(heartSpriteSheet, [0], 100);
export const halfHeartAnim = ex.Animation.fromSpriteSheet(heartSpriteSheet, [1], 100);
export const fullHeartAnim = ex.Animation.fromSpriteSheet(heartSpriteSheet, [2], 100);

export class BottomBarHeart extends ex.ScreenElement {
  constructor(x, y) {
    super({
      x: x,
      y: y,
      scale: SCALE_2x,
      anchor: ANCHOR_TOP_LEFT,
    });
    this.graphics.use(fullHeartAnim);
    this.z = 101;
  }

  setVisible(newValue) {
    this.graphics.opacity = newValue ? 1.0 : 0;
  }
}
