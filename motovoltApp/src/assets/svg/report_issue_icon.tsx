import * as React from 'react';
import Svg, {G, Path, Circle, Text, TSpan, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={49.5} height={48} viewBox="0 0 49.5 48" {...props}>
      <G data-name="Group 1968">
        <Path data-name="Rectangle 2210" fill="none" d="M0 0h48v48H0z" />
        <G data-name="Group 2340">
          <Path data-name="Rectangle 3025" fill="none" d="M0 0h48v48H0z" />
          <G data-name="Group 1972">
            <Path
              data-name="Path 1354"
              d="M37.753 18.129a9.6 9.6 0 00-3.474.647 27.475 27.475 0 01-1.94-5.732A6.374 6.374 0 0026.1 7.905a1.394 1.394 0 000 2.788 3.552 3.552 0 01.959.132 3.6 3.6 0 012.185 1.744 1.381 1.381 0 00-.1.15l-.432.729-2.184 3.689H14.857l-.663-1.675h.275a1.394 1.394 0 000-2.788H9.678a1.394 1.394 0 000 2.788H11.2l1.213 3.062a9.714 9.714 0 106.84 10.708h2.552A1.389 1.389 0 0023 28.551l7.3-12.335a37.251 37.251 0 001.543 3.936 9.666 9.666 0 105.906-2.023zm-28.075 11.1h6.758a6.922 6.922 0 110-2.788H9.678a1.394 1.394 0 000 2.788zm11.339-2.788h-1.761a9.708 9.708 0 00-2.987-5.709 1.4 1.4 0 00-.053-.167l-.254-.642h8.914zm16.736 8.316a6.923 6.923 0 01-4.647-12.032 61.78 61.78 0 003.5 5.9 1.391 1.391 0 102.287-1.584 61 61 0 01-3.4-5.749 6.845 6.845 0 012.252-.381 6.922 6.922 0 010 13.844z"
              fill="#5372ff"
            />
          </G>
        </G>
        <G data-name="Group 2341">
          <G
            data-name="Ellipse 344"
            transform="translate(32 28)"
            fill="#f65f5f"
            stroke="#f5f6fb"
            strokeWidth={1.5}>
            <Circle cx={8} cy={8} r={8} stroke="none" />
            <Circle cx={8} cy={8} r={8.75} fill="none" />
          </G>
          <Text
            data-name="!"
            transform="translate(39.865 41)"
            fill="#f8f8fc"
            fontSize={14}
            fontWeight={700}>
            <TSpan x={-1.904} y={0}>
              {'!'}
            </TSpan>
          </Text>
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
