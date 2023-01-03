import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const ImageSuspense = () => {
  return (
    <RotatingLines
      strokeColor="black"
      strokeWidth="3"
      animationDuration="0.75"
      width="50"
      visible={true}
    />
  );
};

export default ImageSuspense;
