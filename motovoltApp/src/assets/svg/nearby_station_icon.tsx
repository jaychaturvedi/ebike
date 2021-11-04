import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" {...props}>
      <G data-name="Group 2408">
        <Path
          data-name="Path 1471"
          d="M29.407 31.04v-25a2.782 2.782 0 00-2.777-2.778H12.74A2.782 2.782 0 009.963 6.04v25a2.781 2.781 0 00-2.778 2.778v2.087a.693.693 0 00.695.693h23.61a.693.693 0 00.7-.693v-2.086a2.781 2.781 0 00-2.783-2.779zm-3.733-15.635a.7.7 0 01-.695.695H14.424a.7.7 0 01-.695-.695V7.537a.7.7 0 01.695-.695h10.55a.7.7 0 01.695.695z"
          fill="none"
          stroke="#5372ff"
          strokeMiterlimit={10}
          strokeWidth={2.5}
        />
        <G data-name="Group 2409" fill="#5372ff">
          <Path
            data-name="Path 1472"
            d="M30.7 28.138a2.083 2.083 0 004.167 0V13.426a2.081 2.081 0 001.388-1.957V8.695a.694.694 0 10-1.388 0v.693h-1.389v-.693a.695.695 0 00-1.39 0v2.777a2.082 2.082 0 001.39 1.957v14.71a.695.695 0 01-1.39 0V26.75a2.077 2.077 0 00-1.388-1.955z"
            stroke="#5372ff"
            strokeWidth={0.5}
          />
          <Path
            data-name="Path 1473"
            d="M23.753 25.147l-4.167 6.945a.7.7 0 01-.6.337.716.716 0 01-.185-.025.694.694 0 01-.508-.668v-3.474h-2.08a.695.695 0 01-.6-1.052l4.167-6.945a.695.695 0 011.29.358v3.472h2.083a.695.695 0 01.6 1.052z"
          />
        </G>
        <Path data-name="Rectangle 3367" fill="none" d="M0 0h40v40H0z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
