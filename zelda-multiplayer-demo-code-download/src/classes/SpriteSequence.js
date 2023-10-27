// NOTE TO SELF - continue this as needed if you feel like it. Kinda a rough sketch.
// - apply an Array of 1 frame Excalibur Animations
// do some math to figure out "which one" is showing
// call `work` method on pre update, passing in delta
// have a clean callback to fire at the end when anim is done
// Animation usage code could be like `swordSwingSpriteSeq.isDone`, `swordSwingSpriteSeq.frame` or just make it null when it's done

export class SpriteSequence {
  constructor(type, frameAnims = [], onDone) {
    this.type = type;
    this.frameAnims = frameAnims;
    this.currentFrameIndex = 0;
    this.currentFrameProgress = 0;
    this.isDone = false;
    this.onDone = () => {
      this.isDone = true;
      onDone(this.actorObject)
    };

    this.actorObject = null; // A sword, for example
  }

  get frame() {
    return this.frameAnims[this.currentFrameIndex].frame;
  }

  work(delta) {
    if (this.isDone) {
      return;
    }

    const currentFrameDuration =
      this.frameAnims[this.currentFrameIndex].duration;

    // Work on current frame
    if (this.currentFrameProgress < currentFrameDuration) {
      this.currentFrameProgress += delta;
      return;
    }

    if (this.currentFrameIndex + 1 < this.frameAnims.length) {
      this.currentFrameIndex += 1;
      this.currentFrameProgress = 0;
      // Do new frame callback
      const nextConfig = this.frameAnims[this.currentFrameIndex];
      if (nextConfig.actorObjCallback) {
        nextConfig.actorObjCallback(this.actorObject);
      }
      return;
    }
    this.onDone();
  }
}
