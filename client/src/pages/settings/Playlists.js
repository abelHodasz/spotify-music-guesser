import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../UserContext";
import {
    GridList,
    makeStyles,
    GridListTile,
    ListSubheader,
    GridListTileBar,
    IconButton
} from "@material-ui/core";
import Spotify from "spotify-web-api-js";
import { Alert } from "@material-ui/lab";
import DoneIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper
    },
    gridList: {
        width: 1200,
        height: 500,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: "translateZ(0)"
    },
    titleBar: {
        background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
    },
    icon: {
        color: "white"
    }
}));

const Playlists = props => {
    const classes = useStyles();

    //getting spotify instance with accessToken from context
    const state = useContext(UserContext)[0];

    let spotify = new Spotify();
    spotify.setAccessToken(state.accessToken);

    //geting playlists
    const [playlists, setPlaylists] = useState([]);
    const [errorPlaylists, setErrorPlaylists] = useState(null);
    const [loadingPlaylists, setLoadingPlaylists] = useState(true);

    const [selectedPlaylists, setSelectedPlaylists] = useState([]);

    async function getPlaylistsAsync() {
        try {
            setLoadingPlaylists(true);
            let offset = 0;
            let allPlaylists = [];
            let newPlaylists = null;
            do {
                console.log(`Getting playlists from offset ${offset}`);
                newPlaylists = await GetPlaylists(spotify, offset);
                allPlaylists.push(...newPlaylists.items);
                offset += 50;
            } while (newPlaylists.next != null);
            setPlaylists(allPlaylists);
        } catch (e) {
            setErrorPlaylists(e);
        } finally {
            setLoadingPlaylists(false);
        }
    }

    const toggleSelection = playlist => {
        props.select(playlist);
        let selectedCopy = [...selectedPlaylists];
        if (selectedCopy.includes(playlist.id)) {
            setSelectedPlaylists(
                selectedCopy.filter(playlistId => playlistId !=playlist.id)
            );
        } else {
            selectedCopy.push(playlist.id);
            setSelectedPlaylists(selectedCopy);
        }
    };

    useEffect(() => {
        getPlaylistsAsync();
    }, []);

    useEffect(() => {
        if (!loadingPlaylists) {
            setPlaylists(
                playlists.map(playlist => {
                    let playlistCopy = {
                        description: playlist.description,
                        name: playlist.name,
                        id: playlist.id,
                        image: playlist.images[0].url,
                        owner: playlist.owner.display_name
                    };
                    var anchor = /<a[\s]+([^>]+)>((?:.(?!<\/a>))*.)<\/a>/;
                    let description = playlistCopy.description;
                    for (var i = 0; i < 3; i++) {
                        description = description.replace(
                            anchor,
                            (p1, p2, p3) => p3
                        );
                    }
                    playlistCopy.description = description.replace(
                        /&quot;/g,
                        '"'
                    );
                    return playlistCopy;
                })
            );
        }
    }, [loadingPlaylists]);

    if (errorPlaylists)
        return (
            <Alert className="animated pulse alert-message" severity="error">
                Failed to load playlists : {errorPlaylists}
            </Alert>
        );

    console.log(selectedPlaylists);

    return (
        <div className={classes.root}>
            <GridList
                id="style-1"
                cellHeight={300}
                spacing={1}
                cols={4}
                className={classes.gridList}
            >
                {playlists.map(playlist => (
                    <GridListTile key={playlist.id} cols={1} rows={1}>
                        <img src={playlist.image} alt={playlist.description} />
                        <GridListTileBar
                            title={playlist.name}
                            titlePosition="top"
                            actionIcon={
                                <IconButton
                                    aria-label={`star ${playlist.name}`}
                                    className={classes.icon}
                                    onClick={() => toggleSelection(playlist)}
                                >
                                    {selectedPlaylists.includes(playlist.id) ? (
                                        <DoneIcon />
                                    ) : (
                                        <AddIcon />
                                    )}
                                </IconButton>
                            }
                            actionPosition="left"
                            className={classes.titleBar}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
};

const GetPlaylists = (spotify, offset) => {
    return spotify.getUserPlaylists({ limit: 50, offset: offset });
};

export default Playlists;
