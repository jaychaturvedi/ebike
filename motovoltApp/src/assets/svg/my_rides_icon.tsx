import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" {...props}>
      <G data-name="Group 2196" fill="none">
        <Path data-name="Rectangle 3157" d="M0 0h28v28H0z" />
        <G data-name="Group 2195" stroke="#707070" strokeWidth={2}>
          <Path data-name="Path 1395" d="M5 5v16.973h18" />
          <Path data-name="Path 1396" d="M10 7.999v11" />
          <Path data-name="Path 1397" d="M14 5.999v13" />
          <Path data-name="Path 1398" d="M18 13.999v5" />
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
