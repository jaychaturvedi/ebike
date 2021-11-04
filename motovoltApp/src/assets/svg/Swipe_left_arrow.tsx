import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G data-name="Group 2477">
        <Path data-name="Path 1363" d="M24 0H0v24h24z" fill="none" />
        <Path
          data-name="Path 1364"
          d="M9.821 2.022l1.88 2.319-5.238 6.08h16.158v3.278H6.463l5.238 5.928-1.88 2.32-8.444-9.887z"
          fill="#333"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
