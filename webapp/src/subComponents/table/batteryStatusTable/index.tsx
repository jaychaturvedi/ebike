import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const StyledTableRow = withStyles(() => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "#343c63",
        },
        '&:nth-of-type(even)': {
            backgroundColor: "#2D3456",
        },
    },
}))(TableRow);


interface Column {
    id: 'name' | 'size';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'name', label: 'Parameters', minWidth: 170 },
    {
        id: 'size',
        label: 'Values',
        minWidth: 50,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    }
];

interface Data {
    name: string;
    size: number;
}

function createData(name: string, size: number): Data {
    return { name, size };
}

const rows = [
    createData('BMS LIFE', 3287263),
    createData('CHARGE STATUS', 9596961),
    createData('CHARGE STATUS', 301340),
    createData('LOAD STATUS', 9833520),
    createData('CHARGE DISCHARGE CYCLE COUNT', 9984670),
    createData('CELL EQULIBRIUM STATUS', 7692024),
    createData('CHARGING MOST TUBE STATUS', 357578),
    createData('DISCHARGING MOST TUBE STATUS', 70273),
    createData('RUNNING CURRENT', 1972550),
    createData('LOAD STATUS', 9833520),
    createData('France', 640679),
    createData('United Kingdom', 242495),
    createData('Russia', 17098246),
    createData('Nigeria', 923768),
    createData('Brazil', 8515767),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        '&:nth-of-type(odd)': {
            backgroundColor: "#343c63",
        },
        '&:nth-of-type(even)': {
            backgroundColor: "#2D3456",
        },
    },
    container: {

        maxHeight: '37vh',
    },
});

export default function StickyHeadTable() {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader size="small" aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        backgroundColor: "#707dc2",
                                        color: "#ffffff"
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (
                                <StyledTableRow key={row.name}>
                                    <TableCell key={'name'}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right" key={'size'}>{row.size}</TableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

// const StyledTableCell = withStyles((theme) => ({
//     head: {
//         backgroundColor: "#707dc2",
//         color: "#ffffff",
//         padding: '4px',
//         border: 'none'
//     },
//     body: {
//         fontSize: 14,
//         color: 'white',
//         padding: '4px',
//         border: 'none',
//     },
// }))(TableCell);