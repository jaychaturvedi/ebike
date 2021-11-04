import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      data-name="thumb_up-24px (1)"
      width={125.391}
      height={125.391}
      viewBox="0 0 125.391 125.391"
      {...props}>
      <Path data-name="Path 1998" d="M0 0h125.391v125.391H0z" fill="none" />
      <Path
        data-name="Path 1999"
        d="M5.225 109.717h20.9V47.025h-20.9zm114.941-57.471a10.48 10.48 0 00-10.449-10.449H76.75l4.963-23.872.157-1.672a7.865 7.865 0 00-2.3-5.538l-5.537-5.49-34.378 34.43a10.216 10.216 0 00-3.082 7.37v52.243a10.48 10.48 0 0010.452 10.449h47.018a10.379 10.379 0 009.613-6.374l15.779-36.833a10.322 10.322 0 00.731-3.814z"
        fill="#f0f0f0"
      />
    </Svg>
  );
}

export default SvgComponent;
