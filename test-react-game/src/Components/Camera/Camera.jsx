import React from 'react';

const Camera = ({ children, cameraRef }) => {
  return (
    <div
      ref={cameraRef}
      className="camera"
    >
      {children}
    </div>
  );
};

export default Camera;
