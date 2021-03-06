import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm-.702-9.329h2.11l.298-8.868H11l.299 8.868zm2.083 1.767c-.258-.252-.6-.378-1.029-.378-.421 0-.764.129-1.028.387a1.282 1.282 0 00-.386.958c0 .386.128.706.386.958.264.252.607.378 1.028.378.428 0 .771-.126 1.029-.378.264-.252.395-.572.395-.958 0-.393-.131-.715-.395-.967z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
