import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      data-name="Group 2598"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        data-name="Path 1527"
        d="M19 8l-4 4h3a6 6 0 01-8.805 5.305l-1.46 1.46A8 8 0 0020 12h3zM6 12a6 6 0 018.805-5.3l1.46-1.46A8 8 0 004 12H1l4 4 4-4z"
      />
      <Path data-name="Path 1528" d="M0 0h24v24H0z" fill="none" />
    </Svg>
  );
}

export default SvgComponent;
