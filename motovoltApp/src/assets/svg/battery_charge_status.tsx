import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={56} height={56} viewBox="0 0 56 56" {...props}>
      <G data-name="Group 2601">
        <Path
          data-name="Path 1309"
          d="M39.492 8.725h-2.96V6.942a2.486 2.486 0 00-2.485-2.485h-12.1a2.484 2.484 0 00-2.483 2.485v1.783h-2.955a3.577 3.577 0 00-3.572 3.572v35.1a3.574 3.574 0 003.572 3.568h22.983a3.574 3.574 0 003.572-3.568v-35.1a3.577 3.577 0 00-3.572-3.572z"
          fill="none"
          stroke="#2ecc71"
          strokeLinejoin="round"
          strokeWidth={4}
        />
        <Path
          data-name="Path 1474"
          d="M33.255 26.806l-5.833 9.723a.973.973 0 01-.835.471 1 1 0 01-.259-.035.972.972 0 01-.712-.936v-4.862h-2.917a.972.972 0 01-.835-1.472l5.833-9.723a.972.972 0 011.806.5v4.86h2.912a.972.972 0 01.835 1.472z"
          fill="#2ecc71"
        />
        <Path data-name="Rectangle 3361" fill="none" d="M0 0h56v56H0z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
