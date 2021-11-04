import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={30} height={39} viewBox="0 0 30 39" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 14.986C0 6.709 6.715 0 15 0s15 6.709 15 14.986c0 3.88-1.273 6.955-3.756 9.919L15 38.998 3.794 24.948C1.373 22.287 0 18.865 0 14.985zm21.932-2.01a4.692 4.692 0 01-1.199 4.578 4.702 4.702 0 01-4.79 1.14.201.201 0 00-.21.047l-3.897 3.896a1.998 1.998 0 11-2.826-2.826l3.896-3.896a.206.206 0 00.047-.211 4.698 4.698 0 011.136-4.793 4.692 4.692 0 014.58-1.2.214.214 0 01.1.36l-2.565 2.564a.214.214 0 000 .302l2.502 2.503c.085.084.22.081.303 0l2.564-2.566c.117-.116.312-.06.36.101z"
        fill="#45A7DE"
      />
    </Svg>
  );
}

export default SvgComponent;
