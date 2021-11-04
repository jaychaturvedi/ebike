import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" {...props}>
      <G data-name="Group 2406">
        <G data-name="Group 1834">
          <Path data-name="Rectangle 3009" fill="none" d="M0 0h40v40H0z" />
          <G data-name="Group 1833">
            <Path
              data-name="Path 1292"
              d="M33.989 29.559l2.138-13.289-8.775 1.918-7.626-8.335-9.31 14.305 9.311 5.4zm0 0"
              fill="#133cf2"
            />
            <Path
              data-name="Path 1293"
              d="M19.783 9.853l-7.671 8.335-8.827-1.918 2.151 13.289h14.347zm0 0"
              fill="#0889f7"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
