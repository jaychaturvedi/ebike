import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      data-name="Group 2560"
      width={40}
      height={40}
      viewBox="0 0 40 40"
      {...props}>
      <Path data-name="Path 913" d="M0 0h40v40H0z" fill="none" />
      <Path
        data-name="Path 914"
        d="M21.667 5h-3.334v16.667h3.333zm8.058 3.608l-2.358 2.359a11.667 11.667 0 11-14.733 0l-2.359-2.359a15 15 0 1019.45 0z"
        fill="#5372ff"
      />
    </Svg>
  );
}

export default SvgComponent;
