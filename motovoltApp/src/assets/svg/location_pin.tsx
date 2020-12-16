import * as React from 'react';
import Svg, {G, Path, Ellipse, Defs, SvgProps} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={42}
      height={55}
      viewBox="0 0 42 55"
      fill="none"
      {...props}>
      <G>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32.996 26.56a16.839 16.839 0 001.825-7.65C34.821 9.571 27.25 2 17.911 2 8.57 2 1 9.571 1 18.91c0 2.754.658 5.353 1.825 7.65h-.024l.104.155a16.942 16.942 0 002.115 3.141L17.91 49l12.891-19.144a16.94 16.94 0 002.115-3.14l.104-.155h-.024z"
          fill="#C01214"
        />
      </G>
      <Ellipse cx={18} cy={18.5} rx={12} ry={11.5} fill="#fff" />
      <Path
        d="M18 13v11m0 0l-5-4.364M18 24l5-4.364"
        stroke="#C01214"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs></Defs>
    </Svg>
  );
}

export default SvgComponent;
