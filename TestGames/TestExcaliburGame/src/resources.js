import * as ex from 'excalibur';

const Images = {
	// Characters
	linkSheetImage: new ex.ImageSource(
		'../public/sprites/Root_walk.png',
	),
	// linkBlueSheetImage: new ex.ImageSource("/sprites/link-blue-sheet.png"),
	// linkRedSheetImage: new ex.ImageSource("/sprites/link-red-sheet.png"),
	// linkYellowSheetImage: new ex.ImageSource("/sprites/link-yellow-sheet.png"),
	// marinSheetImage: new ex.ImageSource("/sprites/marin-sheet.png"),
	// tarinSheetImage: new ex.ImageSource("/sprites/tarin-sheet.png"),
	// shopkeepSheetImage: new ex.ImageSource("/sprites/shopkeep-sheet.png"),

	// Maps
	// mobCaveImage: new ex.ImageSource("/maps/mob-cave.png"),
	// outdoorImage: new ex.ImageSource("/maps/outdoor.png"),
	// indoorImage: new ex.ImageSource("/maps/indoor.png"),
	indoorColorsImage: new ex.ImageSource('../public/maps/CameraDemoMap.png'),

	// Effects
	// explosionSheetImage: new ex.ImageSource("/sprites/explosion-sheet.png"),

	// Hud
	//   hudImage: new ex.ImageSource("/hud/hud.png"),
	//   heartSheetImage: new ex.ImageSource("/hud/heart-sheet.png"),
};

// const Sounds = {};

// const loader = new ex.Loader();
// loader.load().then(() => {
// 	loader.suppressPlayButton = true;
// 	const allResources = { ...Images };
// 	for (const res in allResources) {
// 		loader.addResource(allResources[res]);
// 	}
// });

// // Player Sprites

// export { loader, Images };

const loader = new ex.Loader();
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

export { loader, Images };
