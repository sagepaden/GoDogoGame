import * as ex from "excalibur";
import {
  ANCHOR_TOP_LEFT,
  SCALE,
  SCALE_2x,
  VIEWPORT_HEIGHT,
} from "../../constants.js";
import { Images } from "../../resources.js";
import { BottomBarHeart, halfHeartAnim } from "./BottomBarHeart.js";

const hudSprite = Images.hudImage.toSprite();

export class BottomBar extends ex.ScreenElement {
  constructor() {
    super({
      x: 0,
      y: VIEWPORT_HEIGHT * SCALE - 16 * SCALE,
      scale: SCALE_2x,
      anchor: ANCHOR_TOP_LEFT,
    });
    this.hearts = [];
    this.graphics.use(hudSprite);
    this.z = 100;
    this.hp = 3;
  }

  onInitialize(engine) {
    const TOTAL_HEARTS = 12//20;

    // Create all hearts
    let xPos = SCALE * 128;
    let yPos = this.pos.y;
    for (let index = 1; index <= TOTAL_HEARTS; index++) {
      // Create individual heart and save reference to it (so we can update it later)
      const heart = new BottomBarHeart(xPos, yPos);
      this.hearts.push(heart);
      engine.add(heart);

      // Move to next X position.
      xPos += SCALE * 8;

      // Start printing hearts on next row after 10
      if (index === 10) {
        yPos += SCALE * 8;
        xPos = SCALE * 128;
      }
    }
  }

  // Toggle visibility on blips
  updateBlips() {
    const hp = this.hp;
    this.hearts.forEach((blip, index) => {
      blip.setVisible(hp >= index + 1);


      if (index === this.hearts.length - 1) {
        console.log("LAST HEART")
        this.hearts[index].setVisible(true);
        this.hearts[index].graphics.use(halfHeartAnim)
      }

    });
  }

  onPreUpdate(engine) {
    if (engine.input.keyboard.wasPressed(ex.Input.Keys.S)) {
      this.hp += 1;
      this.updateBlips();
    }
  }

}
