import * as React from 'react';
import Svg, {G, Path, Circle, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" {...props}>
      <G data-name="Group 2870" transform="translate(.001 -.031)">
        <G data-name="Group 823">
          <Path
            data-name="Path 928"
            d="M14.643 8.035a.429.429 0 01-.429.429h-.643a.429.429 0 110-.857h.643a.429.429 0 01.429.428zM8 2.892a.429.429 0 00.429-.429V1.82a.429.429 0 10-.857 0v.643A.429.429 0 008 2.892zm4.237 1.507l.457-.457a.429.429 0 00-.606-.607l-.457.457a.429.429 0 00.606.606zm-8.484 0a.429.429 0 00.606-.606l-.457-.457a.429.429 0 00-.606.606zM2.428 7.633h-.642a.429.429 0 000 .857h.643a.429.429 0 000-.857zm9.818 4.054a.429.429 0 00-.606.606l.457.457a.429.429 0 00.606-.606zM8 13.178a.429.429 0 00-.429.429v.643a.429.429 0 00.857 0v-.643a.429.429 0 00-.429-.429zm-4.25-1.495l-.457.457a.429.429 0 00.606.607l.457-.457a.429.429 0 00-.606-.606zm8.857-3.635a4.594 4.594 0 11-4.594-4.593 4.6 4.6 0 014.593 4.593zm-.857 0a3.737 3.737 0 10-3.737 3.737 3.742 3.742 0 003.737-3.737z"
            fill="#f89406"
          />
        </G>
        <Path
          data-name="Rectangle 2225"
          fill="none"
          d="M-.001.031h16v16h-16z"
        />
        <Circle
          data-name="Ellipse 575"
          cx={4}
          cy={4}
          r={4}
          transform="translate(3.999 4.031)"
          fill="#f89406"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
