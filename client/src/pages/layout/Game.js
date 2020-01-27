import React, { useState, useContext, useEffect, useStyle } from "react";
import Spotify from "spotify-web-api-js";
import { UserContext } from "../../UserContext";
import { Guessing } from "./Guessing";
import Logger from "./Logger";
import { Slider, Button, Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { animated } from "animate.css";

const Game = props => {
    const [currentSong, setCurrentSong] = useState(null);
    const [allSongs, setAllSongs] = useState([]);
    const [position, setPosition] = useState(50);
    const [playlists, setPlaylists] = useState(props.location.state);
    const [pauseDurationMs, setPauseDurationMs] = useState(5000);
    const [state, setState] = useContext(UserContext);
    const [deviceId, setDeviceId] = useState(null);
    const [playingSong, setPlayingSong] = useState(false);
    const [guessing, setGuessing] = useState(false);

    let spotify = new Spotify();
    spotify.setAccessToken(state.accessToken);

    async function GetAllSongs() {
        let songs = [];
        for (let playlist of playlists) {
            const fetchedSongs = await spotify.getPlaylistTracks(
                state.userId,
                playlist.id
            );
            songs.push(...fetchedSongs.items);
        }
        songs = shuffle(songs);
        setAllSongs(songs);
    }

    const handleSliderChange = (e, newValue) => {
        setPosition(newValue);
    };

    const GetNextSong = () => {
        if (allSongs.length == 0) {
            console.log("No more songs");
            return;
        }
        const song = allSongs[0];
        let songCopy = JSON.parse(JSON.stringify(song));
        setCurrentSong(songCopy);
        setAllSongs(allSongs.slice(1, allSongs.length));
    };

    const getDevices = () => {
        console.log("Getting devices");
        spotify
            .getMyDevices()
            .then(data => {
                console.log(data.devices);
                if (data.devices.length == 0) {
                    setDeviceId("No device");
                } else setDeviceId(data.devices[0].id);
            })
            .catch(err => {
                Logger(err, "Get Devices");
                isTokenExpired(err);
            });
    };

    const isTokenExpired = err => {
        if (
            JSON.parse(err.response).error.message ===
            "The access token expired"
        ) {
            window.location.href = "/";
        }
    };

    async function PlayCurrentSong() {
        if (currentSong == null || deviceId == null) return;
        setGuessing(true);
        setPlayingSong(true);
        console.log(currentSong.track.name, currentSong.track);
        spotify
            .play({
                uris: [currentSong.track.uri],
                device_id: deviceId
            })
            .then(data => {
                let positionMs = parseInt(
                    (parseInt(currentSong.track.duration_ms) * position) / 100
                );
                spotify.seek(positionMs, {});
            })
            .catch(err => {
                Logger(err, "Play Song");
                setPlayingSong(false);
                isTokenExpired(err);
            });
    }

    function PauseCurrentSong() {
        if (deviceId == null) return;
        setPlayingSong(false);
        spotify
            .pause({
                device_id: deviceId
            })
            .catch(err => {
                Logger(err, "Pause Song");
                isTokenExpired(err);
            });
    }

    useEffect(() => {
        getDevices();
    }, []);

    useEffect(() => {
        GetAllSongs();
    }, [deviceId]);

    useEffect(() => {
        PlayCurrentSong();
        setTimeout(PauseCurrentSong, pauseDurationMs);
    }, [currentSong]);

    if (deviceId == "No device") {
        return (
            <Container maxWidth="sm">
                <Alert
                    className="animated pulse alert-message"
                    severity="error"
                >
                    Please open spotify and try again!
                </Alert>
                <Button
                    className="try-again-button"
                    onClick={getDevices}
                    variant="contained"
                    color="secondary"
                >
                    Try again!
                </Button>
            </Container>
        );
    }
    return (
        <React.Fragment>
            {guessing ? (
                <Guessing
                    name={currentSong.track.name}
                    artists={currentSong.track.artists.map(
                        artist => artist.name
                    )}
                    setGuessing={setGuessing}
                />
            ) : playingSong ? (
                <React.Fragment />
            ) : (
                <Container maxWidth="sm">
                    <Typography id="continuous-slider" gutterBottom>
                        Song starting position
                    </Typography>
                    <Slider
                        className="slider"
                        value={position}
                        onChange={handleSliderChange}
                        aria-label="position"
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        valueLabelFormat={x => x + "%"}
                    />
                    <Button
                        className="playButton"
                        variant="outlined"
                        color="primary"
                        onClick={GetNextSong}
                    >
                        Play
                    </Button>
                    </Container>
            )}
        </React.Fragment>
    );
};

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export default Game;
