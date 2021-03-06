import * as React from "react"
import Svg, { SvgProps, Rect, Path, Circle } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill="none"
      {...props}
    >
      <Rect
        x={14}
        y={12}
        width={17}
        height={20}
        rx={1}
        stroke="#5372FF"
        strokeWidth={2}
      />
      <Path stroke="#5372FF" strokeWidth={2} d="M17 17h11M17 22h11M17 27h11" />
      {/* <Circle cx={22} cy={22} r={22} fill="#000" fillOpacity={0.1} /> */}
    </Svg>
  )
}

export default SvgComponent
