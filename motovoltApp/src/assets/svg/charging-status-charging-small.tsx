import * as React from 'react';
import Svg, {Path, Rect, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={40} viewBox="0 0 24 40" fill="none" {...props}>
      <Path
        d="M19.497 38.33H4.515a2.863 2.863 0 01-2.855-2.87V8.27a2.863 2.863 0 012.855-2.872h14.982a2.863 2.863 0 012.854 2.871V35.47c-.01 1.58-1.283 2.86-2.854 2.86zM7.491 4.051A2.378 2.378 0 019.859 1.67h4.271a2.378 2.378 0 012.368 2.382"
        stroke="#fff"
        strokeWidth={3}
        strokeMiterlimit={10}
      />
      <Rect
        x={18}
        y={13}
        width={12}
        height={2}
        rx={1}
        transform="rotate(-180 18 13)"
        fill="#fff"
      />
      <Rect
        x={18}
        y={18}
        width={12}
        height={2}
        rx={1}
        transform="rotate(-180 18 18)"
        fill="#fff"
        fillOpacity={0.7}
      />
      <Rect
        x={18}
        y={23}
        width={12}
        height={2}
        rx={1}
        transform="rotate(-180 18 23)"
        fill="#fff"
        fillOpacity={0.4}
      />
      <Rect
        x={18}
        y={28}
        width={12}
        height={2}
        rx={1}
        transform="rotate(-180 18 28)"
        fill="#fff"
        fillOpacity={0.2}
      />
      <Rect
        x={18}
        y={33}
        width={12}
        height={2}
        rx={1}
        transform="rotate(-180 18 33)"
        fill="#fff"
        fillOpacity={0.1}
      />
    </Svg>
  );
}

export default SvgComponent;
