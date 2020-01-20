import React from "react";
import { Context } from "../../context";

export default class Game extends React.Component {
    static contextType = Context;

     componentDidMount() {

        

        
    }

    getDevices = () => {

        this.context.state.spotify.getMyDevices()
        .then(data => {
            console.log(data.devices[0].id);
            this.context.state.spotify.transferMyPlayback(
                {device_ids:[data.devices[0].id]}
            )
            .then(
                this.context.state.spotify.play(
                    {device_id:data.devices[0].id}
                )
                .then()
                .catch (e => console.log(e)))
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    };

    render() {
        return (
            <React.Fragment>
                <button onClick={this.getDevices}>Get Devices</button>
            </React.Fragment>
        );
    }
    /*
    constructor(props) {
        super(props);
        props = props.location.state;
        this.state = {
            fetchedPlaylists: {},
            duration: 3000,
            currentSong: null,
            positionMs: 5000,
        }
    }

    choseSong(playlist) {
        console.log("Choosing song...")
        if (playlist.id in this.state.fetchedPlaylists) {
            let chosenPlaylist = this.state.fetchedPlaylists[playlist.id];
            if (chosenPlaylist == {}) {
                this.choseSong(this.chosePlaylist());
                return;
            }
            let randomIndex = this.getRandomNumber(chosenPlaylist.length);
            let song = chosenPlaylist[randomIndex];
            delete chosenPlaylist[randomIndex];
            if (song.track.name.length > 25) {
                this.choseSong(playlist);
                return;
            }
            console.log(song);
            console.log("Chosen song: " + song.track.artists[0].name + " - " + song.track.name);
            this.setState({ currentSong: song });

        }
        else {
            console.log("Playlist id: " + playlist.id);
            console.log("User id: " + this.state.userId);
            spotifyWebApi.getPlaylistTracks(this.state.userId, playlist.id)
                .then((data) => {
                    this.setState(
                        (state) => {
                            let newDict = state.fetchedPlaylists;
                            newDict[playlist.id] = data.items;
                            return {
                                fetchedPlaylists: newDict
                            };
                        }
                    )
                    this.choseSong(playlist);
                });
        }
    }


    chosePlaylist() {
        let randomPlaylist = this.state.playlists[this.getRandomNumber(this.state.playlists.length)];
        return randomPlaylist;
    }


    getRandomNumber(upperLimit) {
        return Math.floor(Math.random() * upperLimit);
    }


    componentDidMount() {
        spotifyWebApi.setAccessToken(this.state.accessToken);
        this.choseSong(this.chosePlaylist());
    }


    render() {
        return (
            <div>
                <BeforeStart currentSong={this.state.currentSong} duration={this.state.duration} positionMs={this.state.positionMs} />
            </div>
        );
    }

}


function BeforeStart(props) {
    return (
        <div>
            <h2></h2>
            <button onClick={() => playSong(props.currentSong, props.duration, props.positionMs)}>Play</button>
        </div>
    )
}


    playSong(song, duration, positionMs) {
        console.log("Now Playing " + song.track.name + " from " + (positionMs / 1000) + " seconds for " + (duration / 1000) + " seconds");
        try {
            spotifyWebApi.play({
                "uris": [song.track.uri],
                "position_ms": positionMs,
            }).then(
                setTimeout(() => {
                    spotifyWebApi.pause({}).then(
                        console.log("Playback ended")
                    )
                }, duration)
            );
        }
        catch (e) {
            console.log(e);
        }
    }

    */
}
