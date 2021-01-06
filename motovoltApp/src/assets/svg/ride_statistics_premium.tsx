import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80" {...props}>
      <G data-name="Group 2571" fill="none">
        <Path data-name="Rectangle 3157" d="M0 0h80v80H0z" />
        <G data-name="Group 2195" stroke="#5372ff" strokeWidth={5}>
          <Path data-name="Path 1395" d="M14.286 14.286v48.493h51.429" />
          <Path data-name="Path 1396" d="M28.572 22.858v31.428" />
          <Path data-name="Path 1397" d="M40.001 17.143v37.143" />
          <Path data-name="Path 1398" d="M51.429 40v14.285" />
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
