import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={54}
      height={54}
      viewBox="0 0 54 54"
      fill="none"
      {...props}
    >
      <Circle cx={27} cy={27} r={25.5} stroke="#5372FF" strokeWidth={3} />
      <Path
        d="M29.533 30.024a1 1 0 01-1 .976h-3.067a1 1 0 01-1-.976l-.44-18A1 1 0 0125.024 11h3.95a1 1 0 011 1.024l-.442 18z"
        fill="#5372FF"
      />
      <Circle cx={27} cy={37} r={3} fill="#5372FF" />
    </Svg>
  )
}

export default SvgComponent
