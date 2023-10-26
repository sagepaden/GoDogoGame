import * as ex from "excalibur";
import {
  WALK,
  PAIN,
  ANCHOR_CENTER,
  SCALE_2x,
  TAG_MOBLIN_ROAM_POINT,
  TAG_ANY_PLAYER,
  DOWN,
  RIGHT,
  LEFT,
  UP,
  TAG_PLAYER_WEAPON,
  TAG_DAMAGES_PLAYER,
  EVENT_SEND_PLAYER_UPDATE,
  EVENT_INITIAL_DATA_REQUESTED,
  EVENT_SEND_MOBLIN_UPDATE,
} from "../../constants.js";
import { guidGenerator, randomFromArray } from "../../helpers.js";
import { Explosion } from "../Explosion.js";
import { generateMoblinAnimations } from "../character-animations.js";
import { NetworkUpdater } from "../../classes/NetworkUpdater.js";


const MOBLIN_WALK_VELOCITY = 30;
const MOBLIN_CHASE_VELOCITY = 65;
const MOBLIN_DETECT_PLAYER_RANGE = 200;

export class Moblin extends ex.Actor {
  constructor(x, y) {
    super({
      pos: new ex.Vector(x, y),
      width: 16,
      height: 16,
      scale: SCALE_2x,
      collider: ex.Shape.Box(11, 10, ANCHOR_CENTER, new ex.Vector(0, 4)),
      collisionType: ex.CollisionType.Active,
    });
    this.networkId = guidGenerator();
    this.painState = null;

    this.roamingPoint = null;
    this.target = null;
    this.hp = 3;
    this.facing = DOWN;
    this.anims = generateMoblinAnimations();

    this.on("collisionstart", (evt) => this.onCollisionStart(evt));
  }

  onInitialize(engine) {
    //new DrawShapeHelper(this);

    // Add to enemy group
    this.addTag(TAG_DAMAGES_PLAYER);

    // Choose random roaming point
    this.chooseRoamingPoint();

    // Periodically query for a new target
    void this.queryForTarget();

    // Send network updates on move
    this.networkUpdater = new NetworkUpdater(engine, EVENT_SEND_MOBLIN_UPDATE);

    engine.on(EVENT_INITIAL_DATA_REQUESTED, () => {
      engine.emit(EVENT_SEND_MOBLIN_UPDATE, this.createNetworkUpdateString());
    });
  }

  onCollisionStart(evt) {
    if (evt.other.hasTag(TAG_PLAYER_WEAPON)) {
      if (evt.other.isUsed) {
        return;
      }
      evt.other.onDamagedSomething();
      this.takeDamage(evt.other.direction);
    }
  }

  async queryForTarget() {
    // If we don't have a valid target
    if (!this.target || this.target?.isKilled()) {
      // Query all players on the map
      const playersQuery = this.scene.world.queryManager.getQuery([
        TAG_ANY_PLAYER,
      ]);
      // Filter down to nearby ones (within MOBLIN_DETECT_PLAYER_RANGE pixels)
      const nearbyPlayers = playersQuery.getEntities().filter((actor) => {
        const actorDistance = this.pos.distance(actor.pos);
        return actorDistance <= MOBLIN_DETECT_PLAYER_RANGE;
      });
      // If we have results, choose a random one to target
      if (nearbyPlayers.length) {
        this.target = randomFromArray(nearbyPlayers);
      }
    }

    // Retry after X seconds
    await this.actions.delay(1500).toPromise();
    void this.queryForTarget();
  }

  chooseRoamingPoint() {
    // Query for moblin point
    const roamingPointsQuery = this.scene.world.queryManager.getQuery([
      TAG_MOBLIN_ROAM_POINT,
    ]);
    this.roamingPoint = randomFromArray(roamingPointsQuery.getEntities());
  }

  takeDamage(otherDirection) {
    if (this.painState) {
      return;
    }

    // Reduce HP
    this.hp -= 1;

    // Check for death
    if (this.hp === 0) {
      this.kill();
      const expl = new Explosion(this.pos.x, this.pos.y);
      this.scene.engine.add(expl);
      // Emit that we died. It matters otherwise other players don't hear about HP being 0
      const networkUpdateStr = this.createNetworkUpdateString();
      this.networkUpdater.sendStateUpdate(networkUpdateStr);
      return;
    }

    let x = this.vel.x * -1;
    if (otherDirection === LEFT) {
      x = -300;
    }
    if (otherDirection === RIGHT) {
      x = 300;
    }
    let y = this.vel.y * -1;
    if (otherDirection === DOWN) {
      y = 300;
    }
    if (otherDirection === UP) {
      y = -300;
    }

    this.painState = {
      msLeft: 100,
      velX: x,
      velY: y,
    };
  }

  createNetworkUpdateString() {
    const hasPainState = Boolean(this.painState);
    const x = Math.round(this.pos.x);
    const y = Math.round(this.pos.y);
    return `MOBLIN|${this.networkId}|${x}|${y}|${this.vel.x}|${this.vel.y}|${this.facing}|${hasPainState}|${this.hp}`;
  }

  onPreUpdate(engine, delta) {
    if (this.painState) {
      this.vel.x = this.painState.velX;
      this.vel.y = this.painState.velY;
      this.painState.msLeft -= delta;
      if (this.painState.msLeft <= 0) {
        this.painState = null;
      }
    } else {
      if (this.target) {
        this.onPreUpdateMoveTowardsTarget();
      } else {
        this.onPreUpdateMoveTowardsRoamingPoint();
      }
    }

    // Show correct appearance
    this.onPreUpdateAnimation();

    //Update everybody
    const networkUpdateStr = this.createNetworkUpdateString();
    this.networkUpdater.sendStateUpdate(networkUpdateStr);
  }

  onPreUpdateMoveTowardsRoamingPoint() {
    if (!this.roamingPoint) {
      return;
    }

    // Move towards the point if far enough away
    const dest = this.roamingPoint.pos;
    const distance = this.roamingPoint.pos.distance(this.pos);
    if (distance > 5) {
      if (this.pos.x < dest.x) {
        this.vel.x = MOBLIN_WALK_VELOCITY;
      }
      if (this.pos.x > dest.x) {
        this.vel.x = -MOBLIN_WALK_VELOCITY;
      }
      if (this.pos.y < dest.y) {
        this.vel.y = MOBLIN_WALK_VELOCITY;
      }
      if (this.pos.y > dest.y) {
        this.vel.y = -MOBLIN_WALK_VELOCITY;
      }
    } else {
      this.chooseRoamingPoint();
    }
  }

  onPreUpdateMoveTowardsTarget() {
    // Move towards the point if far enough away
    const dest = this.target.pos;
    const distance = this.target.pos.distance(this.pos);
    if (distance > 5) {
      if (this.pos.x < dest.x) {
        this.vel.x = MOBLIN_CHASE_VELOCITY;
      }
      if (this.pos.x > dest.x) {
        this.vel.x = -MOBLIN_CHASE_VELOCITY;
      }
      if (this.pos.y < dest.y) {
        this.vel.y = MOBLIN_CHASE_VELOCITY;
      }
      if (this.pos.y > dest.y) {
        this.vel.y = -MOBLIN_CHASE_VELOCITY;
      }
    }
  }

  faceTowardsPosition(pos) {
    const xDiff = Math.abs(this.pos.x - pos.x);
    const yDiff = Math.abs(this.pos.y - pos.y);

    // Use axis that has the greatest distance
    if (xDiff > yDiff) {
      this.facing = this.pos.x > pos.x ? LEFT : RIGHT;
    } else {
      this.facing = this.pos.y > pos.y ? UP : DOWN;
    }

    // Choose the correct frame
    const pose = this.painState ? PAIN : WALK;
    this.graphics.use(this.anims[pose][this.facing]);
  }

  onPreUpdateAnimation() {
    const faceActor = this.target ?? this.roamingPoint;
    if (faceActor) {
      this.faceTowardsPosition(faceActor.pos);
    }
  }
}
