import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={42}
      height={39}
      viewBox="0 0 42 39"
      fill="none"
      {...props}
    >
      <Path
        d="M30.515 33.994H12.163a1.458 1.458 0 01-1.445-1.465v-12.17c0-5.942 4.752-10.771 10.628-10.771 5.863 0 10.628 4.816 10.628 10.772v12.169a1.46 1.46 0 01-1.459 1.465z"
        fill="#fff"
        stroke="#5372FF"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <Path
        d="M29.752 37.643H12.94c-1.232 0-2.222-1.004-2.222-2.252v-5.548H31.96v5.548a2.22 2.22 0 01-2.209 2.252z"
        fill="#fff"
        stroke="#5372FF"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <Path d="M23.33 14.322a4 4 0 014 4l-4-4z" fill="#fff" />
      <Path
        d="M23.33 14.322a4 4 0 014 4M1 19.45l3.574.19M5.016 8.122l2.824 2.212M14.693 1.136l1.071 3.46M26.566 1L25.51 4.46M36.405 7.756L33.58 9.995M40.662 19.003l-3.56.203"
        stroke="#5372FF"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
