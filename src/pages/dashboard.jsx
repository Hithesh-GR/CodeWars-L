import React from 'react';
import { createMuiTheme, MuiThemeProvider, Paper, AppBar, TextField, Button,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow } from '@material-ui/core';
import PlusIcon from '@material-ui/icons/Add';
import '../App.css'
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                color: "#fff",
                backgroundColor: "ivory"
            },
            root: {
                height: "fit-content"
            }
        },
        MuiFilledInput: {
            input: {
                padding: "10px 50px 10px"
            }
        },
    },
    typography: {
        useNextVariants: true,
    },
})
const columns = [
    { id: 'Version', label: 'Version', minWidth: 150 },
    { id: 'Status', label: 'Status', minWidth: 150 },
    {
        id: 'Progress',
        label: 'Progress',
        minWidth: 150
    },
    {
        id: 'Start Date',
        label: 'Start Date',
        minWidth: 100
    },
    {
        id: 'Release Date',
        label: 'Release Date',
        minWidth: 100
    },
    {
        id: 'Description',
        label: 'Description',
        minWidth: 170
    },
    {
        id: 'Action',
        label: 'Action',
        minWidth: 100
    },
];
  
export default class Dashboard extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "100vh",
                    flexWrap: "wrap",
                    backgroundColor: "ivory"
                }}>
                    <AppBar position="static" align="center">
                        <div id="appBar">
                            <div style={{ padding: "20px 0px 10px 20px" }}>
                                <marquee behavior="slide" direction="left" scrollamount="30">
                                    {/* <span id="heading">Welcome to Logward...!!</span> */}
                                    <img src={require("../Assets/images/logward.png")} alt="logward icon" />
                                </marquee>
                                <div id="heading">Releases</div>
                            </div>
                        </div>
                    </AppBar>
                    <div>
                        <div>
                            <Paper>
                                <TableContainer>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                /> */}
                            </Paper>
                        </div>
                        <div className="textfieldRow">
                            <div>
                                <TextField
                                    type="textfield"
                                    // value={this.state.message}
                                    placeholder="Version name"
                                    // onChange={this.handleMessage}
                                    variant="filled"
                                    // onKeyPress={this.handleEnter}
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    type="textfield"
                                    // value={this.state.message}
                                    placeholder="Start Date"
                                    // onChange={this.handleMessage}
                                    variant="filled"
                                    // onKeyPress={this.handleEnter}
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    type="textfield"
                                    // value={this.state.message}
                                    placeholder="Release Date"
                                    // onChange={this.handleMessage}
                                    variant="filled"
                                    // onKeyPress={this.handleEnter}
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    type="textfield"
                                    // value={this.state.message}
                                    placeholder="Description"
                                    // onChange={this.handleMessage}
                                    variant="filled"
                                    // onKeyPress={this.handleEnter}
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                />
                            </div>
                            <div>
                                <Button variant="contained" color="primary" startIcon={<PlusIcon />}>
                                    Add
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}