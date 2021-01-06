import React from 'react';
import Svg, {Path, G, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={480} height={937} viewBox="0 0 480 937" fill="none" {...props}>
      <Path fill="#3B68C9" d="M480 937H0V0h480z" />
      <G opacity={0.5}>
        <Path
          opacity={0.2}
          d="M481 549.761C481 499 428 462 337.809 467.498 154 450 199 198.389 1 198.389V937h480V549.761z"
          fill="#000"
        />
      </G>
      <Path
        opacity={0.5}
        d="M275.614 650.578c-94.949 60.716-181.98-41.247-226.825-92.8C32.504 539.062 15.964 529.481 0 526v411h480V612.868c-61.483-27.322-121.779-15.151-204.386 37.71z"
        fill="#000"
        fillOpacity={0.1}
      />
    </Svg>
  );
}

export default SvgComponent;
