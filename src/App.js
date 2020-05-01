import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import dashBoard from "./pages/dashboard";
import './App.css'
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path="/dashboard" component={dashBoard}></Route>
            <Route path="/" exact component={dashBoard}></Route>
          </div>
        </Router>
      </div>
    );
  }
}
