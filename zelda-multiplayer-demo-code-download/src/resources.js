import * as ex from "excalibur";

const Images = {
  // Characters
  linkSheetImage: new ex.ImageSource("/sprites/link-sheet.png"),
  linkBlueSheetImage: new ex.ImageSource("/sprites/link-blue-sheet.png"),
  linkRedSheetImage: new ex.ImageSource("/sprites/link-red-sheet.png"),
  linkYellowSheetImage: new ex.ImageSource("/sprites/link-yellow-sheet.png"),
  marinSheetImage: new ex.ImageSource("/sprites/marin-sheet.png"),
  tarinSheetImage: new ex.ImageSource("/sprites/tarin-sheet.png"),
  shopkeepSheetImage: new ex.ImageSource("/sprites/shopkeep-sheet.png"),

  moblinSheetImage: new ex.ImageSource("/sprites/moblin-sheet.png"),

  // Weapons
  swordSheetImage: new ex.ImageSource("/sprites/sword-sheet.png"),
  arrowSheetImage: new ex.ImageSource("/sprites/arrow-sheet.png"),

  // Maps
  mobCaveImage: new ex.ImageSource("/maps/mob-cave.png"),
  outdoorImage: new ex.ImageSource("/maps/outdoor.png"),
  indoorImage: new ex.ImageSource("/maps/indoor.png"),
  indoorColorsImage: new ex.ImageSource("/maps/indoor-colors.png"),

  // Effects
  explosionSheetImage: new ex.ImageSource("/sprites/explosion-sheet.png"),

  // Hud
  hudImage: new ex.ImageSource("/hud/hud.png"),
  heartSheetImage: new ex.ImageSource("/hud/heart-sheet.png"),
};

const Sounds = {};

const loader = new ex.Loader();
loader.suppressPlayButton = true;
const allResources = { ...Images, ...Sounds };
for (const res in allResources) {
  loader.addResource(allResources[res]);
}

// Player Sprites

export { loader, Images, Sounds };
