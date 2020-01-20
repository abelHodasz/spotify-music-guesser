import React, { Component } from "react";
import Playlist from "./Playlist";
import PropTypes from  "prop-types";

export class Playlists extends Component {
    render() {
        return this.props.playlists.map(playlist => (
            <div key={playlist.id} style = {{display:"inline-block"} }>
            <Playlist key={playlist.id} playlist ={playlist} />
            </div>
        ));
    }
}

Playlists.propTypes = {
    playlists : PropTypes.array.isRequired
}

export default Playlists;
