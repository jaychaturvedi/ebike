import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

interface Props {}

const Mic = (props: Props) => {
  return (
    <Svg width={18} height={25} viewBox="0 0 18 25" fill="none" {...props}>
      <Path
        d="M8.52 14.23a3.82 3.82 0 003.82-3.82V4.82a3.82 3.82 0 10-7.64 0v5.59a3.82 3.82 0 003.82 3.82z"
        stroke="#3C5BE8"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1 10.59c0 4.15 3.37 7.52 7.52 7.52 4.15 0 7.52-3.37 7.52-7.52M8.52 18.67v4.93M3.68 23.78h9.68"
        stroke="#3C5BE8"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Mic