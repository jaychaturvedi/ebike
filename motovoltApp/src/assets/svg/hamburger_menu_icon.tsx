import * as React from 'react';
import Svg, {Path, G, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      data-name="Group 1650"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      {...props}>
      <Path fill="none" d="M0 0h28v28H0z" />
      <Path
        data-name="Path 417"
        d="M2.333 21.389h23.333v-2.593H2.333zm0-6.482h23.333v-2.593H2.333zm0-9.074v2.593h23.333V5.833z"
        fill="#6f6f6f"
      />
      <G data-name="Group 900">
        <Path data-name="Path 984" d="M0 0h28v28H0z" fill="none" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
