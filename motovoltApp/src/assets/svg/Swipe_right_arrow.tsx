import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      data-name="Group 2477"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <Path data-name="Path 1363" d="M0 0h24v24H0z" fill="none" />
      <Path
        data-name="Path 1364"
        d="M13.907 3.962l-1.645 1.864 4.587 4.887H2.697v2.634h14.152l-4.587 4.765 1.645 1.864 7.4-7.946z"
        fill="#333"
      />
    </Svg>
  );
}

export default SvgComponent;
