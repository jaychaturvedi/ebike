import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G data-name="Group 2597">
        <G data-name="Group 2402">
          <Path
            data-name="Path 1306"
            d="M12 21.553a1.843 1.843 0 001.583-.888c2.382-3.9 5.22-9.032 5.22-11.368a6.803 6.803 0 00-13.607 0c0 2.337 2.839 7.472 5.22 11.368a1.843 1.843 0 001.584.888zM9.265 8.829A2.735 2.735 0 1112 11.564a2.738 2.738 0 01-2.735-2.735z"
            fill="#bc2074"
          />
        </G>
        <Path data-name="Rectangle 3360" fill="none" d="M0 0h24v24H0z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
