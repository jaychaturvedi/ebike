import './index.scss';
import { Layout } from "antd";
import DoubleLineGraph from "./double-line";
import SingleLineGraph from "./single-line";
import React, { PureComponent } from 'react';

const data = [
    {
        nocycles: 0, amilage: 30, smilage: 39,
    },
    {
        nocycles: 100, amilage: 39, smilage: 30,
    },
    {
        nocycles: 200, amilage: 15, smilage: 20,
    },
    {
        nocycles: 300, amilage: 35, smilage: 15,
    },
    {
        nocycles: 400, amilage: 13, smilage: 19,
    },
    {
        nocycles: 500, amilage: 39, smilage: 29,
    },
    {
        nocycles: 600, amilage: 14, smilage: 31,
    },
    {
        nocycles: 700, amilage: 20, smilage: 15,
    },
    {
        nocycles: 800, amilage: 26, smilage: 22,
    },
    {
        nocycles: 900, amilage: 25, smilage: 35,
    },
    {
        nocycles: 1000, amilage: 15, smilage: 40,
    },
    {
        nocycles: 1100, amilage: 12, smilage: 12,
    },
    {
        nocycles: 1200, amilage: 40, smilage: 20,
    },
];

interface GraphSelectorProps {
    graphType: string,
}

interface GraphSelectorStates {
    selected: boolean;
}

enum GraphType {
    SINGLE = 'single',
    DOUBLE = 'double',
}

class GraphSelector extends PureComponent<GraphSelectorProps, GraphSelectorStates> {
    constructor(props: GraphSelectorProps) {
        super(props);
        this.state = {
            selected: false
        }
    }
    render() {
        return <>
            {this.props.graphType === GraphType.SINGLE ? <SingleLineGraph data={data} /> : <DoubleLineGraph data={data} L1={35} L2={25} line1StrokeColor="#8884d8" />}
        </>
    }
}

export default GraphSelector;