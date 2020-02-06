import React, { Suspense, Fragment, useState, useContext } from "react";
import { Container } from "@material-ui/core";
import Playlists from "./Playlists";
import TooltipButton from "../util/TooltipButton";

export default function SelectPlaylists(props) {
    const options = {
        OURPLAYLISTS: "ourPlaylists",
        YOURPLAYLISTS: "yourPlaylists",
        SELECTOPTIONS: "selectOptions"
    };
    const [option, setOption] = useState(options.SELECTOPTIONS);

    const select = playlist => {
        let index = props.playlists.indexOf(playlist);
        if (index !== -1) {
            props.setPlaylists(
                props.playlists
                    .slice(0, index)
                    .concat(
                        props.playlists.slice(index + 1, props.playlists.length)
                    )
            );
        } else {
            props.setPlaylists(props.playlists.concat(playlist));
        }
    };

    const ownPlaylists = (
        <Suspense fallback={<div>Loading...</div>}>
            <Playlists select={playlist => select(playlist)} />
        </Suspense>
    );
    const selectOptions = (
        <Fragment>
            <h2>Choose what music do you want to hear!</h2>
            <div className="select-playlist-buttons">
                <TooltipButton
                    containerClassName="playlist-type-button"
                    placement="top"
                    tooltip="Choose from your playlists, and try to guess your music!"
                    variant="outlined"
                    color="primary"
                    onClick={() => setOption(options.YOURPLAYLISTS)}
                >
                    Your Playlists
                </TooltipButton>
                <TooltipButton
                    containerClassName="playlist-type-button"
                    placement="top"
                    tooltip="Play a game with a playlist we prepared. Contains classic songs that everybody knows!"
                    variant="outlined"
                    color="secondary"
                >
                    Our Playlists
                </TooltipButton>
            </div>
        </Fragment>
    );


    switch (option) {
        case options.SELECTOPTIONS:
            return <Container>{selectOptions}</Container>;
        case options.YOURPLAYLISTS:
            return <Container>{ownPlaylists}</Container>;
        case options.OURPLAYLISTS:
            return <Container>Click Next to continue</Container>;
        default:
            return <Container></Container>;
    }
}
