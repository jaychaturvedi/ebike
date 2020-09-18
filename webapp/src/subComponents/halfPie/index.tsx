import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const data = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
{ name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
{ name: 'Group E', value: 278 }, { name: 'Group F', value: 189 }]

export default class HalfPie extends React.Component {
    render() {
        return (
            <PieChart width={400} height={120}>
                <Pie dataKey="value" startAngle={180} endAngle={0} data={data} cx={200} cy={100} outerRadius={60} fill="#8884d8" label />
            </PieChart>
        );
    }
}
