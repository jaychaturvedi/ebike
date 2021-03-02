import React from 'react';
import Svg, {Path, Circle, Defs, G, ClipPath} from 'react-native-svg';

interface Props {}

const Camera = (props: Props) => {
  return (
    <Svg width={50} height={30} viewBox="0 0 45 37" fill="none" {...props}>
      <G
        clipPath="url(#prefix__clip0)"
        stroke="#3C5BE8"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M23.07 15.22l-.56-2.38c-.12-.49-.55-.84-1.06-.84H10.2c-.5 0-.94.35-1.06.84l-.56 2.38-6.42 1.33c-.67.14-1.16.73-1.16 1.43V33.6c0 1.23 1 2.22 2.22 2.22h25.21c1.23 0 2.22-1 2.22-2.22V17.98c0-.69-.49-1.29-1.16-1.43l-6.42-1.33z" />
        <Path d="M15.83 32.1a6.94 6.94 0 100-13.88 6.94 6.94 0 000 13.88zM14.76 22.02a4.2 4.2 0 014.2 4.2M26.27 20.09a.45.45 0 100-.9.45.45 0 000 .9z" />
      </G>
      <Circle
        cx={33}
        cy={12}
        r={11}
        fill="#fff"
        stroke="#3C5BE8"
        strokeWidth={2}
      />
      <Path fill="#fff" d="M33 7l5 5-5 5-5-5z" />
      <Path
        d="M33 7v10M28 12h10"
        stroke="#3C5BE8"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path
            fill="#fff"
            transform="translate(0 11)"
            d="M0 0h31.65v25.82H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Camera