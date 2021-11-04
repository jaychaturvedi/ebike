import * as React from 'react';
import Svg, {Path, G, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      data-name="Group 1595"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <Path data-name="Path 902" d="M0 0h24v24H0z" fill="none" />
      <G data-name="Group 789">
        <Path
          data-name="Path 903"
          d="M11.882 22.5a1.989 1.989 0 001.99-1.99h-3.98a1.989 1.989 0 001.99 1.99z"
        />
        <Path
          data-name="Path 904"
          d="M18.762 16.32V10.5a6.873 6.873 0 00-5.29-6.69v-.72a1.59 1.59 0 00-3.18 0v.72A6.873 6.873 0 005 10.5v5.82l-2.12 2.12v1.06h18v-1.06z"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
