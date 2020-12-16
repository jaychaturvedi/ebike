import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      data-name="Group 791"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        data-name="Path 905"
        d="M20 6h-2.185A2.968 2.968 0 0015 2a2.991 2.991 0 00-2.5 1.345l-.5.68-.5-.68A3 3 0 006 5a2.908 2.908 0 00.185 1H4a1.991 1.991 0 00-1.99 2L2 19a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2zm-5-2a1 1 0 11-1 1 1 1 0 011-1zM9 4a1 1 0 11-1 1 1 1 0 011-1zm11 15H4v-2h16zm0-5H4V8h5.08L7 10.835 8.625 12 11 8.765l1-1.36 1 1.36L15.375 12 17 10.835 14.92 8H20z"
      />
      <Path data-name="Path 906" d="M0 0h24v24H0z" fill="none" />
    </Svg>
  );
}

export default SvgComponent;
