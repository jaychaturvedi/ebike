import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={68} height={68} viewBox="0 0 68 68" fill="none" {...props}>
      <Circle cx={34} cy={34} r={34} fill="#3C5BE8" />
      <Path d="M34 24v20M24 34h20" stroke="#fff" strokeWidth={3} />
    </Svg>
  );
}

export default SvgComponent;
