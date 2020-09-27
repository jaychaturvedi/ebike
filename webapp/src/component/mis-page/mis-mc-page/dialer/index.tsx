import React from "react";
// Import react-circular-progressbar module and styles
import {
    CircularProgressbarWithChildren,
    buildStyles, CircularProgressbar
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ChangingProgressProvider from "./ChangingProgressProvider";

const App = () => (
    <ChangingProgressProvider values={[0, 20, 80]}>
        {(value: number) => (
            <CircularProgressbar
                value={value}
                text={`${value}%`}
                circleRatio={0.75}
                styles={buildStyles({
                    rotation: 1 / 2 + 1 / 8,
                    strokeLinecap: "butt",
                    trailColor: "#eee"
                })}
            />
        )}
    </ChangingProgressProvider>
);

export default App