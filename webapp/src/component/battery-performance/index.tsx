import './index.scss';
import { Typography, Divider } from "antd";
import React, { PureComponent } from 'react';
import SeparatedColumn from "../../connectm-blocks/separated-column"
interface BatteryPerfromanceProps { }

interface BatteryPerfromanceStates { }

class BatteryPerfromance extends PureComponent<BatteryPerfromanceProps, BatteryPerfromanceStates> {

    render() {
        return (
            <div className="connectm-BatteryPerfromance">
                <div className={"statistics-title"}>
                    <Typography.Text strong>BATTERY PERFORMANCE</Typography.Text>
                </div>
                <Divider type="horizontal" />
                <div className={"statistics-content"}>
                    <SeparatedColumn
                        cssClass={"statistics-content-row"}
                        numberOfColumns={2}
                        columnData={[<div>Row1Col1</div>, <div>Row1Col2</div>]}
                    />
                    <Divider type="horizontal" />
                    <SeparatedColumn
                        cssClass={"statistics-content-row"}
                        numberOfColumns={2}
                        columnData={[<div>Row2Col1</div>, <div>Row2Col2</div>]}
                    />
                    <Divider type="horizontal" />
                    <SeparatedColumn
                        cssClass={"statistics-content-row"}
                        numberOfColumns={2}
                        columnData={[<div>Row2Col1</div>, <div>Row2Col2</div>]}
                    />
                    <Divider type="horizontal" />
                    <SeparatedColumn
                        cssClass={"statistics-content-row"}
                        numberOfColumns={2}
                        columnData={[<div>Row2Col1</div>, <div>Row2Col2</div>]}
                    />
                </div>
            </div>
        )
    }

}

export default BatteryPerfromance;