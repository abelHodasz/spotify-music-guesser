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

    const ourPlaylists = (
        <Suspense fallback={<div>Loading...</div>}>
            <Playlists
                select={playlist => select(playlist)}
                playlistIds={[
                    "6rPJEvKov30LC3QvhmudPS?si=VDXZWUKeRPGa8W0G8bjaLg",
                    "2H66cUDkZdAYa0V7Fi5u4H?si=ojp4M4SKSpqZ4U7P_MoBOg",
                    "6kRCTRnpt8MvpA67T5NVQl?si=eqKx5Am3QgCof92i9FBZBw",
                    "5LLznXbDPm7EocFta4heXz?si=6ovNEfB0QJmh1QzBUH0OiA",
                    "6wEcUd48U0rkSeyOMij4KZ?si=es_7m-JASIioG1Pra8cbCw"
                ]}
            />
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
                    onClick={() => setOption(options.OURPLAYLISTS)}
                >
                    Music Guesser Playlists
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
            return <Container>{ourPlaylists}</Container>;
        default:
            return <Container></Container>;
    }
}
