import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" {...props}>
      <G data-name="Group 2397">
        <Path data-name="Rectangle 3016" fill="none" d="M0 0h40v40H0z" />
        <G data-name="Group 1858">
          <G data-name="Group 1857">
            <Path
              data-name="Path 1311"
              d="M28.855 22.99h-2.578a6.706 6.706 0 01.406 2.3v9.743a2.87 2.87 0 01-.166.962h4.266a2.89 2.89 0 002.887-2.887v-5.311a4.817 4.817 0 00-4.815-4.807z"
              fill="none"
              stroke="#5372ff"
              strokeWidth={2.5}
            />
          </G>
        </G>
        <G data-name="Group 1862">
          <G data-name="Group 1861">
            <Path
              data-name="Path 1313"
              d="M17.946 20.483h-5.893a4.817 4.817 0 00-4.812 4.812v9.743a.962.962 0 00.962.962h13.592a.962.962 0 00.962-.962v-9.743a4.817 4.817 0 00-4.811-4.812z"
              fill="none"
              stroke="#5372ff"
              strokeWidth={2.5}
            />
          </G>
        </G>
        <G data-name="Group 1864">
          <G data-name="Group 1863">
            <Path
              data-name="Path 1314"
              d="M14.999 4a5.786 5.786 0 105.787 5.787A5.793 5.793 0 0014.999 4z"
              fill="none"
              stroke="#5372ff"
              strokeWidth={2.5}
            />
          </G>
        </G>
        <G data-name="Group 1868">
          <G data-name="Group 1867">
            <Path
              data-name="Path 1316"
              d="M28.162 9.868a4.328 4.328 0 104.328 4.328 4.333 4.333 0 00-4.328-4.328z"
              fill="none"
              stroke="#5372ff"
              strokeWidth={2.5}
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
