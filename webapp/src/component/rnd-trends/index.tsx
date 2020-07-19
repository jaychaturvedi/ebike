import './index.scss';
import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
const data = [
    {
        name: 'MON', uv: 4000, pv: 2400, amt: 2400, tv: 3000, av: 1000, bv: 7500
    },
    {
        name: 'TUE', uv: 3000, pv: 1398, amt: 2210, tv: 2500, av: 2000, bv: 8500
    },
    {
        name: 'WED', uv: 2000, pv: 9800, amt: 2290, tv: 5000, av: 4000, bv: 7855
    },
    {
        name: 'THU', uv: 2780, pv: 3908, amt: 2000, tv: 10000, av: 9000, bv: 2355
    },
    {
        name: 'FRI', uv: 1890, pv: 4800, amt: 2181, tv: 8000, av: 11000, bv: 6145
    },
    {
        name: 'SAT', uv: 2390, pv: 3800, amt: 2500, tv: 6230, av: 5000, bv: 1234
    },
    {
        name: 'SUN', uv: 3490, pv: 4300, amt: 2100, tv: 4000, av: 6600, bv: 4751
    },
];

interface RandDTrendsProps { }

interface RandDTrendsStates { }

class RandDTrends extends PureComponent<RandDTrendsProps, RandDTrendsStates> {

    render() {
        return (
            <div className="connectm-RandDTrends">
                <div>
                    <LineChart width={300} height={100} data={data}>
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </div>
                <br />
                <br /> <br />
                <div>
                    <LineChart width={300} height={100} data={data}>
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="uv" stroke="#77bdf8" strokeWidth={2} />
                        <Line type="monotone" dataKey="tv" stroke="#999fff" strokeWidth={2} />
                        <Line type="monotone" dataKey="av" stroke="#338fff" strokeWidth={2} />
                        <Line type="monotone" dataKey="bv" stroke="#2287ff" strokeWidth={2} />
                    </LineChart>
                </div>
                <br />
                <br /> <br />
                <div>
                    <LineChart width={300} height={100} data={data}>
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="tv" stroke="#999fff" strokeWidth={2} />
                        <Line type="monotone" dataKey="bv" stroke="#2287ff" strokeWidth={2} />
                    </LineChart>
                </div>
            </div>
        )
    }

}

export default RandDTrends;