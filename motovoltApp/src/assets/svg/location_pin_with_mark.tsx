import * as React from 'react';
import Svg, {G, Ellipse, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={48} height={56} viewBox="0 0 48 56" {...props}>
      <G data-name="Group 2600">
        <G
          data-name="Ellipse 461"
          transform="translate(8 23)"
          fill="rgba(188,32,116,0.2)"
          stroke="#fc91b6"
          strokeWidth={0.25}>
          <Ellipse cx={16} cy={16.5} rx={16} ry={16.5} stroke="none" />
          <Ellipse cx={16} cy={16.5} rx={15.875} ry={16.375} fill="none" />
        </G>
        <G data-name="Group 2596">
          <G data-name="Group 2402">
            <Path
              data-name="Path 1306"
              d="M24.001 42.528a3.836 3.836 0 003.253-1.733c4.9-7.6 10.732-17.619 10.732-22.178.001-7.318-6.273-13.272-13.985-13.272s-13.987 5.954-13.987 13.273c0 4.559 5.836 14.576 10.732 22.178a3.836 3.836 0 003.255 1.732zm-5.622-24.821a5.63 5.63 0 0111.244 0 5.63 5.63 0 01-11.244 0z"
              fill="#bc2074"
            />
          </G>
          <Path data-name="Rectangle 3360" fill="none" d="M0 0h48v48H0z" />
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
