import * as React from 'react';
import Svg, {SvgProps, Path, Rect} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M5.539 0v5.538M18.462 0v5.538"
        stroke="#5372FF"
        strokeWidth={2}
      />
      <Rect
        x={1}
        y={2.846}
        width={22}
        height={20.154}
        rx={1}
        stroke="#5372FF"
        strokeWidth={2}
      />
      <Path stroke="#5372FF" strokeWidth={2} d="M1.846 8.231H24" />
      <Path
        fill="#5372FF"
        d="M3.692 11.077h3.692v3.692H3.692zM9.231 11.077h3.692v3.692H9.231z"
      />
    </Svg>
  );
}

export default SvgComponent;
