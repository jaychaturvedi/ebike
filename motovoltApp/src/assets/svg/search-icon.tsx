import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={27}
      height={26}
      viewBox="0 0 27 26"
      fill="none"
      {...props}
    >
      <Path
        d="M16.367 19.295a8.52 8.52 0 100-17.038 8.52 8.52 0 000 17.038zM2.257 24.233l7.765-7.765"
        stroke="#5372FF"
        strokeWidth={3}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
