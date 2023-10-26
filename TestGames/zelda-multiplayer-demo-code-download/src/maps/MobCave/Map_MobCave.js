import * as ex from "excalibur";
import { ANCHOR_TOP_LEFT, SCALE_2x } from "../../constants.js";
import { Images } from "../../resources.js";
import { Floor } from "../../actor/Floor.js";
import { MoblinRoamPoint } from "../../actor/Moblin/MoblinRoamPoint.js";
import { randomFromArray } from "../../helpers.js";

const mapSprite = Images.mobCaveImage.toSprite();

export class Map_MobCave extends ex.Actor {
  constructor() {
    super({
      x: 0,
      y: 0,
      scale: SCALE_2x,
      anchor: ANCHOR_TOP_LEFT,
    });
    this.graphics.use(mapSprite);

    this.tileWidth = 19;
    this.tileHeight = 19;
  }

  onInitialize(engine) {
    [
      { x: 3, y: 2, w: 14, h: 1 },
      { x: 2, y: 3, w: 2, h: 1 },
      { x: 2, y: 4, w: 1, h: 9 },
      { x: 2, y: 13, w: 2, h: 1 },

      { x: 6, y: 15, w: 1, h: 1 },
      { x: 3, y: 14, w: 4, h: 1 },
      { x: 6, y: 16, w: 11, h: 1 },

      { x: 16, y: 3, w: 1, h: 1 },
      { x: 17, y: 3, w: 1, h: 11 },
      { x: 16, y: 13, w: 1, h: 3 },
    ].forEach(({ x, y, w, h }) => {
      const floor = new Floor(x, y, w, h);
      engine.add(floor);
    });

    // Moblin points for this map
    [
      { x: 140, y: 250 },
      { x: 340, y: 250 },
      { x: 300, y: 150 },
      { x: 190, y: 380 },
    ].forEach(({ x, y }) => {
      const moblinPoint = new MoblinRoamPoint(x, y);
      engine.add(moblinPoint);
    });
  }

  getPlayerStartingPosition() {
    return randomFromArray([
      [200, 400],
      [300, 400],
      [400, 400],
      [475, 400],
    ]);
  }
}
