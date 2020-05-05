import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import dashBoard from "./pages/dashboard";
import CollapsibleTable from "./pages/dashboardNew";
import './App.css'
export default class App extends React.Component {
  render() {
    return (
        <Router>
            <Route path="/dashboard" component={dashBoard}></Route>
            <Route path="/" exact component={CollapsibleTable}></Route>
            <Route path="/new" exact component={CollapsibleTable}></Route>
        </Router>
    );
  }
}
