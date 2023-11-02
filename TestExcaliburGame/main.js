import * as ex from 'excalibur';
import { loader, tiledMap } from './src/resources.js';
import { Player } from './src/actor/Players/Player.js';
import { Player_CameraStrategy } from './src/classes/PlayerCameraStrategy.js';
import {
	EVENT_SEND_PLAYER_UPDATE,
	TAG_ANY_PLAYER,
	VIEWPORT_HEIGHT,
	VIEWPORT_WIDTH,
} from './src/constants.js';

import {setDrawing} from '@excaliburjs/plugin-tiled'

const SCALE = 2;

const game = new ex.Engine({
	width: VIEWPORT_WIDTH * SCALE,
	height: VIEWPORT_HEIGHT * SCALE,
	fixedUpdateFps: 60,
	antialiasing: false, // Pixel art graphics
});

const player = new Player();

player.z = 1; // Make sure the player is rendered above the map
game.add(player);

game.currentScene.camera.pos = new ex.Vector(100, 100);

game.on('initialize', () => {
	
	// Add custom Camera behavior, following player and being limited to the map bounds
	const cameraStrategy = new Player_CameraStrategy(player);
	game.currentScene.camera.addStrategy(cameraStrategy);

	// Set up ability to query for certain actors on the fly
	game.currentScene.world.queryManager.createQuery([TAG_ANY_PLAYER]);

	// When one of my nodes updates, send it to all peers
	game.on(EVENT_SEND_PLAYER_UPDATE, (update) => {
		peer.sendUpdate(update);
	});
});

game.start(loader)
	.then(function () {
		tiledMap.addTiledMapToScene(game.currentScene);
		// Initialize camera strategy with the loaded map
		const cameraStrategy = new Player_CameraStrategy(
			player,
			tiledMap.data.rawMap,
		);
		game.currentScene.camera.addStrategy(cameraStrategy);
	})
	.catch(function (error) {
		console.error('Error starting game:', error);
	});
