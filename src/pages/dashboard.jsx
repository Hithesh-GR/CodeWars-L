import React from "react";
import {
    createMuiTheme,
    MuiThemeProvider,
    Paper,
    AppBar,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import PlusIcon from "@material-ui/icons/Add";
import "../App.css";
import MoreActions from "./moreActions";
import CustomProgressBar from "./customProgressBar";
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                color: "#fff",
                backgroundColor: "#fff"
            },
            root: {
                height: "fit-content"
            }
        },
        MuiFilledInput: {
            input: {
                padding: "10px 50px 10px"
            }
        }
    },
    typography: {
        useNextVariants: true
    }
});
const columns = [
    { id: "version", label: "Version", minWidth: 150 },
    { id: "status", label: "Status", minWidth: 150 },
    {
        id: "progress",
        label: "Progress",
        minWidth: 150
    },
    {
        id: "startDate",
        label: "Start Date",
        minWidth: 100
    },
    {
        id: "releaseDate",
        label: "Release Date",
        minWidth: 100
    },
    {
        id: "description",
        label: "Description",
        minWidth: 170
    },
    {
        id: "action",
        label: "Action",
        minWidth: 100
    }
];

export default class Dashboard extends React.Component {
    state = {
        version: "",
        startDate: "",
        releaseDate: "",
        description: "",
        status: "Released",
        progress: "60%",
        rows: []
    };
    addDataToTheTable = () => {
        const { version, startDate, releaseDate, description } = this.state;
        let rowData = this.state.rows;
        rowData.push(this.createData(version, startDate, releaseDate, description));
        console.log("rowd", rowData);
        this.setState({
            rows: rowData,
            version: "",
            startDate: "",
            releaseDate: "",
            description: ""
        });
    };
    updateTableData = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        });
    };
    createData = (version, startDate, releaseDate, description) => {
        const { status, progress } = this.state;
        return { version, status, progress, startDate, releaseDate, description };
    };
    deleteTableCellData = ind => {
        console.log("inde", ind);
        let rowData = this.state.rows;
        rowData.splice(ind, 1);
        this.setState({
            rows: rowData
        });
    };
    //   setTableCell = (columnId, index, value) => {
    //     if (columnId === "action") {
    //       return (
    //         <MoreActions
    //           index={index}
    //           deleteTableCellData={this.deleteTableCellData}
    //         />
    //       );
    //     }
    //     else if(columnId === "progress"){
    //         return(
    //             <CustomProgressBar
    //             progressValue={this.state.progress}
    //           />
    //         )
    //     }else if(columnId === "status"){
    //         const status = this.state.progress <=100 && (this.state.progress === 0? "In Progress": this.state.progress >= 1 && this.state.progress<=99?"Unreleased":"Released"); 
    //         return (
    //             status
    //         )
    //     }else {
    //         return value
    //     }
    //   };
    render() {
        const { rows } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        height: "100vh",
                        flexWrap: "wrap",
                        backgroundColor: "#fff"
                    }}
                >
                    <AppBar position="static" align="center">
                        <div id="appBar">
                            <div style={{ padding: "20px 0px 10px 20px" }}>
                                <marquee behavior="slide" direction="left" scrollamount="30">
                                    <img
                                        src={require("../Assets/images/logward.png")}
                                        alt="logward icon"
                                    />
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
                                                {columns.map(column => (
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
                                            {rows &&
                                                rows.map((row, index) => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={index}
                                                        >
                                                            {columns.map(column => {
                                                                const value = row[column.id];
                                                                return (
                                                                    <TableCell key={column.id}>
                                                                        {column.id === "action" ? (
                                                                            <MoreActions
                                                                                index={index}
                                                                                deleteTableCellData={
                                                                                    this.deleteTableCellData
                                                                                }
                                                                            />
                                                                        ) : column.id === "progress" ? (
                                                                            <CustomProgressBar
                                                                                progressValue={this.state.progress}
                                                                            />
                                                                        ) : (
                                                                                    value
                                                                                )}
                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </div>
                        <div className="textfieldRow">
                            <div>
                                <TextField
                                    type="text"
                                    name="version"
                                    value={this.state.version}
                                    placeholder="Version name"
                                    onChange={this.updateTableData}
                                    variant="filled"
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    type="text"
                                    name="startDate"
                                    value={this.state.startDate}
                                    placeholder="Start Date"
                                    onChange={this.updateTableData}
                                    variant="filled"
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    type="text"
                                    name="releaseDate"
                                    value={this.state.releaseDate}
                                    placeholder="Release Date"
                                    onChange={this.updateTableData}
                                    variant="filled"
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    type="text"
                                    name="description"
                                    value={this.state.description}
                                    placeholder="Description"
                                    onChange={this.updateTableData}
                                    variant="filled"
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                />
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<PlusIcon />}
                                    onClick={this.addDataToTheTable}
                                >
                                    Add
                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}