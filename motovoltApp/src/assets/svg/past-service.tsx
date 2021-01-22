import * as React from 'react';
import Svg, {SvgProps, Rect, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={19} height={22} viewBox="0 0 19 22" fill="none" {...props}>
      <Rect
        x={1}
        y={1}
        width={17}
        height={20}
        rx={1}
        stroke="#5372FF"
        strokeWidth={2}
      />
      <Path stroke="#5372FF" strokeWidth={2} d="M4 6h11M4 11h11M4 16h11" />
    </Svg>
  );
}

export default SvgComponent;
