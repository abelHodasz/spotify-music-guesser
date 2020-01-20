import React from "react";
import Playlists from '../Playlists';
import { Context } from "../../context";
import Game from "./Game";
import { BrowserRouter as Router,Link, Route, Switch } from "react-router-dom";

export default class Settings extends React.Component {
    static contextType = Context;
    state = {
        selectedPlaylists: []
    };

    componentDidMount() {}

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <React.Fragment>
                        <p>Access Token : {context.state.accessToken}</p>
                        <p>Number of playlists : {context.state.playlists.length}</p>
                        <Link to="/game" >Start game</Link>
                        <Playlists playlists = {context.state.playlists}/>
                    </React.Fragment>
                )}
            </Context.Consumer>
        );
    }
}