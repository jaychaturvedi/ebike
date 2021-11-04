import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" {...props}>
      <Path
        data-name="Path 1484"
        d="M7.461 2.002l2.438 2.453-6.175 6.21-2.44-2.454zm4.294-.591L10.666.317a1.077 1.077 0 00-1.526 0L8.099 1.365l2.44 2.453 1.216-1.222a.839.839 0 000-1.185zM.006 11.66a.278.278 0 00.336.332l2.72-.663L.623 8.876z"
        fill="#6f6f6f"
      />
    </Svg>
  );
}

export default SvgComponent;
