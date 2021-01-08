import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <Circle cx={6} cy={6} r={5} stroke="#5372FF" />
      <Path d="M5.045 3.5l1 2.5H8" stroke="#5372FF" strokeLinecap="round" />
    </Svg>
  )
}

export default SvgComponent
