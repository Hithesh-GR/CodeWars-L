import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

export default class MoreActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.hideMenuItems)
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.hideMenuItems)
    }
    showMenuItems = e => {
        this.setState({
            anchorEl: e.currentTarget
        });
    };
    editTableCell = () => {
        this.hideMenuItems();
    };
    deleteTableCell = () => {
        this.props.deleteTableCellData(this.props.index);
        this.hideMenuItems();
    };
    hideMenuItems = () => {
        this.setState({
            anchorEl: null
        });
    }
    render() {
        const { anchorEl } = this.state;
        return (
            <>
                <div>
                    <span className="moreActions">
                        <MoreHorizIcon
                            aria-controls="action-menu"
                            onClick={this.showMenuItems}
                        />
                    </span>
                </div>
                <Menu
                    id="action-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.editTableCell}>Add</MenuItem>
                    <MenuItem onClick={this.editTableCell}>Edit</MenuItem>
                    <MenuItem onClick={this.deleteTableCell}>Delete</MenuItem>
                </Menu>
            </>
        );
    }
}