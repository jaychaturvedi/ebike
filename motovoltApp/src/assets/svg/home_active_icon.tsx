import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      data-name="home-24px (1)"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      {...props}>
      <Path data-name="Path 1393" d="M0 0h28v28H0z" fill="none" />
      <Path
        data-name="Path 1394"
        d="M14 6.638l5.833 5.25V21H17.5v-7h-7v7H8.166v-9.112l5.833-5.25m0-3.138L2.333 14h3.5v9.333h7v-7h2.333v7h7V14h3.5z"
      />
    </Svg>
  );
}

export default SvgComponent;
