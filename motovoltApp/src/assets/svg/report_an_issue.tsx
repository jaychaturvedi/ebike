import * as React from "react"
import Svg, { SvgProps, Path, Circle } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={74}
      height={38}
      viewBox="0 0 74 38"
      fill="none"
      {...props}
    >
      <Path
        d="M17.242 1l4.878 2.09-2.717 6.826M45.069 3.73h-2.8m0 0h-4.835m4.835 0l-2.524 6.186m0 0L33.319 25.66m6.425-15.743h.065L49 25.66H33.319m6.425-15.743H19.404M33.319 25.66L19.403 9.916m0 0L13 26m6.403-16.084h-.04M1 25.5C1 31.851 6.373 37 13 37s12-5.149 12-11.5S19.627 14 13 14 1 19.149 1 25.5zm36 0C37 31.851 42.373 37 49 37s12-5.149 12-11.5S55.627 14 49 14s-12 5.149-12 11.5z"
        stroke="#3C5BE8"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={62} cy={12} r={12} fill="#E80B0B" />
      <Path
        d="M63.407 14.671h-2.11L61 5.803h2.707l-.299 8.868zm-1.054 1.389c.427 0 .77.126 1.028.378.264.252.395.574.395.967 0 .386-.132.706-.395.958-.258.252-.6.378-1.029.378-.421 0-.764-.126-1.028-.378a1.283 1.283 0 01-.386-.958c0-.387.128-.706.386-.958.264-.258.607-.387 1.029-.387z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
