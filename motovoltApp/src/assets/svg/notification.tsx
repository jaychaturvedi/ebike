import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M11.882 22.5a1.989 1.989 0 001.99-1.99h-3.98a1.99 1.99 0 001.99 1.99zM18.762 16.32V10.5a6.873 6.873 0 00-5.29-6.69v-.72a1.59 1.59 0 10-3.18 0v.72A6.873 6.873 0 005 10.5v5.82l-2.12 2.12v1.06h18v-1.06l-2.118-2.12z"
        fill="#000"
      />
    </Svg>
  );
}

export default SvgComponent;
