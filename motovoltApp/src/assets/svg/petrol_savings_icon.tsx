import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" {...props}>
      <G data-name="Group 1960">
        <G data-name="Group 1044">
          <Path data-name="Rectangle 2280" fill="none" d="M0 0h32v32H0z" />
        </G>
        <G data-name="Group 1797">
          <G data-name="Group 1041">
            <G data-name="Group 1040">
              <Path
                data-name="Path 1050"
                d="M21.01 19.386a.935.935 0 00-.983.877 4.723 4.723 0 01-.693 2.229 4.43 4.43 0 01-1.674 1.609.964.964 0 00.946 1.68 6.317 6.317 0 002.331-2.265 6.225 6.225 0 00.946-3.143.935.935 0 00-.873-.987z"
                fill="#5372ff"
              />
            </G>
          </G>
          <G data-name="Group 1043">
            <G data-name="Group 1042">
              <Path
                data-name="Path 1051"
                d="M17.989 6.843c-.582-.859-1.1-1.649-1.574-2.369a1.014 1.014 0 00-.275-.274.889.889 0 00-1.232.274c-.445.72-.957 1.476-1.573 2.369-2.7 3.981-6.74 9.988-6.74 13.421a9.067 9.067 0 0018.133-.034c.001-3.433-4.036-9.405-6.739-13.387zm2.839 18.57a7.22 7.22 0 01-5.166 2.129 7.363 7.363 0 01-5.166-2.13 7.268 7.268 0 01-2.122-5.183c0-2.883 3.866-8.616 6.433-12.427.307-.446.582-.892.855-1.27.273.378.548.824.855 1.27 2.567 3.845 6.433 9.544 6.433 12.427a7.412 7.412 0 01-2.122 5.183z"
                fill="#5372ff"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
