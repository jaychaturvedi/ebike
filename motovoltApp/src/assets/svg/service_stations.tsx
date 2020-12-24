import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={45} height={45} viewBox="0 0 45 45" fill="none" {...props}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M35.928 23.59c2.786-2.787 3.677-6.747 2.694-10.29-.106-.36-.544-.487-.806-.226l-5.763 5.763a.48.48 0 01-.679 0l-5.621-5.621a.48.48 0 010-.679l5.763-5.763a.481.481 0 00-.227-.806c-3.542-.983-7.502-.092-10.288 2.694-2.913 2.913-3.755 7.106-2.553 10.77a.463.463 0 01-.106.473L9.588 28.66a4.49 4.49 0 106.35 6.35l8.754-8.754a.452.452 0 01.474-.106c3.656 1.195 7.849.353 10.762-2.56z"
          stroke="#5372FF"
          strokeWidth={3}
          strokeMiterlimit={10}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path
            fill="#fff"
            transform="rotate(45 13.77 33.246)"
            d="M0 0h24.11v38.95H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
