import * as React from 'react';
import Svg, {Path, Circle, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={20} height={15} viewBox="0 0 20 15" fill="none" {...props}>
      <Path
        d="M3.45 6.107h5.53M3.45 8.893h5.53m4.287-7.656A.763.763 0 0012.723 1H1.816C1.366 1 1 1.416 1 1.929V13.07c0 .513.366.929.816.929h10.906a.763.763 0 00.546-.237l2.73-2.786 1.365-1.393 1.366-1.393a1.016 1.016 0 000-1.382l-5.461-5.572z"
        stroke="#6D6D6D"
      />
      <Circle cx={12.5} cy={7.5} r={2} stroke="#6D6D6D" />
    </Svg>
  );
}

export default SvgComponent;
