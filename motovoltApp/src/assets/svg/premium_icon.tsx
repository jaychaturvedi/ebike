import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G data-name="Group 2406">
        <G data-name="Group 1834">
          <Path data-name="Rectangle 3009" fill="none" d="M0 0h24v24H0z" />
          <G data-name="Group 1833">
            <Path
              data-name="Path 1292"
              d="M20.698 18l1.3-8.093-5.343 1.168-4.644-5.076-5.668 8.712L12.013 18zm0 0"
              fill="#ffc40f"
            />
            <Path
              data-name="Path 1293"
              d="M12.047 6l-4.671 5.076-5.375-1.168 1.31 8.093h8.737zm0 0"
              fill="#ffd959"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
