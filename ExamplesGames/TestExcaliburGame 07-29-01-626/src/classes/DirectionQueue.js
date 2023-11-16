import * as ex from "excalibur";
import { LAY, SIT, DOWN, LEFT, RIGHT, UP } from "../constants.js";

export class DirectionQueue {
  constructor() {
    this.heldDirections = [];
  }

  get direction() {
    return this.heldDirections[0] ?? null;
  }

  add(dir) {
    const exists = this.heldDirections.includes(dir);
    if (exists) {
      return;
    }
    this.heldDirections.unshift(dir);
  }

  remove(dir) {
    this.heldDirections = this.heldDirections.filter((d) => d !== dir);
  }

  update(engine) {
    [
      { key: ex.Input.Keys.Left, dir: LEFT },
      { key: ex.Input.Keys.Right, dir: RIGHT },
      { key: ex.Input.Keys.Up, dir: UP },
      { key: ex.Input.Keys.Down, dir: DOWN },
      { key: ex.Input.Keys.Z, dir: SIT },
      { key: ex.Input.Keys.X, dir: LAY },
    ].forEach((group) => {
      if (engine.input.keyboard.wasPressed(group.key)) {
        this.add(group.dir);
      }
      if (engine.input.keyboard.wasReleased(group.key)) {
        this.remove(group.dir);
      }
    });
  }
}
