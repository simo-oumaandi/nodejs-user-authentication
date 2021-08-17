// ⛏️⛏️ MAIN APP FILE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import React, { Component } from 'react';
import { hostname } from "./utils/global";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false };
  }
  authValidation = (isAuthenticated) => {
    this.setState({ isAuthenticated })
  }

  async componentDidMount() {
    // console.log("Authinticated - ", this.state.isAuthenticated);
    // fetch()
    const response = await fetch(`${hostname}/api/admin/dashboard`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    });
    const textRes = await response.text();
    const jsonRes = await JSON.parse(textRes);
    console.log(jsonRes.user);
    if (jsonRes.user) {
      this.setState({ isAuthenticated: true });
    } else {
      this.setState({ isAuthenticated: false });
    }
  }
  render() {
    return (
      <div className="App">
        <Navbar authValidation={this.authValidation} isAuthenticated={this.state.isAuthenticated} />
        <Switch>
          <Route exact path="/home"><Home /></Route>
          <Route exact path="/admin">
            {this.state.isAuthenticated ? <Redirect to="/admin/dashboard" /> : <Admin authValidation={this.authValidation} isAuthenticated={this.state.isAuthenticated} />}
          </Route>
          <Route exact path="/admin/dashboard">
            {this.state.isAuthenticated ? <Dashboard authValidation={this.authValidation} isAuthenticated={this.state.isAuthenticated} /> : <Redirect to="/admin" />}
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;






