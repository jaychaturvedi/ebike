import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={30}
      height={28}
      viewBox="0 0 30 28"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#prefix__clip0)"
        stroke="#4B4B4B"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M3.72 26.08h22.45c1.5 0 2.72-1.22 2.72-2.72V3.72c0-1.5-1.22-2.72-2.72-2.72H3.72C2.22 1 1 2.22 1 3.72v19.63c0 1.51 1.22 2.73 2.72 2.73z" />
        <Path d="M1.19 20.37l10.79-10.33 5.55 7.1 4-4.13 7.11 7.36M22.03 9.14a2.13 2.13 0 100-4.26 2.13 2.13 0 000 4.26z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h29.9v27.08H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
