import React, { Component } from "react";
import "./App.css";
import Settings from "./pages/layout/Settings";
import Game from "./pages/layout/Game";
import Navbar from "./pages/layout/Navbar.js";
import { UserProvider } from "./UserContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <UserProvider>
                <Content />
            </UserProvider>
        );
    }
}

function Content() {
    return (
        <React.Fragment>
            <Navbar />
            <div className="page-container">
                <Router>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() => {
                                window.location.href = "http://localhost:8888";
                                return null;
                            }}
                        />
                        <Route path="/Settings" component={Settings} />
                        <Route path="/Game" component={Game} />
                    </Switch>
                </Router>
            </div>
        </React.Fragment>
    );
}

export default App;
