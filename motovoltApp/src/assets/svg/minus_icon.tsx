import * as React from 'react';
import Svg, {G, Circle, Rect, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G data-name="Group 1977" transform="translate(-32 -277)">
        <Circle
          data-name="Ellipse 344"
          cx={12}
          cy={12}
          r={12}
          transform="translate(32 277)"
          fill="#e7e7f0"
        />
        <Rect
          data-name="Rectangle 3011"
          width={2}
          height={11.999}
          rx={1}
          transform="rotate(90 -119 169)"
          fill="#333"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
