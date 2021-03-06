import * as React from 'react';
import Svg, {G, Rect, Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" {...props}>
      <G data-name="Group 2848" transform="translate(-311 -194)">
        <Rect
          data-name="Rectangle 3495"
          width={48}
          height={48}
          rx={10}
          transform="translate(311 194)"
          fill="#5372ff"
        />
        <G data-name="Group 2398">
          <G data-name="Group 2402" fill="#fff">
            <Path
              data-name="Path 1304"
              d="M346.089 225.511a.783.783 0 10-.754 1.373c.933.513 1.468 1.081 1.468 1.559 0 .585-.829 1.492-3.155 2.282a27.973 27.973 0 01-8.648 1.211 27.973 27.973 0 01-8.648-1.211c-2.326-.79-3.155-1.7-3.155-2.282 0-.478.535-1.047 1.468-1.559a.783.783 0 00-.754-1.373c-1.041.572-2.281 1.544-2.281 2.932 0 1.064.732 2.581 4.218 3.765a29.556 29.556 0 009.152 1.291 29.556 29.556 0 009.152-1.294c3.486-1.184 4.218-2.7 4.218-3.765-.001-1.385-1.24-2.357-2.281-2.929z"
              opacity={0.6}
            />
            <Path
              data-name="Path 1305"
              d="M329.085 229.595a25.453 25.453 0 0011.829 0c1.946-.55 2.932-1.345 2.932-2.364s-.986-1.815-2.932-2.364c-.432-.122-.9-.229-1.4-.32q-.407.7-.852 1.447c.553.083 1.072.185 1.543.3a4 4 0 012.062.933 4 4 0 01-2.062.933 21.632 21.632 0 01-4.935.56c-.089.007-.179.01-.269.01s-.18 0-.269-.01a21.628 21.628 0 01-4.935-.56 4 4 0 01-2.062-.933 4 4 0 012.062-.933c.471-.12.99-.222 1.543-.3q-.446-.744-.852-1.447c-.5.091-.969.2-1.4.32-1.946.55-2.932 1.345-2.932 2.364s.987 1.812 2.929 2.364z"
              opacity={0.9}
            />
            <Path
              data-name="Path 1306"
              d="M334.999 224.23a1.972 1.972 0 001.695-.951c2.549-4.171 5.588-9.667 5.588-12.168a7.282 7.282 0 00-14.565 0c0 2.5 3.039 8 5.588 12.168a1.972 1.972 0 001.694.951zm-2.927-13.618a2.927 2.927 0 112.927 2.927 2.93 2.93 0 01-2.927-2.927z"
            />
          </G>
          <Path
            data-name="Rectangle 3360"
            fill="none"
            d="M319 202h32v32h-32z"
          />
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
