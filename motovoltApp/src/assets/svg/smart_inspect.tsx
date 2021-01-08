import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={42}
      height={42}
      viewBox="0 0 42 42"
      fill="none"
      {...props}
    >
      <Path
        d="M40.392 15.262v-7.41A5.86 5.86 0 0034.54 2H27.13M15.262 2h-7.41A5.86 5.86 0 002 7.853v7.41M27.13 40.392h7.41a5.86 5.86 0 005.852-5.853V27.13M2 27.13v7.41a5.86 5.86 0 005.853 5.852h7.41M22.93 26.92a7.458 7.458 0 100-14.917 7.458 7.458 0 000 14.916zM17.645 24.73l-5.642 5.659"
        stroke="#5E6CAD"
        strokeWidth={3}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default SvgComponent
