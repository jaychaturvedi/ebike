import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#prefix__clip0)"
        stroke="#5372FF"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M9.1 3.24l1.59.26c.11.02.22-.06.22-.18l.12-1.57M3.09 6.13h2.76M5.95 2.44v3.7" />
        <Path d="M11.29 5.9c0 2.98-2.42 5.4-5.4 5.4C2.91 11.3.5 8.88.5 5.9.5 2.92 2.92.5 5.9.5c2.07 0 3.87 1.17 4.78 2.88" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h11.79v11.79H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
