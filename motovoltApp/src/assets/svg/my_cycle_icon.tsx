import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" {...props}>
      <G data-name="Group 2187">
        <Path data-name="Rectangle 3025" fill="none" d="M0 0h28v28H0z" />
        <G data-name="Group 1972">
          <Path
            data-name="Path 1354"
            d="M22.023 10.577a5.6 5.6 0 00-2.027.378 16.027 16.027 0 01-1.132-3.344 3.718 3.718 0 00-3.638-3 .814.814 0 000 1.627 2.072 2.072 0 01.56.077 2.1 2.1 0 011.274 1.017.805.805 0 00-.061.088l-.252.425-1.274 2.152H8.667L8.28 9.02h.16a.814.814 0 000-1.627H5.645a.814.814 0 000 1.627h.89l.707 1.786a5.667 5.667 0 103.99 6.246h1.489a.81.81 0 00.7-.4l4.26-7.2a21.73 21.73 0 00.9 2.3 5.638 5.638 0 103.445-1.18zM5.645 17.052h3.943a4.038 4.038 0 110-1.627H5.645a.814.814 0 000 1.627zm6.614-1.627h-1.027a5.663 5.663 0 00-1.742-3.33.816.816 0 00-.031-.1l-.148-.375h5.2zm9.763 4.851a4.039 4.039 0 01-2.711-7.019 36.038 36.038 0 002.044 3.443.811.811 0 101.334-.924 35.584 35.584 0 01-1.981-3.354 3.993 3.993 0 011.314-.222 4.038 4.038 0 010 8.075z"
            fill="#6f6f6f"
          />
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
