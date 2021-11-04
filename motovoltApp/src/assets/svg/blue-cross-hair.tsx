import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Path
        d="M2 2l14.142 14.142M2 16.142L16.142 2"
        stroke="#3C5BE8"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default SvgComponent
