import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" {...props}>
      <G data-name="Group 2399">
        <G data-name="Group 1855">
          <Path
            data-name="Path 1309"
            d="M28.206 6.231h-2.11V4.958a1.775 1.775 0 00-1.777-1.775h-8.64a1.774 1.774 0 00-1.773 1.775v1.273h-2.11a2.555 2.555 0 00-2.555 2.552v25.07a2.553 2.553 0 002.555 2.548h16.41a2.553 2.553 0 002.552-2.548V8.783a2.555 2.555 0 00-2.552-2.552z"
            fill="none"
            stroke="#5372ff"
            strokeLinejoin="round"
            strokeWidth={2.5}
          />
          <Path
            data-name="Path 1474"
            d="M23.754 19.147l-4.167 6.945a.7.7 0 01-.6.337.716.716 0 01-.185-.025.694.694 0 01-.508-.668v-3.474h-2.08a.695.695 0 01-.6-1.052l4.167-6.945a.695.695 0 011.29.358v3.472h2.083a.695.695 0 01.6 1.052z"
            fill="#5372ff"
          />
        </G>
        <Path data-name="Rectangle 3361" fill="none" d="M0 0h40v40H0z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
