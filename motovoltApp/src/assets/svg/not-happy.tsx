import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={43} height={43} viewBox="0 0 43 43" fill="none" {...props}>
      <Path
        d="M21.305 41.61c11.214 0 20.305-9.09 20.305-20.305C41.61 10.091 32.52 1 21.305 1 10.091 1 1 10.09 1 21.305 1 32.519 10.09 41.61 21.305 41.61z"
        stroke="#E80A0A"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <Path
        d="M29.855 32.8c0-.072.023-.12.023-.19a8.57 8.57 0 00-8.573-8.574 8.57 8.57 0 00-8.573 8.573"
        stroke="#E80A0A"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <Path
        d="M14.323 17.933a2.779 2.779 0 100-5.557 2.779 2.779 0 000 5.557zM28.263 17.933a2.779 2.779 0 100-5.557 2.779 2.779 0 000 5.557z"
        stroke="#E80A0A"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
    </Svg>
  );
}

export default SvgComponent;
