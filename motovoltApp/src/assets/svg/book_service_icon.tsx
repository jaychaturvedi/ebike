import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" {...props}>
      <G data-name="Group 2343">
        <G data-name="Group 2342" fill="#5372ff" stroke="#5372ff">
          <Path
            data-name="Path 1447"
            d="M10.986 37.134a3.081 3.081 0 114.357 0 3.083 3.083 0 01-4.357 0zm3.634-3.631a2.054 2.054 0 100 2.9 2.056 2.056 0 000-2.9z"
          />
          <Path
            data-name="Path 1448"
            d="M8.076 40.043a7.185 7.185 0 015.152-12.272l12.918-12.922a7.9 7.9 0 0110.762-8.112l1.022.4-5.184 5.184.382 2.67 2.67.382 5.182-5.184.4 1.024a7.9 7.9 0 01-8.114 10.758l-12.92 12.924a7.187 7.187 0 01-12.27 5.148zm27.2-32.29a6.464 6.464 0 00-7.664 7.258l.05.356-13.864 13.868-.322-.018a5.756 5.756 0 105.426 5.426l-.016-.322 13.868-13.868.356.05a6.46 6.46 0 007.256-7.664l-4.058 4.056-4.45-.636-.636-4.452z"
            strokeLinejoin="round"
          />
          <Path
            data-name="Path 1449"
            d="M20.857 27.83l-.552-.554a.786.786 0 010-1.108l4.409-4.433a.779.779 0 011.1 0l.55.554a.786.786 0 010 1.108l-4.409 4.433a.778.778 0 01-1.098 0zm4.409-5.541l-4.409 4.434.55.554 4.41-4.432z"
          />
        </G>
        <Path data-name="Rectangle 3323" fill="none" d="M0 0h48v48H0z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
