import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={34} height={23} viewBox="0 0 34 23" fill="none" {...props}>
      <Path
        d="M14.895 4.5c1.899-2.148 4.66-3.5 7.732-3.5C28.356 1 33 5.701 33 11.5S28.356 22 22.627 22C19.03 22 15.86 20.147 14 17.333"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M23 7v5.877L26 16M7 8h5M4 14h5M12 14h1M8 11h1M15 8h1M12 11h3M1 11h4"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
