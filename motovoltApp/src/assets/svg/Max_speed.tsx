import * as React from 'react';
import Svg, {G, Path, Circle, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      data-name="Group 2202"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      {...props}>
      <G
        data-name="Group 2201"
        transform="translate(2.573 2.667)"
        fill="#5372ff">
        <Path
          data-name="Path 1428"
          d="M21.642 18.058a.443.443 0 00-.147-.392l-.119-.076-9.537-6.133a1.739 1.739 0 00-.813-.355 1.782 1.782 0 00-.905 3.427l.031.009 10.983 3.891a.446.446 0 00.507-.371z"
        />
        <Path
          data-name="Path 1429"
          d="M3.915 22.756A13.323 13.323 0 0113.333 0c7.86 0 13.219 6.952 13.337 13.333a13.884 13.884 0 01-3.905 9.428L20.85 20.89a10.846 10.846 0 002.72-4.567 12.616 12.616 0 00.427-2.989 10.667 10.667 0 10-18.2 7.544"
        />
        <Circle
          data-name="Ellipse 415"
          cx={0.73}
          cy={0.73}
          r={0.73}
          transform="translate(12.604 13.464)"
        />
      </G>
      <Path data-name="Rectangle 3166" fill="none" d="M0 0h32v32H0z" />
    </Svg>
  );
}

export default SvgComponent;
