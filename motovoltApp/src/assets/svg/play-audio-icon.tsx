import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <Circle cx={16} cy={16} r={16} fill="#000" fillOpacity={0.2} />
      <Circle cx={16} cy={16} r={15.5} stroke="#000" strokeOpacity={0.1} />
      <Path d="M21 16.5l-7.5 6.495v-12.99L21 16.5z" fill="#fff" />
    </Svg>
  )
}

export default SvgComponent
