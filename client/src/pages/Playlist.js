import React, { Component } from "react";
import PropTypes from "prop-types";
import { Box, Tooltip, Fab } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export class Playlist extends Component {
    state = {
        selected: false,
        image: this.props.playlist.images[0]
            ? this.props.playlist.images[0]
            : ""
    };

    getStyle = () => {
        let style = {
            textOverflow: "ellipsis",
            display: "inline-block",
            whiteSpace: "wrap",
            overflow: "hidden",
            cursor: "pointer",
            width: 200,
            height: 335,
            margin: 10,
            border: "1px solid #DBDBDB",
            borderRadius: "1px",
            backgroundColor: "#ffffff"
        };
        if (this.state.selected) {
            style.background =
                "rgb(148,246,246) radial-gradient(circle, rgba(148,246,246,1) 0%, rgba(211,251,251,1) 100%)";
        }
        return style;
    };

    render() {
        var anchor = /<a[\s]+([^>]+)>((?:.(?!<\/a>))*.)<\/a>/;
        let description = this.props.playlist.description;
        for (var i = 0; i < 3; i++) {
            description = description.replace(anchor, (p1, p2, p3) => p3);
        }
        description = description.replace(/&quot;/g, '"');
        const playlistImage = (
            <img
                src={this.state.image.url}
                height="200"
                width="200"
                alt=""
            ></img>
        );
        return (
            <Box
                component="span"
                onClick={() => {
                    this.props.select();
                    this.setState({ selected: !this.state.selected });
                }}
                style={this.getStyle()}>
                <h2>{this.props.playlist.name}</h2>
                {playlistImage}
                <p className="block-with-text">{description}</p>
            </Box>
        );
    }
}

/*
<Tooltip title="Add" aria-label="select">
        <AddCircleIcon />
</Tooltip>
*/

Playlist.propTypes = {
    playlist: PropTypes.object.isRequired
};

export default Playlist;
