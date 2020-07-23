import './index.scss';
import React, { PureComponent } from 'react';
import { GridOptions, ColDef, GridReadyEvent, RowClickedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { withRouter, RouteComponentProps } from "react-router";
interface AlertsTableProps extends RouteComponentProps { }

interface AlertsTableStates {
    ColumnDefs: ColDef[];
    rowData: any[]
}

class AlertsTable extends PureComponent<AlertsTableProps, AlertsTableStates> {
    private gridOptions: GridOptions;
    constructor(props: AlertsTableProps) {
        super(props);
        this.state = {
            ColumnDefs: [],
            rowData: []
        }
        this.gridOptions = {
            suppressCellSelection: true,
            defaultColDef: {
                resizable: false,
                suppressMovable: true,
                editable: false,
                sortable: true,
                filter: false
            }
        }
    }

    static getDerivedStateFromProps(
        props: AlertsTableProps,
        state: AlertsTableStates
    ) {
        state.rowData = [
            {
                id: "1",
                alertName: "Capacity Detoriation",
                model: "Hum",
                vehicleId: "BLR 12345",
                time: "15-May-2020 10:05 AM",
                openSince: "24 hrs 10 mins",
                severity: "major",
                location: "Kolkata",
            },
            {
                id: "1",
                alertName: "Capacity Detoriation",
                model: "Hum",
                vehicleId: "BLR 12345",
                time: "15-May-2020 10:05 AM",
                openSince: "24 hrs 10 mins",
                severity: "major",
                location: "Kolkata",
            }, {
                id: "1",
                alertName: "Capacity Detoriation",
                model: "Hum",
                vehicleId: "BLR 12345",
                time: "15-May-2020 10:05 AM",
                openSince: "24 hrs 10 mins",
                severity: "major",
                location: "Kolkata",
            }, {
                id: "1",
                alertName: "Capacity Detoriation",
                model: "Hum",
                vehicleId: "BLR 12345",
                time: "15-May-2020 10:05 AM",
                openSince: "24 hrs 10 mins",
                severity: "major",
                location: "Kolkata",
            }, {
                id: "1",
                alertName: "Capacity Detoriation",
                model: "Hum",
                vehicleId: "BLR 12345",
                time: "15-May-2020 10:05 AM",
                openSince: "24 hrs 10 mins",
                severity: "major",
                location: "Kolkata",
            },
            {
                id: "1",
                alertName: "Capacity Detoriation",
                model: "Hum",
                vehicleId: "BLR 12345",
                time: "15-May-2020 10:05 AM",
                openSince: "24 hrs 10 mins",
                severity: "major",
                location: "Kolkata",
            },
            {
                id: "1",
                alertName: "Capacity Detoriation",
                model: "Hum",
                vehicleId: "BLR 12345",
                time: "15-May-2020 10:05 AM",
                openSince: "24 hrs 10 mins",
                severity: "major",
                location: "Kolkata",
            },
            {
                id: "1",
                alertName: "Capacity Detoriation",
                model: "Hum",
                vehicleId: "BLR 12345",
                time: "15-May-2020 10:05 AM",
                openSince: "24 hrs 10 mins",
                severity: "major",
                location: "Kolkata",
            },
            {
                id: "1",
                alertName: "Capacity Detoriation",
                model: "Hum",
                vehicleId: "BLR 12345",
                time: "15-May-2020 10:05 AM",
                openSince: "24 hrs 10 mins",
                severity: "major",
                location: "Kolkata",
            },
            {
                id: "1",
                alertName: "Capacity Detoriation",
                model: "Hum",
                vehicleId: "BLR 12345",
                time: "15-May-2020 10:05 AM",
                openSince: "24 hrs 10 mins",
                severity: "major",
                location: "Kolkata",
            },
            {
                id: "1",
                alertName: "Capacity Detoriation",
                model: "Hum",
                vehicleId: "BLR 12345",
                time: "15-May-2020 10:05 AM",
                openSince: "24 hrs 10 mins",
                severity: "major",
                location: "Kolkata",
            },
            {
                id: "1",
                alertName: "Capacity Detoriation",
                model: "Hum",
                vehicleId: "BLR 12345",
                time: "15-May-2020 10:05 AM",
                openSince: "24 hrs 10 mins",
                severity: "major",
                location: "Kolkata",
            },
            {
                id: "1",
                alertName: "Capacity Detoriation",
                model: "Hum",
                vehicleId: "BLR 12345",
                time: "15-May-2020 10:05 AM",
                openSince: "24 hrs 10 mins",
                severity: "major",
                location: "Kolkata",
            }, {
                id: "1",
                alertName: "Capacity Detoriation",
                model: "Hum",
                vehicleId: "BLR 12345",
                time: "15-May-2020 10:05 AM",
                openSince: "24 hrs 10 mins",
                severity: "major",
                location: "Kolkata",
            }
        ];
        state.ColumnDefs = [{
            headerName: "Alert Name",
            field: "alertName",
            autoHeight : true
        },
        {
            headerName: "Model",
            field: "model",
            autoHeight: true
        },
        {
            headerName: "Vehicle ID",
            field: "vehicleId",
            autoHeight: true
        },
        {
            headerName: "Time",
            field: "time",
            autoHeight: true
        },
        {
            headerName: "Open Since",
            field: "openSince",
            autoHeight: true
        },
        {
            headerName: "Severity",
            field: "severity",
            autoHeight: true
        },
        {
            headerName: "Location",
            field: "location",
            autoHeight: true
        }
        ]
        console.log("State", state);
        return state;
    }

    onGridReady = (event: GridReadyEvent) => {
        event.api.sizeColumnsToFit();
        event.api.resetRowHeights()
    }

    navigateTo = (target: string) => {
        this.props.history.push(target);
    };

    rowSelected = (event: RowClickedEvent) => {
        const data = event.data
        console.log(data)
        this.navigateTo("/" + data.id);
    }

    render() {
        return (
            <div
                className="ag-theme-material"
                style={{
                    width: "100%",
                    height: "90%"
                }}
            >
                <AgGridReact
                    {...this.gridOptions}
                    columnDefs={this.state.ColumnDefs}
                    rowData={this.state.rowData}
                    suppressDragLeaveHidesColumns={true}
                    enterMovesDown={true}
                    suppressRowClickSelection={true}
                    onGridReady={this.onGridReady}
                    pagination={true}
                    // paginationAutoPageSize={true}
                    paginationPageSize={10}
                    onRowClicked={this.rowSelected}
                    // gridAutoHeight={true}
                />
            </div>
        )
    }
}

export default withRouter(AlertsTable);