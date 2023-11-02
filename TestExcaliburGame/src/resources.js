import * as ex from 'excalibur';
import { TiledMapResource } from '@excaliburjs/plugin-tiled';

const Images = {
	// Characters
	linkSheetImage: new ex.ImageSource('../public/sprites/Root_walk.png'),
};

const tiledMap = new TiledMapResource(
	'../public/TiledMaps/GoDogoTestMap/GoDogoTestMap.tmx',
);

const loader = new ex.Loader([tiledMap]);
loader.suppressPlayButton = true;

// Add all resources to the loader
const allResources = { ...Images };
for (const res in allResources) {
	loader.addResource(allResources[res]);
}

// Define an async function to load resources and run subsequent code
async function loadResourcesAndRun() {
	// Wait for resources to load
	await loader.load();

	// Any code you want to run after resources are loaded goes here
	console.log('All resources are loaded!');
}

// Call the function
loadResourcesAndRun();

export { loader, Images, tiledMap };
