import { Line, Bubble, defaults } from "react-chartjs-2"
import React from "react"
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import { ChartPoint } from "chart.js";

//This code is required to show labels on bubble chart
defaults.global.plugins! = {
    ...defaults.global.plugins!,
    ChartDataLabels
}

interface ChartProps {
    type: "LINE" | "BUBBLE"
}

function LineChart() {

    const lineChartdata = {
        labels: ['January', 'February', 'March',
            'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
            }
        ]
    }
    return (
        <Line data={lineChartdata} options={{
            title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20
            },
            legend: {
                display: true,
                position: 'left'
            }
        }}></Line>
    )
}


function BubbleChart() {

    const bubbleChartdata: Chart.ChartData = {
        
        // labels: ["Company 1", "Company 2", "Company 3", "Company 4"],
        // datasets: [{
        //     // label: ["Company 1", "Company 2", "Company 3", "Company 4"],
        //     backgroundColor: ['#4d4a49', '#d1cccb', '#4d4a49', '#d1cccb'],
        //     data: [{ x: 5, y: 10, r: 10 }, { x: 15, y: 3, r: 15 }, { x: 7, y: 15, r: 30 }, { x: 25, y: 5, r: 10 }],
        // }]
        datasets: [
            {
                label: "company1",
                backgroundColor: "#4d4a49",
                data: [{ x: 5, y: 10, r: 10 }]
            },
            {
                label: "company2",
                backgroundColor: "#d1cccb",
                data: [{ x: 15, y: 3, r: 15 }]
            },
            {
                label: "company3",
                backgroundColor: "#4d4a49",
                data: [{ x: 7, y: 15, r: 30 }]
            },
            {
                label: "company4",
                backgroundColor: "#d1cccb",
                data: [{ x: 25, y: 5, r: 10 }]
            },
        ]
    }
    return <Bubble data={bubbleChartdata}
        options={{
            maintainAspectRatio: false,
            legend: {
                display: true,
                labels: {
                    boxWidth: 2,
                },
            },
            plugins: {
                datalabels:{
                    color:"white"
                }
            }
        }}
    ></Bubble>
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