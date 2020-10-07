import { Brush } from '@material-ui/icons';
import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './index.scss'


const data = [
    {
        name: 'Page A', uv: 100, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 200, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 300, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 400, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 500, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 600, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 700, pv: 4300, amt: 2100,
    },
];

export default class LineGraph extends PureComponent {
    render() {
        return (
            <>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5, right: 5, left: -20, bottom: 5,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fill: 'white' }} stroke='#ffffff' interval={0} />
                        <YAxis tick={{ fill: 'white' }} stroke='#ffffff' />
                        <Line type="monotone" dataKey="uv" stroke="yellow" dot={{ r: 0 }} strokeWidth={4} />
                        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                        <Brush
                            fill="#131731"
                            height={12}
                            stroke="#3C4473"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </>
        );
    }
}
