import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      data-name="Group 2102"
      width={56}
      height={56}
      viewBox="0 0 56 56"
      {...props}>
      <Path
        data-name="Path 1359"
        d="M27.989 4.667A23.333 23.333 0 1051.334 28 23.317 23.317 0 0027.989 4.667zm.012 42A18.667 18.667 0 1146.667 28 18.662 18.662 0 0128 46.667z"
        fill="#5372ff"
      />
      <Path
        data-name="Path 1361"
        d="M28 17.171v14.3H17.145"
        fill="none"
        stroke="#5372ff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
      />
      <Path d="M0 0h56v56H0z" fill="none" />
    </Svg>
  );
}

export default SvgComponent;
