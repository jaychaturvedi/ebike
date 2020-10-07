import React, { PureComponent } from 'react';
import './index.scss';
import { ReactComponent as BatterySvg } from '../../../../assets/Cell_icon.svg'
import GreenIndicator from "../../../../assets/batch2/green_indicator.png"
import BatteryRedPng from '../../../../assets/png/battery-cell-red.png'
type CellProps = {
    cellNumber: number
    cellType: string
    cellIcon: string
    cellValue: string
}

const cellIcons = {
    normal: "",
    red: "../../../../assets/png/battery-cell-red.png",
    green: ""
}

function batteryStyle(batteryType: string, cellIcon: string) {
    switch (batteryType) {
        case "normal": {
            return {
                imageStyle: {
                    marginTop: "5px",
                    marginLeft: "5px",
                    width: "42px",
                    height: "20px"
                },
                cellNumberStyle: "cell-number-normal",
                backgroundImage: cellIcon
            }
        }
        case "red": {
            return {
                imageStyle: {
                    width: "50px",
                    height: "25px"
                },
                cellNumberStyle: "cell-number",
                backgroundImage: cellIcon
            }
        }
        case "green": {
            return {
                imageStyle: {
                    width: "50px",
                    height: "25px"
                },
                cellNumberStyle: "cell-number",
                backgroundImage: cellIcon
            }
        }
        default: {
            return {}
        }
    }

}

export default function Cell(props: CellProps) {
    const st = batteryStyle(props.cellType, props.cellIcon)
    return (
        <div className={"voltage-cell-text-wrapper"} >
            <div className={"voltage-cell-wrapper"}>
                <img src={st.backgroundImage} style={{ ...st.imageStyle }} />
                <span className={st.cellNumberStyle}>{props.cellNumber}</span>
            </div>
            <span>{props.cellValue}</span>
        </div >)
}