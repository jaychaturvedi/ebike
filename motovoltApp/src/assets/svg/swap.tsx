import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={65} height={42} viewBox="0 0 65 42" fill="none" {...props}>
      <Path
        d="M25 19l-.416 4L21 22.535M36 13l.416-4L40 9.465"
        stroke="#5372FF"
        strokeWidth={2.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M44.555 16.333h3.435c1.212 0 2.192 1.028 2.192 2.288v16.425c0 1.264-.985 2.287-2.192 2.287H13.452c-1.203.005-2.18-1.023-2.18-2.287V18.62c0-1.265.977-2.288 2.18-2.288h3.29M51.409 23.423h1.616c.47 0 .852.728.852 1.621v4.027c0 .894-.382 1.621-.852 1.621h-1.616"
        stroke="#5372FF"
        strokeWidth={2.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <Path
        d="M24.019 23c-3.29-2.983-4.033-7.845-1.524-11.646C24.969 7.61 29.791 6.116 34 7.519M37.396 10c2.89 2.851 3.498 7.337 1.2 10.86-2.28 3.498-6.69 4.93-10.596 3.713"
        stroke="#5372FF"
        strokeWidth={2.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
