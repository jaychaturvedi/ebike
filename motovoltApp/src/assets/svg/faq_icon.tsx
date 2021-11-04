import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      data-name="Group 2348"
      width={40}
      height={40}
      viewBox="0 0 40 40"
      {...props}>
      <G data-name="Group 2520">
        <G data-name="Group 2345">
          <G data-name="Group 2344">
            <Path
              data-name="Path 1450"
              d="M31.935 5.097H8.066a4.77 4.77 0 00-4.765 4.765v16.109a4.77 4.77 0 004.765 4.765h1.87l.035 4.206a1.021 1.021 0 001.646.8l6.484-5.006h13.834a4.77 4.77 0 004.766-4.765V9.862a4.77 4.77 0 00-4.766-4.765zm2.722 20.874a2.726 2.726 0 01-2.722 2.726h-14.18a1.029 1.029 0 00-.625.212l-5.134 3.963-.028-3.164a1.019 1.019 0 00-1.021-1.011H8.066a2.726 2.726 0 01-2.722-2.724V9.862A2.725 2.725 0 018.066 7.14h23.869a2.726 2.726 0 012.724 2.722v16.109z"
              fill="#5372ff"
              stroke="#5372ff"
            />
          </G>
        </G>
        <G data-name="Group 2346">
          <Path
            data-name="Path 1451"
            d="M29.895 17.157h-19.79a1.322 1.322 0 01-1.238-1.391 1.322 1.322 0 011.238-1.392h19.79a1.322 1.322 0 011.238 1.392 1.322 1.322 0 01-1.238 1.391z"
            fill="#5372ff"
          />
        </G>
        <G data-name="Group 2347">
          <Path
            data-name="Path 1452"
            d="M24.946 22.786H10.103a1.321 1.321 0 01-1.236-1.391 1.321 1.321 0 011.236-1.392h14.843a1.322 1.322 0 011.238 1.392 1.322 1.322 0 01-1.238 1.391z"
            fill="#5372ff"
          />
        </G>
      </G>
      <Path data-name="Rectangle 3324" fill="none" d="M0 0h40v40H0z" />
    </Svg>
  );
}

export default SvgComponent;
