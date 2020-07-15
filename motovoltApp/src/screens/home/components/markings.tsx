import React from 'react';
import {G, Line, Text} from 'react-native-svg';
import Colors from '../../../styles/colors';

export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

type Props = {
  radius: number;
  centerX: number;
  centerY: number;
  minutes: number;
  hours: number;
};

const ClockMarkings = (props: Props) => {
  const {radius, centerX, centerY, minutes, hours} = props;
  const minutesArray = new Array(minutes).fill(1);
  const hoursArray = new Array(hours).fill(1);

  const minuteSticks = minutesArray.map((minute, index) => {
    const start = polarToCartesian(centerX, centerY, radius - 5, index * 6);
    const end = polarToCartesian(centerX, centerY, radius, index * 6);
    return (
      <Line
        stroke={Colors.BORDER_GREY}
        strokeWidth={2}
        strokeLinecap="round"
        key={index}
        x1={start.x}
        x2={end.x}
        y1={start.y}
        y2={end.y}
      />
    );
  });

  const hourSticks = hoursArray.map((hour, index) => {
    const start = polarToCartesian(centerX, centerY, radius - 10, index * 30);
    const end = polarToCartesian(centerX, centerY, radius, index * 30);

    return (
      <G key={index}>
        <Line
          stroke={Colors.BLACK}
          strokeWidth={4}
          strokeLinecap="round"
          x1={start.x}
          x2={end.x}
          y1={start.y}
          y2={end.y}
        />
      </G>
    );
  });

  return (
    <G>
      {minuteSticks}
      {hourSticks}
    </G>
  );
};

export default ClockMarkings;
