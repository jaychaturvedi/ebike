import * as React from 'react';
import Svg, {G, Circle, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G data-name="Group 1848" transform="translate(-32 -277)">
        <Circle
          data-name="Ellipse 344"
          cx={12}
          cy={12}
          r={12}
          transform="translate(32 277)"
          fill="#e7e7f0"
        />
        <Path
          data-name="Union 1"
          d="M43 294v-4h-4a1 1 0 010-2h4v-4a1 1 0 012 0v4h4a1 1 0 010 2h-4v4a1 1 0 01-2 0z"
          fill="#333"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
