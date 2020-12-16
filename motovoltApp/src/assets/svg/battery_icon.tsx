import * as React from 'react';
import Svg, {Mask, Path, Rect, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={18} height={33} viewBox="0 0 18 33" fill="none" {...props}>
      <Mask id="prefix__a" fill="#fff">
        <Path d="M0 5a3 3 0 013-3h12a3 3 0 013 3v25a3 3 0 01-3 3H3a3 3 0 01-3-3V5z" />
      </Mask>
      <Path
        d="M3 4h12V0H3v4zm13 1v25h4V5h-4zm-1 26H3v4h12v-4zM2 30V5h-4v25h4zm1 1a1 1 0 01-1-1h-4a5 5 0 005 5v-4zm13-1a1 1 0 01-1 1v4a5 5 0 005-5h-4zM15 4a1 1 0 011 1h4a5 5 0 00-5-5v4zM3 0a5 5 0 00-5 5h4a1 1 0 011-1V0z"
        fill="#5372FF"
        mask="url(#prefix__a)"
      />
      <Mask id="prefix__b" fill="#fff">
        <Rect x={5} width={8} height={3} rx={1} />
      </Mask>
      <Rect
        x={5}
        width={8}
        height={3}
        rx={1}
        stroke="#5372FF"
        strokeWidth={3}
        mask="url(#prefix__b)"
      />
      <Path
        stroke="#5372FF"
        strokeWidth={2}
        strokeLinecap="round"
        d="M6 9h6M6 13h6M6 17h6M6 21h6M6 25h6"
      />
    </Svg>
  );
}

export default SvgComponent;
