import React from 'react';
import Character from './Character/Character';


function GameArea() {
  return (
    <div className="camera">
      <div className="map pixel-art">
        <Character />
      </div>
    </div>
  );
}

export default GameArea;
