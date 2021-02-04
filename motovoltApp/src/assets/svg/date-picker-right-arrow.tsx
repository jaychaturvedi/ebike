import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={7}
      height={13}
      viewBox="0 0 7 13"
      fill="none"
      {...props}
    >
      <Path
        d="M1 12l5-5.5L1 1"
        stroke={props.stroke ? props.stroke : "#152F6A"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
