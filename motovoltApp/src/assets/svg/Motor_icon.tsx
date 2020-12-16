import * as React from 'react';
import Svg, {Mask, Path, Rect, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={41} height={33} viewBox="0 0 41 33" fill="none" {...props}>
      <Mask id="prefix__a" fill="#fff">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 0a3 3 0 00-3 3v27a3 3 0 003 3h21.333a3 3 0 003-3v-1.258h1.206a3 3 0 003-3V7.258a3 3 0 00-3-3h-1.206V3a3 3 0 00-3-3H3z"
        />
      </Mask>
      <Path
        d="M27.333 28.742v-2h-2v2h2zm0-24.484h-2v2h2v-2zM2 3a1 1 0 011-1v-4a5 5 0 00-5 5h4zm0 27V3h-4v27h4zm1 1a1 1 0 01-1-1h-4a5 5 0 005 5v-4zm21.333 0H3v4h21.333v-4zm1-1a1 1 0 01-1 1v4a5 5 0 005-5h-4zm0-1.258V30h4v-1.258h-4zm3.206-2h-1.206v4h1.206v-4zm1-1a1 1 0 01-1 1v4a5 5 0 005-5h-4zm0-18.484v18.484h4V7.258h-4zm-1-1a1 1 0 011 1h4a5 5 0 00-5-5v4zm-1.206 0h1.206v-4h-1.206v4zm-2-3.258v1.258h4V3h-4zm-1-1a1 1 0 011 1h4a5 5 0 00-5-5v4zM3 2h21.333v-4H3v4z"
        fill="#5372FF"
        mask="url(#prefix__a)"
      />
      <Rect
        x={30.436}
        y={9.516}
        width={3.256}
        height={13.968}
        rx={1}
        stroke="#5372FF"
        strokeWidth={2}
      />
      <Rect
        x={36.744}
        y={11.645}
        width={3.256}
        height={9.71}
        rx={1}
        stroke="#5372FF"
        strokeWidth={2}
      />
      <Path
        stroke="#5372FF"
        strokeWidth={2}
        strokeLinecap="round"
        d="M8.359 7.516h11.667M8.359 11.774h11.667M8.359 16.032h11.667M8.359 20.29h11.667M8.359 24.548h11.667"
      />
      <Path d="M33.641 16.5h2.103" stroke="#5372FF" strokeWidth={2} />
      <Path
        stroke="#5372FF"
        strokeWidth={2}
        strokeLinecap="round"
        d="M26.231 5.258v17.161"
      />
    </Svg>
  );
}

export default SvgComponent;
