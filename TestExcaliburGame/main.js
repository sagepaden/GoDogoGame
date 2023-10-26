import * as ex from 'excalibur';
import { loader } from './src/resources.js';
import { Player } from './src/actor/Players/Player.js';
import { Player_CameraStrategy } from './src/classes/PlayerCameraStrategy.js';
import {
	EVENT_SEND_PLAYER_UPDATE,
	TAG_ANY_PLAYER,
	VIEWPORT_HEIGHT,
	VIEWPORT_WIDTH,
} from './src/constants.js';
import { Map_Indoor } from './src/maps/MobCave/Map_Indoor.js';

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
// const hud = new BottomBar();
// game.add(hud);

// const playerSkin = randomFromArray([
//   "LINK",
//   "BLUELINK",
//   "YELLOWLINK",
//   "REDLINK",
//   "TARIN",
//   "MARIN",
// ]);

// original player varible with randomized skin
// const player = new Player(startingX, startingY, playerSkin);

const player = new Player(startingX, startingY);
game.add(player);

game.on('initialize', () => {
	// Add custom Camera behavior, following player and being limited to the map bounds
	const cameraStrategy = new Player_CameraStrategy(player, map);
	game.currentScene.camera.addStrategy(cameraStrategy);

	// Set up ability to query for certain actors on the fly
	game.currentScene.world.queryManager.createQuery([TAG_ANY_PLAYER]);

	// When one of my nodes updates, send it to all peers
	game.on(EVENT_SEND_PLAYER_UPDATE, (update) => {
		peer.sendUpdate(update);
	});
});

game.start(loader);

