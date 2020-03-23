import React, { useState, useContext, useEffect, Fragment } from "react";
import Spotify from "spotify-web-api-js";
import { UserContext } from "../../UserContext";
import { Guessing } from "./guessing/Guessing";
import Logger from "../util/Logger";
import { Button, Container, Grid } from "@material-ui/core";
import CustomAlert from "../util/CustomAlert";
import { pulse } from "react-animations";
import Radium, { StyleRoot } from "radium";
import PositionSlider from "./PositionSlider";
import Team from "./Team";
import GameOver from "./GameOver";

const styles = {
    pulse: {
        animation: "x 1s",
        animationName: Radium.keyframes(pulse, "pulse")
    }
};

const Game = props => {
    const {
        playlists,
        rounds,
        roundLength,
        teams,
        powerUps
    } = props.location.state;
    const [team1Current, setTeam1Current] = useState(false);
    const [currentWinner, setCurrentWinner] = useState({
        name: teams[0],
        score: 0
    });
    const pauseDurationMs = props.location.state.duration;

    const [currentSong, setCurrentSong] = useState(null);
    const [allSongs, setAllSongs] = useState([]);
    const [position, setPosition] = useState(50);

    const state = useContext(UserContext)[0];

    const [deviceId, setDeviceId] = useState(null);

    const [playingSong, setPlayingSong] = useState(false);
    const [guessing, setGuessing] = useState(false);
    const [hint, setHint] = useState("");

    const [roundNumber, setRoundNumber] = useState(0);
    const [points, setPoints] = useState([]);

    const [numberOfLettersShown, setNumberOfLettersShown] = useState(0);

    let spotify = new Spotify();
    spotify.setAccessToken(state.accessToken);

    const replayCurrentSong = () => {
        PlayCurrentSong();
    };

    const continueCurrentSong = () => {
        console.log("Continue playBack");
        setPlayingSong(true);
        spotify.play({}).catch(err => {
            Logger(err, "Play Song");
            setPlayingSong(false);
            isTokenExpired(err);
        });
        setTimeout(PauseCurrentSong, pauseDurationMs);
    };

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

    const GetNextSong = () => {
        if (allSongs.length === 0) {
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
                if (data.devices.length === 0) {
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
        } else if (
            JSON.parse(err.response).error.message === "Device not found"
        ) {
            getDevices();
        }
    };

    async function PlayCurrentSong() {
        if (currentSong == null || deviceId == null) return;
        console.log("Playing song");
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
                spotify
                    .seek(positionMs, {})
                    .then(() => {
                        setGuessing(true);
                        setTimeout(PauseCurrentSong, pauseDurationMs);
                    })
                    .catch(() => GetNextSong());
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
        if (!guessing) {
            setNumberOfLettersShown(0);
            if (!team1Current) {
                setRoundNumber(roundNumber + 1);
            }
            setTeam1Current(!team1Current);
            setHint("");
        }
    }, [guessing]);

    useEffect(() => {
        PlayCurrentSong();
    }, [currentSong]);

    const showArtist = () => {
        let artistText = "Aritist";
        artistText += +currentSong.track.artists.length > 1 ? "s" : "";
        artistText += ": ";
        setHint(
            <h2>
                {artistText +
                    currentSong.track.artists
                        .map(artist => artist.name)
                        .join(", ")}
            </h2>
        );
    };

    const showAlbum = () => {
        setHint(<h2>{"Album: " + currentSong.track.album.name}</h2>);
    };

    const showAlbumCover = () => {
        setHint(
            <img
                style={{ marginTop: "10px" }}
                width="400"
                height="400"
                src={currentSong.track.album.images[0].url}
                alt="No image available"
            />
        );
    };

    const powerUpHandlers = {
        replay: replayCurrentSong,
        showArtist: showArtist,
        showAlbum: showAlbum,
        showLetter: () => {
            setNumberOfLettersShown(numberOfLettersShown + 1);
        },
        showAlbumCover: showAlbumCover,
        continue: continueCurrentSong
    };

    if (roundNumber == rounds + 1) {
        return <GameOver winner={currentWinner}></GameOver>;
    }

    if (deviceId === "No device") {
        return (
            <Container maxWidth="sm">
                <StyleRoot>
                    <div style={styles.pulse}>
                        <CustomAlert
                            severity="error"
                            message="Please open spotify and try again!"
                            buttonText="Try again!"
                            buttonClassName="try-again-button"
                            buttonClickHandler={getDevices}
                        />
                    </div>
                </StyleRoot>
            </Container>
        );
    }
    return (
        <Grid container justify="center" spacing={5}>
            <Grid item xs={2}>
                <Team
                    winner={[currentWinner, setCurrentWinner]}
                    playingSong={playingSong}
                    newPoints={points}
                    powerUpHandlers={powerUpHandlers}
                    teamName={teams[0]}
                    active={team1Current}
                    powerUps={powerUps}
                    guessing={guessing}
                    setGuessing={setGuessing}
                />
            </Grid>
            <Grid item xs={8}>
                {guessing ? (
                    <Fragment>
                        <Guessing
                            currentTeam={[team1Current, setTeam1Current]}
                            name={currentSong.track.name}
                            artists={currentSong.track.artists.map(
                                artist => artist.name
                            )}
                            guessing={guessing}
                            setGuessing={setGuessing}
                            roundLength={roundLength}
                            setPoints={setPoints}
                            numberOfLettersShown={numberOfLettersShown}
                        />
                        {hint}
                    </Fragment>
                ) : playingSong ? (
                    <Container style={{ marginTop: "50px" }}>
                        Loading...
                    </Container>
                ) : (
                    <Container maxWidth="sm">
                        <h2>Round {roundNumber}</h2>
                        <h3>
                            {team1Current ? teams[0] : teams[1]}{" "}
                            {roundNumber == 1 && team1Current
                                ? "starts"
                                : "is next"}
                        </h3>
                        <StyleRoot>
                            <div style={styles.pulse}>
                                <PositionSlider
                                    position={position}
                                    setPosition={setPosition}
                                />
                            </div>
                        </StyleRoot>
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
            </Grid>
            <Grid item xs={2}>
                <Team
                    winner={[currentWinner, setCurrentWinner]}
                    playingSong={playingSong}
                    newPoints={points}
                    powerUpHandlers={powerUpHandlers}
                    teamName={teams[1]}
                    active={!team1Current}
                    powerUps={powerUps}
                    guessing={guessing}
                    setGuessing={setGuessing}
                />
            </Grid>
        </Grid>
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
