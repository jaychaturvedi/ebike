import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      data-name="Group 2146"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      {...props}>
      <Path data-name="Path 1373" d="M0 0h32v32H0z" fill="none" />
      <Path
        data-name="Path 1374"
        d="M1.333 28.666h29.333L16 3.333zm16-4h-2.667V22h2.667zm0-5.333h-2.667V14h2.667z"
        fill="#ff6753"
      />
    </Svg>
  );
}

export default SvgComponent;
