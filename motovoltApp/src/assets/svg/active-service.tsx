import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={40}
      height={39}
      viewBox="0 0 40 39"
      fill="none"
      {...props}
    >
      <Path
        d="M32.932 20.304c2.635-2.635 3.478-6.38 2.548-9.731-.1-.342-.515-.462-.762-.215l-5.451 5.451a.454.454 0 01-.642 0l-5.317-5.317a.454.454 0 010-.642l5.45-5.45a.455.455 0 00-.213-.763c-3.351-.93-7.096-.087-9.731 2.548-2.756 2.756-3.552 6.722-2.415 10.186a.438.438 0 01-.1.448l-8.28 8.28a4.246 4.246 0 106.006 6.006l8.28-8.28a.427.427 0 01.448-.1c3.458 1.13 7.424.334 10.179-2.421z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
