import React, { FC } from 'react';
import Svg, { Polyline } from 'react-native-svg';

export const StraightLine: FC = () => {
  return (
    <Svg height="100" width="100">
      <Polyline
        points="25,25 25,25"
        fill="none"
        stroke="black"
        strokeWidth="4"
      />
    </Svg>
  );
};
