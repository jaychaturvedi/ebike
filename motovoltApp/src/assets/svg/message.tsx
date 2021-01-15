import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M5 5.5h8m-8 3h8M1 3a2 2 0 012-2h12a2 2 0 012 2v8.571a2 2 0 01-2 2H8.694L6.714 17l-1.98-3.429H3a2 2 0 01-2-2V3z"
        stroke="#6D6D6D"
      />
    </Svg>
  );
}

export default SvgComponent;
