import * as ex from "excalibur";
import { SCALE_2x, TAG_MOBLIN_ROAM_POINT } from "../../constants.js";

export class MoblinRoamPoint extends ex.Actor {
  constructor(x, y) {
    super({
      pos: new ex.Vector(x, y),
      width: 4,
      height: 4,
      scale: SCALE_2x,
      color: ex.Color.Red,
    });
    // Be invisible, but we can turn this to 1 to see them in the scene for debugging.
    this.graphics.opacity = 0;

    // Add a tag that Moblins will use to query for
    this.addTag(TAG_MOBLIN_ROAM_POINT);
  }
}
