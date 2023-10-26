import { NetworkPlayer } from "../actor/Players/NetworkPlayer.js";
import {
  EVENT_NETWORK_MOBLIN_UPDATE,
  EVENT_NETWORK_PLAYER_LEAVE,
  EVENT_NETWORK_PLAYER_UPDATE,
} from "../constants.js";
import { NetworkMoblin } from "../actor/Moblin/NetworkMoblin.js";

// Manages Actors that display state of other connected Players
export class NetworkActorsMap {
  constructor(engine) {
    this.engine = engine;
    this.playerMap = new Map();

    this.engine.on(EVENT_NETWORK_PLAYER_UPDATE, (otherPlayer) => {
      this.onUpdatedPlayer(otherPlayer.id, otherPlayer.data);
    });

    this.engine.on(EVENT_NETWORK_MOBLIN_UPDATE, (content) => {
      this.onUpdatedMoblin(content);
    });

    this.engine.on(EVENT_NETWORK_PLAYER_LEAVE, (otherPlayerIdWhoLeft) => {
      this.removePlayer(otherPlayerIdWhoLeft);
    });
  }

  onUpdatedPlayer(id, content) {
    // Decode what was sent here
    const [
      actionType,
      x,
      y,
      velX,
      velY,
      skinId,
      facing,
      isInPain,
      isPainFlashing,
    ] = content.split("|");

    const stateUpdate = {
      actionType,
      x: Number(x),
      y: Number(y),
      skinId,
      facing,
      isInPain: isInPain === "true",
      isPainFlashing: isPainFlashing === "true",
    };

    if (isInPain) {
      stateUpdate.velX = Number(velX);
      stateUpdate.velY = Number(velY);
    }

    let otherPlayerActor = this.playerMap.get(id);
    if (!otherPlayerActor) {
      otherPlayerActor = new NetworkPlayer(stateUpdate.x, stateUpdate.y);
      this.playerMap.set(id, otherPlayerActor);
      this.engine.add(otherPlayerActor);
    }

    otherPlayerActor.onStateUpdate(stateUpdate);
  }

  // Called when this id disconnects
  removePlayer(id) {
    const actorToRemove = this.playerMap.get(id);
    if (actorToRemove) {
      actorToRemove.kill();
    }
    this.playerMap.delete(id);
  }

  onUpdatedMoblin(content) {
    const [_type, networkId, x, y, _velX, _velY, facing, hasPainState, hp] =
      content.split("|");

    let moblinDummyActor = this.playerMap.get(networkId);

    // Add new if it doesn't exist
    if (!moblinDummyActor) {
      moblinDummyActor = new NetworkMoblin(x, y);
      this.playerMap.set(networkId, moblinDummyActor);
      this.engine.add(moblinDummyActor);
    }

    //Update the node ("Puppet style")
    moblinDummyActor.pos.x = Number(x);
    moblinDummyActor.pos.y = Number(y);
    moblinDummyActor.facing = facing;
    moblinDummyActor.hasPainState = hasPainState === "true";

    // Destroy if gone
    if (Number(hp) <= 0) {
      moblinDummyActor.tookFinalDamage();
      this.playerMap.delete(networkId);
    }
  }
}
