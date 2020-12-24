import * as React from 'react';
import Svg, {Circle, G, Path, Defs, ClipPath, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={49} height={49} viewBox="0 0 49 49" fill="none" {...props}>
      <Circle cx={24.5} cy={24.5} r={24.5} fill="#000" fillOpacity={0.05} />
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M32.207 11.343a.494.494 0 00-.578-.333l-2.633.76-.436.124-2.917.842a.755.755 0 00-.52.935l1.955 6.627c.115.4.54.629.946.514l.982-.28a18.262 18.262 0 01-5.434 9.817l-.368-1.252a.766.766 0 00-.946-.515l-6.706 1.929a.755.755 0 00-.52.935l.936 3.186s.457 1.658.751 2.692l.126.349c.095.254.379.39.636.3.016-.004.032-.01.042-.015l.563-.197.005.02c10.773-3.726 17.064-15.087 14.226-26.064l-.11-.374z"
          fill="#142F6A"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" transform="translate(15 11)" d="M0 0h18v27H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
