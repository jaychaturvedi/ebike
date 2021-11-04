import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={23}
      height={32}
      viewBox="0 0 23 32"
      fill="none"
      {...props}
    >
      <Path
        d="M21.925 10.804c0-5.392-4.667-9.751-10.43-9.751-5.764 0-10.42 4.37-10.42 9.75 0 1.643.441 3.191 1.205 4.55 0 0 .591.937.87 1.284 1.366 2.053 3.84 3.98 4.27 7.192.075.547.526.958 1.075.958h6.021c.549 0 1.01-.421 1.075-.969.506-4.012 4.033-5.928 5.13-8.445.01-.01.01-.02.01-.02a9.245 9.245 0 001.194-4.55z"
        stroke="#5372FF"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.032 23.27v-4.938l-1.817-2.348M13.72 23.27v-5.748l2.29-2.78M11.355 23.27v-7.623l-2.118-4.875M8.14 10.867c.89 0 1.613-.707 1.613-1.58 0-.872-.722-1.58-1.613-1.58s-1.613.708-1.613 1.58c0 .873.722 1.58 1.613 1.58z"
        stroke="#5372FF"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.183 16.268c.89 0 1.613-.707 1.613-1.579s-.722-1.58-1.613-1.58-1.613.708-1.613 1.58c0 .872.722 1.58 1.613 1.58zM17.355 14.731c.89 0 1.613-.707 1.613-1.58 0-.872-.722-1.579-1.613-1.579-.89 0-1.613.707-1.613 1.58 0 .872.722 1.58 1.613 1.58zM13.258 8.34c.89 0 1.613-.708 1.613-1.58 0-.872-.722-1.58-1.613-1.58-.89 0-1.613.708-1.613 1.58 0 .872.722 1.58 1.613 1.58zM8.323 27.946h6.354M13.312 8.34v2.948l-2.377 2.97"
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
