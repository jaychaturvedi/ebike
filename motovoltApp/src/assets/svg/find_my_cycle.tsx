import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80" {...props}>
      <G data-name="Group 2187">
        <Path data-name="Rectangle 3025" fill="none" d="M0 0h80v80H0z" />
        <G data-name="Group 1972">
          <Path
            data-name="Path 1354"
            d="M62.922 30.214a16 16 0 00-5.79 1.079 45.791 45.791 0 01-3.232-9.552 10.624 10.624 0 00-10.4-8.566 2.324 2.324 0 000 4.647 5.919 5.919 0 011.6.22 6 6 0 013.641 2.906 2.3 2.3 0 00-.174.251l-.719 1.215-3.64 6.149H24.762l-1.105-2.792h.459a2.324 2.324 0 000-4.647H16.13a2.324 2.324 0 000 4.647h2.542l2.021 5.1a16.19 16.19 0 1011.4 17.847h4.253a2.315 2.315 0 001.991-1.137l12.171-20.558a62.084 62.084 0 002.571 6.56 16.11 16.11 0 109.843-3.372zM16.13 48.722h11.263a11.536 11.536 0 110-4.647H16.13a2.324 2.324 0 000 4.647zm18.9-4.647h-2.937a16.18 16.18 0 00-4.978-9.515 2.333 2.333 0 00-.088-.278l-.427-1.071h14.859zm27.894 13.86a11.539 11.539 0 01-7.746-20.054 102.965 102.965 0 005.84 9.838 2.319 2.319 0 103.812-2.64 101.675 101.675 0 01-5.659-9.582 11.408 11.408 0 013.753-.634 11.537 11.537 0 010 23.073z"
            fill="#5372ff"
          />
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;