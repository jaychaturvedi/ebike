import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={13}
      height={7}
      viewBox="0 0 13 7"
      fill="none"
      {...props}
    >
      <Path
        d="M1 1l5.5 5L12 1"
        stroke="#838383"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
