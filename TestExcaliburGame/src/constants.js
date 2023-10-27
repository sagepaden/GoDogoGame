import * as ex from 'excalibur';

export const VIEWPORT_WIDTH = 300;
export const VIEWPORT_HEIGHT = 300;

export const SCALE = 1;
export const SCALE_2x = new ex.Vector(2, 2);


// These are what make the walls accurate
export const ANCHOR_CENTER = new ex.Vector(0, 0);
export const ANCHOR_TOP_LEFT = new ex.Vector(0, 0);

export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export const WALK = 'WALK';

// export const SWORDACTION = "SWORDACTION";
// export const ARROWACTION = "ARROWACTION";

export const EVENT_SEND_PLAYER_UPDATE = 'EVENT_SEND_PLAYER_UPDATE';
// export const EVENT_SEND_MOBLIN_UPDATE = "EVENT_SEND_MOBLIN_UPDATE";
export const EVENT_INITIAL_DATA_REQUESTED = 'EVENT_INITIAL_DATA_REQUESTED';

// export const EVENT_NETWORK_PLAYER_UPDATE = "EVENT_NETWORK_PLAYER_UPDATE";
// export const EVENT_NETWORK_PLAYER_LEAVE = "EVENT_NETWORK_PLAYER_LEAVE";

// export const EVENT_NETWORK_MOBLIN_UPDATE = "EVENT_NETWORK_MOBLIN_UPDATE";

export const TAG_ANY_PLAYER = 'TAG_ANY_PLAYER';
