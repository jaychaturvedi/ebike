import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" {...props}>
      <G data-name="Group 1966" fill="none">
        <Path data-name="Rectangle 3024" d="M0 0h48v48H0z" />
        <G
          stroke="#5372ff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}>
          <Path
            data-name="Path 1352"
            d="M27.833 13.145H7.501a2.462 2.462 0 00-2.45 2.467v16.233a2.462 2.462 0 002.45 2.467h20.332a2.462 2.462 0 002.45-2.467V15.612a2.462 2.462 0 00-2.45-2.467zm0 0"
          />
          <Path
            data-name="Path 1353"
            d="M34.563 27.118l8.421 4.64v-16l-8.421 4.64zm0 0"
          />
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
