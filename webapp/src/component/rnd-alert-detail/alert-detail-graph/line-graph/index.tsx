import './index.scss';
import { Layout } from "antd";
import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, Text
} from 'recharts';

interface LineGraphProps {
}

interface LineGraphStates { }

const data = [
    {
        "km": 20,
        "smilage": 39,
        "amilage": 30,
        "nocycles": 10
    },
    {
        "km": 10,
        "smilage": 30,
        "amilage": 23,
        "nocycles": 12
    },
    {
        "km": 30,
        "smilage": 29,
        "amilage": 27,
        "nocycles": 120
    },
    {
        "km": 30,
        "smilage": 25,
        "amilage": 23,
        "nocycles": 124
    },
    {
        "km": 30,
        "smilage": 24,
        "amilage": 20,
        "nocycles": 129
    },
    {
        "km": 30,
        "smilage": 20,
        "amilage": 20,
        "nocycles": 149
    },
    {
        "km": 30,
        "smilage": 19,
        "amilage": 18,
        "nocycles": 152
    },
    {
        "km": 30,
        "smilage": 16,
        "amilage": 15,
        "nocycles": 170
    },
    {
        "km": 30,
        "smilage": 15,
        "amilage": 14,
        "nocycles": 290
    },
    {
        "km": 30,
        "smilage": 12,
        "amilage": 10,
        "nocycles": 330
    },
    {
        "km": 30,
        "smilage": 10,
        "amilage": 9,
        "nocycles": 550
    },
    {
        "km": 30,
        "smilage": 7,
        "amilage": 7,
        "nocycles": 660
    },
    {
        "km": 30,
        "smilage": 5,
        "amilage": 4,
        "nocycles": 1200
    }
]


class LineGraph extends PureComponent<LineGraphProps, LineGraphStates> {

    render() {
        return (
            <ResponsiveContainer>
                <LineChart data={data}>
                    <XAxis />
                    <YAxis />
                    <Line dataKey={"smilage"} type="monotone" stroke="#92ab07" />
                    <Line dataKey={"amilage"} type="monotone" stroke="#0774ab" />
                </LineChart>
            </ResponsiveContainer>
        )
    }

}

export default LineGraph;