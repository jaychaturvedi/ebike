import * as React from 'react';
import Svg, {G, Path, Circle, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={7.414} height={24.581} viewBox="0 0 7.414 24.581" {...props}>
      <G data-name="Group 2897" transform="rotate(90 360.853 343.645)">
        <Path
          data-name="Path 2009"
          d="M18.209 700.791h23.082"
          fill="none"
          stroke="#707070"
        />
        <Path
          data-name="Path 2010"
          d="M38.209 697.791l3.081 3.054-3.081 2.946"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle
          data-name="Ellipse 582"
          cx={2}
          cy={2}
          r={2}
          transform="translate(17.209 698.791)"
          fill="#6f6f6f"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
