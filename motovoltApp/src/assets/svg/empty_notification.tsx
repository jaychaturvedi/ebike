import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={86} height={86} viewBox="0 0 86 86" fill="none" {...props}>
      <Path
        d="M12 66c10.52-7.42 8.87-11.658 8.87-27.026s11.66-19.333 11.66-19.333l.004-2.025c0-3.655 3.099-6.616 6.92-6.616 3.821 0 6.92 2.961 6.92 6.616l-.006 2.053s11.761 3.94 11.761 19.305S56.483 58.581 67 66M68 67H11M59 57H20M48 67c0 4.972-3.583 9-7.998 9C35.585 76 32 71.972 32 67M9.557 36C6.86 24.32 14.218 12.676 26 10M69.06 36C72.595 24.515 65.852 12.427 54 9M84 2L2 84"
        stroke="#5372FF"
        strokeWidth={4}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
