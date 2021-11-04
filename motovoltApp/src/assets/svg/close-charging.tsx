import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
      <Path d="M20 2L2 20M20 20L2 2" stroke="#fff" strokeWidth={4} />
    </Svg>
  );
}

export default SvgComponent;
