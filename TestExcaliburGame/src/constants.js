import * as ex from 'excalibur';

export const VIEWPORT_WIDTH = 100;
export const VIEWPORT_HEIGHT = 100;

export const SCALE = 1;
export const SCALE_2x = new ex.Vector(1, 1);


// These are what make the walls accurate
export const ANCHOR_CENTER = new ex.Vector(0, 0);
export const ANCHOR_TOP_LEFT = new ex.Vector(0, 0);

export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';
export const WALK = 'WALK';

export const EVENT_SEND_PLAYER_UPDATE = 'EVENT_SEND_PLAYER_UPDATE';
export const EVENT_INITIAL_DATA_REQUESTED = 'EVENT_INITIAL_DATA_REQUESTED';

export const TAG_ANY_PLAYER = 'TAG_ANY_PLAYER';
