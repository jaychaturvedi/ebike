import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" {...props}>
      <G data-name="Group 1327">
        <G data-name="Group 1326">
          <G data-name="Group 1325">
            <G data-name="Group 1324">
              <Path
                data-name="Path 1158"
                d="M39.991 33.742l-5.17-5.183a2.693 2.693 0 00-3.8.073l-2.6 2.61-.515-.287a25.941 25.941 0 01-6.272-4.538 26.163 26.163 0 01-4.543-6.3q-.142-.263-.279-.5l1.745-1.749.859-.863a2.705 2.705 0 00.069-3.811L14.317 8.01a2.687 2.687 0 00-3.8.071L9.057 9.55l.041.039a8.443 8.443 0 00-1.201 2.128 8.806 8.806 0 00-.534 2.15c-.683 5.674 1.9 10.859 8.924 17.9 9.705 9.725 17.524 8.991 17.863 8.955a8.74 8.74 0 002.154-.543 8.449 8.449 0 002.111-1.2l.032.028 1.475-1.449a2.708 2.708 0 00.069-3.816z"
                fill="none"
                stroke="#5372ff"
                strokeWidth={3}
              />
            </G>
          </G>
        </G>
        <Path data-name="Rectangle 2663" fill="none" d="M0 0h48v48H0z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
