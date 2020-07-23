import React, { Component } from 'react';
import { Table, Select, Button } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import './aggrid.scss'
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
const { Option } = Select;

interface AppProps { }
interface AppState {
    rowData: any;
    columnDefs: any;
    defaultColDef: any;
    sortingOrder: any;
    rowClassRules?: any;
    pagination?: any;
}
const paginationDate = ['10', '20', '30'];

const columnDefs = [
    { headerName: 'Alert Name', field: 'alert', sortable: true },
    { headerName: 'Model', field: 'model', sortable: true, width: 150 },
    { headerName: 'Vehicle Id', field: 'vehicle', sortable: true },
    { headerName: 'Time', field: 'time', sortable: true },
    { headerName: 'Open Since', field: 'open', sortable: true },
    // icons: {
    //     sortAscending: `<span>${<ActiveSort />}</span>`,
    //     sortDescending: '<i class="fa fa-sort-alpha-down"/>',
    // },
    { headerName: 'Severity', width: 150, field: 'severity', sortable: true },
    { headerName: 'Location', width: 150, field: 'location', sortable: true }
]
let rowData: Array<object> = []

for (var i = 0; i < 50; i++) {
    rowData.push({
        alert: 'Capacity', time: '11-12-2020', severity: 'major',
        location: 'Bangalore 1', open: '24hrs 10min', vehicle: 'BLE123', model: 'hum'
    });
    rowData.push({
        alert: 'Voltage', time: '12-12-2020', severity: 'minor', model: 'kivo',
        location: 'Bangalore 2', open: '24hrs 20min', vehicle: 'BLE113'
    });
    rowData.push({
        alert: 'Battery', time: '14-12-2020', severity: 'critical', model: 'vivo',
        location: 'Bangalore 3', open: '24hrs 30min', vehicle: 'BLE223'
    })
    rowData.push({
        alert: 'Inactive', time: '13-12-2020', severity: 'major', model: 'Ice',
        location: 'Bangalore 1', open: '24hrs 10min', vehicle: 'BLE123'
    })
    rowData.push({
        alert: 'Voltage', time: '12-12-2020', severity: 'minor', model: 'kivo',
        location: 'Bangalore 2', open: '24hrs 20min', vehicle: 'BLE113'
    });
}


export default class App extends Component<AppProps, AppState> {
    [x: string]: any;
    constructor(props: any) {
        super(props);
        this.gridOptions = {}
        this.state = {
            rowData: rowData,
            columnDefs: columnDefs,
            defaultColDef: { sortable: true },
            sortingOrder: ['desc', 'asc', null],
            pagination: 10
            // rowClassRules: {
            //     rowEven: (params: any) => params.node.rowIndex % 2 === 0,
            //     rowOdd: (params: any) => params.node.rowIndex % 2 === 0,

            // }
        };
        this.onGridReady = this.onGridReady.bind(this);

    }
    onGridReady = (params: { api: any; columnApi: any; }) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };
    setDataValue = () => {
        this.gridApi.forEachNode(function (rowNode: any) {
            rowNode.setDataValue('time', <div>mf</div>);

        });
    }
    render() {
        // this.gridOptions.rowStyle = { background: '#2D3456' };
        // this.gridOptions.rowClass = 'ag-row-odd';
        // this.gridOptions.getRowClass = function (params: any) {
        //     if (params.node.rowIndex % 2 === 0) {
        //         return 'ag-row-even';
        //     }
        // }s

        // set background colour on even rows
        // again, this looks bad, should be using CSS classes
        // this.gridOptions.getRowStyle = function (params: any) {
        //     if (params.node.rowIndex % 2 === 0) {
        //         return { background: '#3C4473' };
        //     }
        // }
        return <>
            <div
                className="ag-theme-alpine"
                style={{ height: '400px', width: '', justifyContent: 'space-evenly' }}
            >
                <AgGridReact

                    gridOptions={this.gridOptions}
                    // rowClassRules={this.state.rowClassRules}
                    columnDefs={this.state.columnDefs}
                    defaultColDef={this.state.defaultColDef}
                    animateRows={true}
                    sortingOrder={this.state.sortingOrder}
                    accentedSort={true}
                    rowData={this.state.rowData}
                    onGridReady={this.onGridReady}

                />
            </div>
            <div className="ag-theme-footer">
                <Select
                    defaultValue={this.state.pagination}
                >
                    {paginationDate.map(page => (
                        <Option key={page} value={page} title={page}>{page}</Option>
                    ))}
                </Select>
            </div>


        </>;
    }
}