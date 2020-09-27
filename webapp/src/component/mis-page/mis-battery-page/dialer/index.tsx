import React from "react";
// Import react-circular-progressbar module and styles
import {
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ChangingProgressProvider from "./ChangingProgressProvider";

const App = () => (
    <div style={{ padding: "40px 40px 40px 40px" }}>
        <ChangingProgressProvider values={[0, 80]}>
            {(value: number) => (
                <CircularProgressbarWithChildren value={value}
                    styles={buildStyles({
                        pathColor: "#f00",
                        trailColor: "#eee",
                        strokeLinecap: "butt"
                    })}
                    text="nnn"
                >
                    {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}

                    <img
                        style={{ width: 50, marginTop: -5 }}
                        src="https://i.imgur.com/b9NyUGm.png"
                        alt="doge"
                    />
            hhhh
                    <div style={{ fontSize: 12, marginTop: -5 }}>
                        <strong>66%</strong> mate
            </div>

                </CircularProgressbarWithChildren>
            )}
        </ChangingProgressProvider>
    </div>
);

function Example(props: any) {
    return (
        <div style={{ marginTop: 30, display: "flex" }}>
            <div style={{ width: "30%", paddingRight: 30 }}>{props.children}</div>
            <div style={{ width: "70%" }}>
                <h3 className="h5">{props.label}</h3>
                <p>{props.description}</p>
            </div>
        </div>
    );
}

export default App