import * as React from 'react';
import Svg, {G, Circle, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={56} height={56} viewBox="0 0 56 56" {...props}>
      <G data-name="Group 2839" transform="translate(-160 -378)">
        <Circle
          data-name="Ellipse 465"
          cx={28}
          cy={28}
          r={28}
          transform="translate(160 378)"
          fill="#5372ff"
        />
        <G data-name="Group 2602">
          <Path data-name="Path 1532" d="M167.995 386h40v40h-40z" fill="none" />
          <Path
            data-name="Path 1533"
            d="M191.733 406.016l3.862 3.867a10.7 10.7 0 00.017-7.742zm8.817-8.825l-2.108 2.108a14.527 14.527 0 010 13.417l2 2a16.585 16.585 0 00.108-17.525zm-6.375 1.65l-9.508-9.508H183v12.642l-7.642-7.642-2.363 2.358 9.308 9.308-9.308 9.309 2.358 2.358 7.642-7.642v12.642h1.667l9.508-9.508-7.15-7.158zm-7.842-3.125l3.133 3.133-3.133 3.125zm3.133 17.442l-3.133 3.125v-6.267z"
            fill="#fff"
          />
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
