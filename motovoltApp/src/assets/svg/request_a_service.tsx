import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={51}
      height={51}
      viewBox="0 0 51 51"
      fill="none"
      {...props}
    >
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M40.44 26.551c3.135-3.136 4.138-7.593 3.032-11.58-.12-.406-.613-.55-.908-.255l-6.486 6.487a.54.54 0 01-.764 0l-6.328-6.328a.54.54 0 010-.764l6.487-6.486a.542.542 0 00-.255-.908c-3.987-1.106-8.444-.103-11.58 3.033-3.28 3.279-4.226 7.998-2.873 12.121a.52.52 0 01-.12.533l-9.853 9.854a5.053 5.053 0 107.147 7.147l9.854-9.854a.509.509 0 01.533-.119c4.115 1.345 8.834.398 12.113-2.881z"
          stroke="#3C5BE8"
          strokeWidth={2}
          strokeMiterlimit={10}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path
            fill="#fff"
            transform="rotate(45 15.5 37.42)"
            d="M0 0h27.137v43.841H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
