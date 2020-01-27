import React, { useContext, useState, useEffect } from "react";
import Playlist from "./Playlist";
import { UserContext } from "../UserContext";
import Spotify from "spotify-web-api-js";
import { Alert } from "@material-ui/lab";

const Playlists = props => {
    //getting spotify instance with accessToken from context
    const state = useContext(UserContext)[0];

    let spotify = new Spotify();
    spotify.setAccessToken(state.accessToken);

    //geting playlists

    const [playlists, setPlaylists] = useState([]);
    const [errorPlaylists, setErrorPlaylists] = useState(null);
    const [loadingPlaylists, setLoadingPlaylists] = useState(true);

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

    useEffect(() => {
        getPlaylistsAsync();
    }, []);

    if (errorPlaylists)
        return (
            <Alert className="animated pulse alert-message" severity="error">
                Failed to load playlists : {errorPlaylists}
            </Alert>
    );

    return playlists.map(playlist => (
        <div key={playlist.id} style={{ display: "inline-block" }}>
            <Playlist
                key={playlist.id}
                playlist={playlist}
                select={() => props.select(playlist)}
            />
        </div>
    ));
};

const GetPlaylists = (spotify, offset) => {
    return spotify.getUserPlaylists({ limit: 50, offset: offset });
};

export default Playlists;
