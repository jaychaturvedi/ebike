import React from "react"
import * as Highcharts from "highcharts"
import HighchartsReact from 'highcharts-react-official'
import HC_more from 'highcharts/highcharts-more' //module
HC_more(Highcharts) //init module

interface ChartProps {
    type: "LINE" | "BUBBLE"
}

function LineChart() {
    const options: Highcharts.Options = {
        title: {
            text: undefined,
        },
        credits: {
            enabled: false
        },
        series: [{
            type: "line",
            data: [1, 2, 3, 4, 5]
        }],
        chart: {
            className: "lineHighChart"
        },
       

    }
    return <HighchartsReact
        highcharts={Highcharts}
        options={options}
    />
}

function BubbleChart() {
    const options: Highcharts.Options = {
        title: {
            text: undefined,
        },
        credits: {
            enabled: false
        },
        series: [{
            type: "bubble",
            data: [
                { x: 95, y: 95, z: 13.8, name: 'BE' },
            ]
        }],
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        }
    }
    return <HighchartsReact
        highcharts={Highcharts}
        options={options}
    />
}

export default function Charts(props: ChartProps) {
    switch (props.type) {
        case "LINE": {
            return <LineChart />
        }
        case "BUBBLE": {
            return <BubbleChart />
        }
        default: {
            return <div>Not a Chart Type</div>
        }
    }
} 