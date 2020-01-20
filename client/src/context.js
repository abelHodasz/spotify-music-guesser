import React, { Component } from "react";

import Spotify from "spotify-web-api-js";

export const Context = React.createContext();

export class Provider extends Component {
    state = {
        accessToken: null,
        userId: null,
        spotify: null,
        playlists: []
    };

    refreshLocalStorage = () =>
        localStorage.setItem("context", JSON.stringify(this.state));

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const access_token = params.get("access_token");
        const user_id = params.get("user_id");
        if (params == null || access_token == null || user_id == null) {
            const storage = JSON.parse(localStorage.getItem("context"));
            if (storage) {
                console.log("Loaded context from storage : " + storage);
                this.setState(storage);
                const spotifyWebApi = new Spotify();
                console.log("Set access token: "+ storage);
                spotifyWebApi.setAccessToken(storage.accessToken);
                this.setState({
                    spotify: spotifyWebApi
                });
            } else {
                window.location.href = "localhost:3000";
            }
        } else {
            const spotifyWebApi = new Spotify();

            spotifyWebApi.setAccessToken(access_token);
            this.setState({
                accessToken: access_token,
                userId: user_id,
                spotify: spotifyWebApi
            });
            this.getPlaylists(spotifyWebApi);
        }
    }

    getPlaylists = spotify => {
        for (let offset = 0; offset < 150; offset += 50) {
            spotify
                .getUserPlaylists({ limit: 50, offset: offset })
                .then(data => {
                    this.setState(state => {
                        const playlists = state.playlists.concat(data.items);
                        return {
                            playlists
                        };
                    });

                    this.refreshLocalStorage();
                })
                .catch(err => {
                    console.log("error", err);
                    window.location.href = "localhost:3000/";
                });
        }
    };

    render() {
        return (
            <Context.Provider
                value={{
                    state: this.state
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}
