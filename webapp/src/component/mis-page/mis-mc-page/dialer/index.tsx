import React from "react";
// Import react-circular-progressbar module and styles
import {
    CircularProgressbarWithChildren,
    buildStyles, CircularProgressbar
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import IconTicks from '../../../../assets/batch2/Mask_Group_1.png'
import IconMapBg from '../../../../assets/batch2/meter_bg.png'

import ChangingProgressProvider from "./ChangingProgressProvider";

const App = () => (
    <ChangingProgressProvider values={[0, 20, 80]}>
        {(value: number) => (
            <CircularProgressbarWithChildren
                value={value}
                text={`${value}%`}
                circleRatio={0.75}
                styles={buildStyles({
                    rotation: 1 / 2 + 1 / 8,
                    strokeLinecap: "round",
                    trailColor: "#eee",
                })}
            >

                <img
                    style={{ zIndex: 10, position: 'inherit' }}
                    src={IconTicks}
                    alt="doge"
                />
                <img
                    style={{ zIndex: 2, position: 'inherit' }}
                    src={IconMapBg}
                    alt="doge"
                />
            </CircularProgressbarWithChildren>
        )}
    </ChangingProgressProvider>
);

export default App