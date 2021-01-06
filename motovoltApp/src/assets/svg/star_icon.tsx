import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" {...props}>
      <G data-name="Group 2186">
        <Path data-name="Rectangle 3152" fill="none" d="M0 0h32v32H0z" />
        <Path
          data-name="Path 1390"
          d="M16.614 4.395l3.307 7.577 8.467.7a.642.642 0 01.38 1.132l-6.422 5.386 1.925 8.012a.662.662 0 01-.994.7L16 23.657l-7.276 4.248a.662.662 0 01-.994-.7l1.925-8.012-6.424-5.386a.642.642 0 01.38-1.132l8.467-.7 3.307-7.58a.675.675 0 011.229 0z"
          fill="none"
          stroke="#5372ff"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
