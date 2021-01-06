import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80" {...props}>
      <G data-name="Group 2573">
        <Path data-name="Rectangle 3510" fill="none" d="M0 0h80v80H0z" />
        <G data-name="Group 2572" fill="#5372ff" stroke="#5372ff">
          <Path
            data-name="Path 1518"
            d="M26.01 48.777h31.84a1.756 1.756 0 001.687-1.273l7.023-24.577a1.754 1.754 0 00-1.69-2.237H21.964l-1.257-5.65a1.752 1.752 0 00-1.712-1.373H8.46a1.755 1.755 0 000 3.51h9.127c.22 1 6 27.027 6.337 28.523a5.267 5.267 0 002.093 10.1H57.85a1.757 1.757 0 000-3.513H26.017a1.755 1.755 0 01-.007-3.51zM62.544 24.2l-6.02 21.067h-29.1L22.744 24.2z"
          />
          <Path
            data-name="Path 1519"
            d="M24.26 61.067a5.267 5.267 0 105.267-5.267 5.274 5.274 0 00-5.267 5.267zm5.267-1.757a1.755 1.755 0 11-1.757 1.757 1.759 1.759 0 011.757-1.757z"
          />
          <Path
            data-name="Path 1520"
            d="M49.07 61.067a5.267 5.267 0 105.267-5.267 5.274 5.274 0 00-5.267 5.267zm5.267-1.757a1.755 1.755 0 11-1.753 1.757 1.757 1.757 0 011.753-1.757z"
          />
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
