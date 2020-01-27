import React, { Suspense, useState } from "react";
import Playlists from "../Playlists";
import { Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const Settings = () => {
    console.log("Render Settings");
    const [playlists, setPlaylists] = useState([]);

    const select = playlist => {
        let index = playlists.indexOf(playlist);
        if (index !== -1) {
            setPlaylists(
                playlists
                    .slice(0, index)
                    .concat(playlists.slice(index + 1, playlists.length))
            );
        } else {
            setPlaylists(playlists.concat(playlist));
        }
    };

    return (
        <React.Fragment>
            {playlists.length > 0 ? (
                <Box className="start-game-container">
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        className="regular-button"
                    >
                        <Link
                            to={{
                                pathname: "/Game",
                                state: playlists
                            }}
                        >
                            Start game
                        </Link>
                    </Button>
                </Box>
            ) : (
                <Box className="start-game-container">
                    <h1>Select playlists to start!</h1>
                </Box>
            )}
            <Suspense fallback={<div>Loading...</div>}>
                <div>
                <Playlists select={playlist => select(playlist)} />
                </div>
            </Suspense>
        </React.Fragment>
    );
};

export default Settings;
