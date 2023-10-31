import * as ex from "excalibur";
import { ANCHOR_TOP_LEFT, SCALE_2x } from "../../constants.js";
import { Images } from "../../resources.js";
import { Floor } from "../../actor/Floor.js";
import { randomFromArray } from "../../helpers.js";

// const furniture = Images.indoorImage.toSprite();
const mapSprite = Images.indoorColorsImage.toSprite();

export class Map_Indoor extends ex.Actor {
  constructor() {
    super({
      x: 0,
      y: 0,
      scale: SCALE_2x,
      anchor: ANCHOR_TOP_LEFT,
    });
    this.graphics.use(mapSprite);

    this.tileWidth = 16;
    this.tileHeight = 16;
  }

  onInitialize(engine) {
    [
      // Top Wall
      { x: -1, y: 7, w: 6, h: 1 },

      { x: 10, y: 5, w: 6, h: 1 },

      { x: 22, y: 7, w: 5, h: 1 },

      // Bottom Wall
      { x: 0, y: 19, w: 16, h: 1 },
      // { x: 16, y: 18, w: 5, h: 1 },

      // Left Wall
      { x: -1, y: 8, w: 1, h: 6 },

      // Right Wall
      { x: 32, y: 8, w: 1, h: 6 },


    ].forEach(({ x, y, w, h }) => {
      const floor = new Floor(x, y, w, h);
      engine.add(floor);
    });

    // Moblin points for this map
    //     [
    //       { x: 140, y: 250 },
    //       { x: 340, y: 250 },
    //       { x: 300, y: 150 },
    //       { x: 190, y: 380 },
    //     ].forEach(({ x, y }) => {
    //       const moblinPoint = new MoblinRoamPoint(x, y);
    //       engine.add(moblinPoint);
    //     });
  }

  getPlayerStartingPosition() {
    return [128, 128];

    // return randomFromArray([
    // 	[200, 225],
    // 	[450, 225],
    // 	[300, 325],
    // 	[450, 325],
    // ]);
  }
}
