import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={6}
      height={11}
      viewBox="0 0 6 11"
      fill="none"
      {...props}
    >
      <Path
        d="M1 9.8l4-4.4L1 1"
        stroke="#000"
        strokeOpacity={0.6}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent

