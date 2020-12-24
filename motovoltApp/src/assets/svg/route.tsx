import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M31.44 14.646L17.354.56a1.903 1.903 0 00-2.697 0L.56 14.646a1.903 1.903 0 000 2.697L14.646 31.43c.747.746 1.95.746 2.697 0L31.43 17.343c.757-.736.757-1.95.01-2.697zm-7.935-.508l-2.22 1.712-1.857 1.441c-.394.312-.975.021-.975-.477v-2.043h-4.99a.646.646 0 00-.642.643v5.58a1.111 1.111 0 01-2.22 0v-5.58a2.85 2.85 0 012.852-2.853h4.99v-2.043c0-.508.58-.788.975-.477l1.857 1.442 2.22 1.711a.588.588 0 01.01.944z"
        fill="#142F6A"
      />
    </Svg>
  );
}

export default SvgComponent;
