import * as ex from "excalibur";
import { loader } from "./src/resources.js";
import { Player } from "./src/actor/Players/Player.js";
import { Map_MobCave } from "./src/maps/MobCave/Map_MobCave.js";
import { Player_CameraStrategy } from "./src/classes/Player_CameraStrategy.js";
import { NetworkClient } from "./src/classes/NetworkClient.js";
import {
  EVENT_SEND_PLAYER_UPDATE,
  TAG_MOBLIN_ROAM_POINT,
  TAG_ANY_PLAYER,
  EVENT_SEND_MOBLIN_UPDATE,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "./src/constants.js";
import { NetworkActorsMap } from "./src/classes/NetworkActorsMap.js";
import { randomFromArray } from "./src/helpers.js";
import { Moblin } from "./src/actor/Moblin/Moblin.js";
import { BottomBar } from "./src/actor/Hud/BottomBar.js";
import { Map_Outdoor } from "./src/maps/MobCave/Map_Outdoor.js";
import { Map_Indoor } from "./src/maps/MobCave/Map_Indoor.js";

const SCALE = 2;

const game = new ex.Engine({
  width: VIEWPORT_WIDTH * SCALE,
  height: VIEWPORT_HEIGHT * SCALE,
  fixedUpdateFps: 60,
  antialiasing: false, // Pixel art graphics
});

//const map = new Map_MobCave();
//const map = new Map_Outdoor();
const map = new Map_Indoor();
game.add(map);
const [startingX, startingY] = map.getPlayerStartingPosition();

// Add HUD
const hud = new BottomBar();
game.add(hud);


const playerSkin = randomFromArray([
  "LINK",
  "BLUELINK",
  "YELLOWLINK",
  "REDLINK",
  "TARIN",
  "MARIN",
]);
const player = new Player(startingX, startingY, playerSkin);
game.add(player);

game.on("initialize", () => {
  // Add custom Camera behavior, following player and being limited to the map bounds
  const cameraStrategy = new Player_CameraStrategy(player, map);
  game.currentScene.camera.addStrategy(cameraStrategy);

  // Set up ability to query for certain actors on the fly
  game.currentScene.world.queryManager.createQuery([TAG_ANY_PLAYER]);
  game.currentScene.world.queryManager.createQuery([TAG_MOBLIN_ROAM_POINT]);

  // Create player state list and network listener
  new NetworkActorsMap(game);
  const peer = new NetworkClient(game);

  // When one of my nodes updates, send it to all peers
  game.on(EVENT_SEND_PLAYER_UPDATE, (update) => {
    peer.sendUpdate(update);
  });
  game.on(EVENT_SEND_MOBLIN_UPDATE, (update) => {
    peer.sendUpdate(update);
  });

});



game.start(loader);

const button = document.createElement("button");
button.onclick = () => {
  const [moblinStartingX, moblinStartingY] = map.getPlayerStartingPosition();
  const moblin = new Moblin(moblinStartingX, moblinStartingY);
  game.add(moblin);
};
button.style.display = "block";
button.innerText = "ADD MOBLIN";
document.body.append(button);
