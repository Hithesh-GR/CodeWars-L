import React from "react";
import CustomDialog from "./customDialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Paper
} from "@material-ui/core";
import Row from "./row";
import {
    TextField,
    Button,
    MenuItem,
    AppBar,
    createMuiTheme,
    MuiThemeProvider
} from "@material-ui/core";
import PlusIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import "../App.css";

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
});

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
export default class CollapsibleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            rows: [],
            version: "",
            startDate: "",
            releaseDate: "",
            description: "",
            status: "IN PROGRESS",
            progress: "0%",
            addItemIndex: 0,
            updateSubVersions: false,
            rowIndex: null,
            subversionRowIndex: null,
            subVersionAdd: false,
        };
    }
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
    addDataToTheTable = event => {
        const { version, startDate, releaseDate } = this.state;
        event.preventDefault();
        if (!version) {
            alert("Enter required input fields data..!");
        } else if (!startDate) {
            alert("Start Date cannot be empty..!");
        } else if (!releaseDate) {
            alert("Release Date cannot be empty..!");
        } else if (
            !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(
                startDate
            )
        ) {
            alert("Invalid Start Date Format..!");
        } else if (
            !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(
                releaseDate
            )
        ) {
            alert("Invalid Release Date Format..!");
        } else if (startDate > releaseDate) {
            alert("Release Date should greater than Start Date..!");
        } else {
            const { version, startDate, releaseDate, description } = this.state;
            let rowData = this.state.rows;
            if (this.state.subVersionAdd) {
                rowData[this.state.addItemIndex].subVersions = rowData[this.state.addItemIndex].subVersions || [];
                rowData[this.state.addItemIndex].subVersions.push(
                    this.createData(
                        version,
                        startDate,
                        this.state.progress,
                        releaseDate,
                        description
                    )
                );
                console.log("data", rowData)
            } else {
                rowData.push(
                    this.createData(
                        version,
                        startDate,
                        this.state.progress,
                        releaseDate,
                        description
                    )
                );
            }
            console.log("data", rowData)
            this.setState({
                rows: rowData,
                version: "",
                startDate: "",
                releaseDate: "",
                description: "",
                dialogOpen: false,
                subVersionAdd: false,
                isEditButton: false
            });
            console.log("thisstate", this.state.rows)
        }
    };
    createData = (version, startDate, progress, releaseDate, description) => {
        const { status } = this.state;
        if (this.state.subVersionAdd) {
            return { version, status, progress, startDate, releaseDate, description };
        } else {
            return {
                version,
                status,
                progress,
                startDate,
                releaseDate,
                description,
                subVersions: []
            };
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
    updateTableCellData = event => {
        try {
            const { version, startDate, releaseDate } = this.state;
            event.preventDefault();
            if (!version) {
                alert("Version cannot be empty..!");
            } else if (!startDate) {
                alert("Start Date cannot be empty..!");
            } else if (!releaseDate) {
                alert("Release Date cannot be empty..!");
            } else if (
                !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(
                    startDate
                )
            ) {
                alert("Invalid Start Date Format..!");
            } else if (
                !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(
                    releaseDate
                )
            ) {
                alert("Invalid Release Date Format..!");
            } else if (startDate > releaseDate) {
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
                console.log("ro", this.state.rows)
                rowData[this.state.index] = this.createData(
                    version,
                    startDate,
                    progress,
                    releaseDate,
                    description
                );
                console.log("this.state.rows[this.state.index].subVersions;", this.state.rows)
                rowData[this.state.index].subVersions = this.state.rows[this.state.index].subVersions;
                console.log("rowdata", rowData)
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
    updateSubVersions = () => {
        console.log("yes in pudated", this.state.subversionRowIndex, this.state.rowIndex)
        const {
            version,
            startDate,
            releaseDate,
            description,
            progress
        } = this.state;
        let rowData = this.state.rows;
        rowData[this.state.rowIndex].subVersions[this.state.subversionRowIndex] = this.createData(
            version,
            startDate,
            progress,
            releaseDate,
            description
        );
        this.setState({
            rows: rowData,
            version: "",
            startDate: "",
            releaseDate: "",
            description: "",
            dialogOpen: false,
            rowIndex: null,
            subVersionIndex: null,
            updateSubVersions: false,
            status: "IN PROGRESS",
            progress: "0%",
            isEditButton: false
        });
    }
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
                    onClick={this.state.updateSubVersions ? this.updateSubVersions : this.updateTableCellData}
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
    deleteRow = ind => {
        let rowData = this.state.rows;
        rowData.splice(ind, 1);
        this.setState({
            rows: rowData
        });
    };
    deleteSubVersion = (subVersionIndex, index) => {
        let rowData = this.state.rows;
        rowData[index].subVersions.splice(subVersionIndex, 1);
        this.setState({
            rows: rowData
        });
    }
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
    editSubVersion = (subVersionIndex, i) => {
        const { rows } = this.state;
        this.setState({
            dialogOpen: true,
            isEditButton: true,
            updateSubVersions: true,
            subversionRowIndex: subVersionIndex,
            rowIndex: i,
            version: rows[i].subVersions[subVersionIndex].version,
            startDate: rows[i].subVersions[subVersionIndex].startDate,
            releaseDate: rows[i].subVersions[subVersionIndex].releaseDate,
            description: rows[i].subVersions[subVersionIndex].description,
            index: i
        });
    }
    openDialog = i => {
        this.setState({
            dialogOpen: true,
            subVersionAdd: true,
            addItemIndex: i
        });
    };
    render() {
        return (
            <MuiThemeProvider theme={theme}>
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
                    <TableContainer component={Paper} style={{ margin: "0px" }}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Version</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Progress</TableCell>
                                    <TableCell>Start Date </TableCell>
                                    <TableCell>Release Date</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!this.state.rows.length ? (
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
                                        this.state.rows.map((row, index) => (
                                            <Row
                                                key={row.version}
                                                row={row}
                                                index={index}
                                                deleteRow={this.deleteRow}
                                                openDialog={this.openDialog}
                                                editTableCellData={this.editTableCellData}
                                                deleteSubVersion={this.deleteSubVersion}
                                                editSubVersion={this.editSubVersion}
                                            />
                                        ))
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                {this.state.dialogOpen ? (
                    <CustomDialog
                        title={
                            this.state.isEditButton ? "Update table data" : "Add sub versions"
                        }
                        open={this.state.dialogOpen}
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
            </MuiThemeProvider>
        );
    }
}