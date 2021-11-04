import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" {...props}>
      <G data-name="Group 2074">
        <G data-name="rupee (1)">
          <G data-name="Group 1549">
            <Path
              data-name="Path 1285"
              d="M22.921 11.049h-3.088a6.021 6.021 0 00-2.438-4.218h5.526a.607.607 0 00.608-.6.607.607 0 00-.608-.6H10.057a.607.607 0 00-.608.6.607.607 0 00.608.6h3.684a4.9 4.9 0 014.87 4.218h-8.554a.602.602 0 100 1.205h8.554a4.906 4.906 0 01-4.87 4.278h-3.678a.612.612 0 00-.419 1.054l9.2 8.622a.608.608 0 10.833-.886l-8.093-7.585h2.152a6.12 6.12 0 006.1-5.483h3.088a.602.602 0 100-1.205z"
              fill="#5372ff"
              stroke="#5372ff"
              strokeWidth={0.5}
            />
          </G>
        </G>
        <Path data-name="Rectangle 2843" fill="none" d="M0 0h32v32H0z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
