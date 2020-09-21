import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
{ name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
{ name: 'Group E', value: 278 }, { name: 'Group F', value: 189 }]

export default class HalfPie extends React.Component {
    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart >
                    <Pie dataKey="value" startAngle={180} endAngle={0} data={data} cx={'50%'} cy={'100%'} outerRadius={60} fill="#8884d8" label />
                </PieChart>
            </ResponsiveContainer >

        );
    }
}
