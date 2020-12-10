import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80" {...props}>
      <Path data-name="Path 1377" d="M0 0h80v80H0z" fill="none" />
      <Path
        data-name="Path 1378"
        d="M58.55 27.507h-3.092v-6.186a15.458 15.458 0 10-30.916 0v6.186h-3.091a6.2 6.2 0 00-6.183 6.186v30.928a6.2 6.2 0 006.183 6.186h37.1a6.2 6.2 0 006.183-6.186V33.693a6.2 6.2 0 00-6.184-6.186zM40 55.342a6.186 6.186 0 116.184-6.185A6.2 6.2 0 0140 55.342zm9.584-27.835H30.417v-6.186a9.584 9.584 0 1119.168 0z"
        fill="none"
        stroke="#5372ff"
        strokeWidth={4}
      />
    </Svg>
  );
}

export default SvgComponent;
