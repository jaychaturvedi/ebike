import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={17} height={17} viewBox="0 0 17 17" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 15.867a7.367 7.367 0 100-14.734 7.367 7.367 0 000 14.734zM8.5 17a8.5 8.5 0 100-17 8.5 8.5 0 000 17z"
        fill="#6D6D6D"
      />
      <Path
        d="M9.337 10.751H7.949l-.153-6.82h1.7l-.16 6.82zM7.75 12.836c0-.252.082-.46.245-.624.164-.168.388-.252.671-.252.283 0 .507.084.67.252a.846.846 0 01.246.624c0 .244-.08.447-.239.611-.159.164-.385.246-.677.246-.292 0-.518-.082-.677-.246a.842.842 0 01-.24-.61z"
        fill="#6D6D6D"
      />
    </Svg>
  );
}

export default SvgComponent;
