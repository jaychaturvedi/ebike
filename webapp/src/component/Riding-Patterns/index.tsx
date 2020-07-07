import './index.scss';
import { Divider, Typography } from "antd";
import React, { PureComponent } from 'react';
import SeparatedColumn from "../../connectm-blocks/separated-column"
interface RidingPatternProps { }

interface RidingPatternStates { }

class RidingPattern extends PureComponent<RidingPatternProps, RidingPatternStates> {

    render() {
        return (
            <div className="connectm-RidingPattern">
                <div className={"statistics-title"}>
                    <Typography.Text strong>RIDING PATTERNS</Typography.Text>
                </div>
                <Divider type="horizontal" />
                <SeparatedColumn
                    cssClass={"statistics-Subtitle"}
                    columnData={[<div>Overview</div>, <div>Active</div>, <div>Inactive</div>, <div>Rides</div>]}
                    numberOfColumns={4}
                />
                <Divider type="horizontal" />
                <div className={"statistics-content"}>
                    <SeparatedColumn
                        cssClass={"statistics-content-row"}
                        columnData={[<div>Row1Col1</div>, <div> Row1Col2 </div>, <div> Row1Col3 </div>]}
                        numberOfColumns={3}
                    />
                    <Divider type="horizontal" />
                    <SeparatedColumn
                        cssClass={"statistics-content-row"}
                        columnData={[<div>Row2Col1</div>, <div> Row2Col2 </div>, <div> Row2Col3 </div>]}
                        numberOfColumns={3}
                    />
                </div>
            </div>
        )
    }

}

export default RidingPattern;