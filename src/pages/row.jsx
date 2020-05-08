import React, { Component } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Collapse, Typography, Box } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CustomProgressBar from "./customProgressBar";
import MoreActions from "./moreActions";

export default class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            dialogOpen: false,
        };
    }
    openDialog = i => {
        this.props.openDialog(i);
    };
    editTableCellData = i => {
        this.props.editTableCellData(i);
    };
    deleteTableCellData = ind => {
        this.props.deleteRow(ind);
    };
    deleteSubVersion = ind => {
        this.props.deleteSubVersion(ind, this.props.index)
    }
    editSubVersion = (ind) => {
        this.props.editSubVersion(ind, this.props.index)
    }
    render() {
        const { row } = this.props;
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => this.setState({ open: !this.state.open })}
                        >
                            {this.state.open ? (
                                <KeyboardArrowUpIcon />
                            ) : (
                                    <KeyboardArrowDownIcon />
                                )}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.version}
                    </TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                        <CustomProgressBar progressValue={row.progress} />
                    </TableCell>
                    <TableCell>{row.startDate}</TableCell>
                    <TableCell>{row.releaseDate}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                        <MoreActions
                            index={this.props.index}
                            openDialog={this.openDialog}
                            editTableCellData={this.editTableCellData}
                            deleteTableCellData={this.deleteTableCellData}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Subversions
                                </Typography>
                                <Table size="small">
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
                                        {row.subVersions && row.subVersions.map((subVersion, index) => (
                                            <TableRow key={subVersion.version}>
                                                <TableCell />
                                                <TableCell component="th" scope="row">
                                                    {subVersion.version}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {subVersion.status}
                                                </TableCell>
                                                <TableCell>{subVersion.progress}</TableCell>
                                                <TableCell>{subVersion.startDate}</TableCell>
                                                <TableCell>{subVersion.releaseDate}</TableCell>
                                                <TableCell>{subVersion.description}</TableCell>
                                                <MoreActions
                                                    index={index}
                                                    isSubVersion={true}
                                                    openDialog={this.openDialog}
                                                    deleteSubVersion={this.deleteSubVersion}
                                                    editSubVersion={this.editSubVersion}
                                                    editTableCellData={
                                                        this.editTableCellData
                                                    }
                                                    deleteTableCellData={
                                                        this.deleteTableCellData
                                                    }
                                                />
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}