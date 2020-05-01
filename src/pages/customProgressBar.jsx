import React, { Component } from 'react';
export default class CustomProgressBar extends Component {
    render() {
        return (
            <div className="progress-wrapper">
                <div className="status-bar">
                <div className="status" style={{width: this.props.progressValue}}></div>
                </div>
            </div>
        )
    }
}