import React from "react";
import CustomDialog from "./customDialog";
import MenuItem from "@material-ui/core/MenuItem";
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
import EditIcon from "@material-ui/icons/Edit";
import "../App.css";
import MoreActions from "./moreActions";
import CustomProgressBar from "./customProgressBar";
import Draggable from "react-draggable";
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
        MuiPaper: {
            elevation1: {
                margin: "0 3%",
                maxHeight: "490px",
                overflowY: "scroll"
            }
        }
    }
    //   typography: {
    //     useNextVariants: true
    //   }
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
const statuses = [
    {
        value: "IN PROGRESS",
        label: "IN PROGRESS"
    },
    {
        value: "RELEASED",
        label: "RELEASED"
    },
    {
        value: "UNRELEASED",
        label: "UNRELEASED"
    }
];
export default class Dashboard extends React.Component {
    state = {
        version: "",
        startDate: "",
        releaseDate: "",
        description: "",
        status: "IN PROGRESS",
        progress: "0%",
        isEditButton: false,
        index: "",
        rows: []
    };
    addDataToTheTable = event => {
        try {
            event.preventDefault();
            if (!this.state.version) {
                alert("version cannot be empty..!");
            } else if (!this.state.startDate) {
                alert("Start Date cannot be empty..!");
            } else if (!this.state.releaseDate) {
                alert("Release Date cannot be empty..!");
            } else if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(this.state.startDate)) {
                alert("Invalid Start Date Format..!");
            } else if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(this.state.releaseDate)) {
                alert("Invalid Release Date Format..!");
            } else if (this.state.startDate >= this.state.releaseDate) {
                alert("Release Date should greater than Start Date..!");
            } else {
                const { version, startDate, releaseDate, description } = this.state;
                let rowData = this.state.rows;
                rowData.push(
                    this.createData(version, startDate, this.state.progress, releaseDate, description)
                );
                this.setState({
                    rows: rowData,
                    version: "",
                    startDate: "",
                    releaseDate: "",
                    description: "",
                    dialogOpen: false,
                    isEditButton: false
                });
            }
        } catch (err) {
            console.log("error at addDataToTheTable");
        }
    };
    updateTableCellData = event => {
        try {
            event.preventDefault();
            if (!this.state.version) {
                alert("version cannot be empty..!");
            } else if (!this.state.startDate) {
                alert("Start Date cannot be empty..!");
            } else if (!this.state.releaseDate) {
                alert("Release Date cannot be empty..!");
            } else if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(this.state.startDate)) {
                alert("Invalid Start Date Format..!");
            } else if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(this.state.releaseDate)) {
                alert("Invalid Release Date Format..!");
            } else if (this.state.startDate >= this.state.releaseDate) {
                alert("Release Date should greater than Start Date..!");
            } else {
                const {
                    version,
                    startDate,
                    releaseDate,
                    description,
                    progress
                } = this.state;
                let rowData = this.state.rows;
                rowData[this.state.index] = this.createData(
                    version,
                    startDate,
                    progress,
                    releaseDate,
                    description,
                );
                this.setState({
                    rows: rowData,
                    version: "",
                    startDate: "",
                    releaseDate: "",
                    description: "",
                    dialogOpen: false,
                    status: "IN PROGRESS",
                    progress: "0%",
                    isEditButton: false
                });
            }
        } catch (err) {
            console.log("error at updateTableCellData");
        }
    };
    updateTableData = ({ target: { name, value } }) => {
        if (name === "status" && value === "RELEASED") {
            this.setState({
                progress: "100%"
            });
        } else if (name === "status" && value === "UNRELEASED") {
            this.setState({
                progress: "60%"
            });
        }
        this.setState({
            [name]: value
        });
    };
    createData = (version, startDate, progress, releaseDate, description) => {
        const { status } = this.state;
        return { version, status, progress, startDate, releaseDate, description };
    };
    deleteTableCellData = ind => {
        let rowData = this.state.rows;
        rowData.splice(ind, 1);
        this.setState({
            rows: rowData
        });
    };
    handleEnter = event => {
        try {
            if (event.key === "Enter") {
                event.preventDefault();
                this.addDataToTheTable(event);
            }
        } catch (err) {
            console.log("error at handleEnter");
        }
    };
    closeDialog = () => {
        this.setState({
            dialogOpen: false,
            version: "",
            startDate: "",
            releaseDate: "",
            description: "",
            isEditButton: false
        });
    };
    textFieldData = () => (
        <div
            className={this.state.dialogOpen ? "addEditTextField" : "textfieldRow"}
        >
            <TextField
                type="text"
                required
                label="Version"
                name="version"
                value={this.state.version}
                placeholder="Version"
                onChange={this.updateTableData}
                onKeyPress={this.handleEnter}
                variant="outlined"
                InputProps={{
                    disableUnderline: true
                }}
            />
            <TextField
                type="text"
                required
                name="startDate"
                label="StartDate"
                value={this.state.startDate}
                placeholder="Start Date"
                onChange={this.updateTableData}
                onKeyPress={this.handleEnter}
                variant="outlined"
                InputProps={{
                    disableUnderline: true
                }}
            />
            <TextField
                type="text"
                required
                name="releaseDate"
                label="ReleaseDate"
                value={this.state.releaseDate}
                placeholder="Release Date"
                onChange={this.updateTableData}
                onKeyPress={this.handleEnter}
                variant="outlined"
                InputProps={{
                    disableUnderline: true
                }}
            />
            <TextField
                type="text"
                required
                name="description"
                label="Description"
                value={this.state.description}
                placeholder="Description"
                onChange={this.updateTableData}
                onKeyPress={this.handleEnter}
                variant="outlined"
                InputProps={{
                    disableUnderline: true
                }}
            />
            {this.state.isEditButton && (
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Status"
                    name="status"
                    value={this.state.status}
                    onChange={this.updateTableData}
                    helperText="Please select version status"
                    variant="outlined"
                >
                    {statuses.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}
            {this.state.isEditButton ? (
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={this.updateTableCellData}
                >
                    Update
                </Button>
            ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PlusIcon />}
                        onClick={this.addDataToTheTable}
                    >
                        Add
                    </Button>
                )}
        </div>
    );
    openDialog = dialogOpen => {
        this.setState({
            dialogOpen
        });
    };
    editTableCellData = i => {
        const { rows } = this.state;
        this.setState({
            dialogOpen: true,
            isEditButton: true,
            version: rows[i].version,
            startDate: rows[i].startDate,
            releaseDate: rows[i].releaseDate,
            description: rows[i].description,
            index: i
        });
    };
    render() {
        const { rows, dialogOpen } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <div
                    style={{
                        width: "100%",
                        backgroundColor: "#fff"
                    }}
                >
                    <AppBar position="static" align="center">
                        <div id="appBar">
                            <div style={{ padding: "20px 0px 10px 20px" }}>
                                {/* <marquee behavior="slide" direction="left" scrollamount="30"> */}
                                <img
                                    src={require("../Assets/images/logward.png")}
                                    alt="logward icon"
                                />
                                {/* </marquee> */}
                                <div id="heading">Version Releases</div>
                            </div>
                        </div>
                    </AppBar>
                    <div className="table-wrapper">
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
                                            {rows && !rows.length ? (
                                                <p
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        color: "tomato"
                                                    }}
                                                >
                                                    There is no data to display...!
                        </p>
                                            ) : (
                                                    rows.map((row, index) => {
                                                        return (
                                                            <Draggable
                                                                // axis="y"
                                                                defaultPosition={{ x: 0, y: 0 }}
                                                            // position={null}
                                                            >
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
                                                                                        openDialog={this.openDialog}
                                                                                        editTableCellData={
                                                                                            this.editTableCellData
                                                                                        }
                                                                                        deleteTableCellData={
                                                                                            this.deleteTableCellData
                                                                                        }
                                                                                    />
                                                                                ) : column.id === "progress" ? (
                                                                                    <CustomProgressBar
                                                                                        progressValue={row.progress}
                                                                                    />
                                                                                ) : (
                                                                                            value
                                                                                        )}
                                                                            </TableCell>
                                                                        );
                                                                    })}
                                                                </TableRow>
                                                            </Draggable>
                                                        );
                                                    })
                                                )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </div>
                        {dialogOpen ? (
                            <CustomDialog
                                title={
                                    this.state.isEditButton
                                        ? "Update table data"
                                        : "Add table data"
                                }
                                open={dialogOpen}
                                onClose={this.closeDialog}
                                contentStyle={{
                                    maxWidth: "700px",
                                    height: "35vh",
                                    padding: "16px 0 16px",
                                    transform: "none"
                                }}
                            >
                                {this.textFieldData()}
                            </CustomDialog>
                        ) : (
                                this.textFieldData()
                            )}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}