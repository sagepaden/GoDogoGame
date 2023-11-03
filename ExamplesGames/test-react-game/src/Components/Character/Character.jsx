import React from 'react';
import useCharacter from '../../Hooks/useCharacter';

function Character() {
  useCharacter();

  return (
    <div className="character" facing="down" walking="true">
      <div className="shadow pixel-art"></div>
      <div className="character_spritesheet pixel-art"></div>
    </div>
  );
}

export default Character;
