import * as React from 'react';
import Svg, {Path, Rect, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={58} height={98} viewBox="0 0 58 98" fill="none" {...props}>
      <Path
        d="M47.869 95.222H10.18C6.23 95.222 3 92.002 3 87.998V19.602c0-3.976 3.2-7.223 7.181-7.223H47.87c3.952 0 7.181 3.22 7.181 7.223v68.424c-.028 3.976-3.229 7.196-7.181 7.196zM17.669 8.991C17.669 5.688 20.34 3 23.625 3h10.744c3.285 0 5.956 2.688 5.956 5.991"
        stroke="#fff"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Rect
        x={46}
        y={30}
        width={34}
        height={5}
        rx={2.5}
        transform="rotate(-180 46 30)"
        fill="#fff"
      />
      <Rect
        x={46}
        y={43}
        width={34}
        height={5}
        rx={2.5}
        transform="rotate(-180 46 43)"
        fill="#fff"
        fillOpacity={0.7}
      />
      <Rect
        x={46}
        y={56}
        width={34}
        height={5}
        rx={2.5}
        transform="rotate(-180 46 56)"
        fill="#fff"
        fillOpacity={0.4}
      />
      <Rect
        x={46}
        y={69}
        width={34}
        height={5}
        rx={2.5}
        transform="rotate(-180 46 69)"
        fill="#fff"
        fillOpacity={0.2}
      />
      <Rect
        x={46}
        y={82}
        width={34}
        height={5}
        rx={2.5}
        transform="rotate(-180 46 82)"
        fill="#fff"
        fillOpacity={0.1}
      />
    </Svg>
  );
}

export default SvgComponent;
