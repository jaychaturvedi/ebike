import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      data-name="Group 2566"
      width={42}
      height={42}
      viewBox="0 0 42 42"
      {...props}>
      <Path data-name="Rectangle 3496" fill="none" d="M0 0h42v42H0z" />
      <Path
        data-name="Path 1517"
        d="M36.91 30.564v-9.3a3.848 3.848 0 10-3.215-6.979l.081-.112-8.965-6.502a3.836 3.836 0 00-7.619 0l-9.46 6.921A3.845 3.845 0 005.09 21.81v8.286a3.851 3.851 0 104.873 5.3h21.57a3.851 3.851 0 105.376-4.833zm-1.447-14.793a1.928 1.928 0 11-1.928 1.928 1.93 1.93 0 011.928-1.928zM21 6.211a1.928 1.928 0 11-1.928 1.928A1.93 1.93 0 0121 6.211zM6.537 16.313a1.928 1.928 0 11-1.929 1.928 1.932 1.932 0 011.929-1.928zm0 19.282a1.928 1.928 0 111.928-1.928 1.929 1.929 0 01-1.928 1.928zm25-3.091H10.193a3.866 3.866 0 00-2.213-2.407V21.81a3.859 3.859 0 002.411-3.57 3.792 3.792 0 00-.417-1.7l8.092-5.92a3.8 3.8 0 005.868 0l7.922 5.747a3.812 3.812 0 002.158 4.91v9a3.852 3.852 0 00-2.481 2.227zm3.57 3.375a1.928 1.928 0 111.928-1.928 1.929 1.929 0 01-1.932 1.927z"
        fill="#5372ff"
      />
    </Svg>
  );
}

export default SvgComponent;