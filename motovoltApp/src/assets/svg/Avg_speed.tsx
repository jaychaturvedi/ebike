import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      data-name="Group 1921"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      {...props}>
      <G data-name="Group 1920" fill="#5372ff">
        <Path
          data-name="Path 1340"
          d="M18.408 8.434a.438.438 0 00-.365.2l-.057.129-4.608 10.364a1.731 1.731 0 00-.227.857 1.782 1.782 0 003.524.373v-.031l2.177-11.448a.446.446 0 00-.444-.444z"
        />
        <Path
          data-name="Path 1341"
          d="M25.418 25.423a13.322 13.322 0 00-9.417-22.756C8.141 2.667 2.781 9.619 2.666 16a13.878 13.878 0 003.905 9.428l1.915-1.87a10.833 10.833 0 01-2.725-4.568 12.616 12.616 0 01-.427-2.989 10.667 10.667 0 1118.2 7.544"
        />
      </G>
      <Path data-name="Rectangle 3018" fill="none" d="M0 0h32v32H0z" />
    </Svg>
  );
}

export default SvgComponent;
