import React, { useState, useEffect } from "react";
import { Container, Button, TextField, Box } from "@material-ui/core";
import regex from "xregexp";

export function Guessing(props) {
    const formatName = name => {
        let newName = name.split(" - ")[0];
        const regex = /\(.*?\)/g;
        newName = newName.replace(regex, "");
        return newName;
    };

    const formatArtists = artists => {
        return [artists[0]];
    };

    const [track, setTrack] = useState({
        name: formatName(props.name),
        artists: formatArtists(props.artists)
    });

    const [guessedTrack, setGuessedTrack] = useState(
        track.name.toLowerCase().split("")
    );

    const updateGuessedTrack = (letter, index) => {
        let copyOfGuessedTrack = [...guessedTrack];
        copyOfGuessedTrack[index] = letter;
        setGuessedTrack(copyOfGuessedTrack);
    };

    const [focused, setFocused] = useState(0);
    const [letterInput, setLetterInput] = useState(null);
    const [forward, setForward] = useState(true);

    const textFieldKeyDown = (event, index) => {
        const key = event.keyCode || event.charCode;
        let hungarianLetter = true;
        let keyString;
        switch (key) {
            case 222:
                keyString = "Á";
                break;
            case 186:
                keyString = "É";
                break;
            case 192:
                keyString = "Ö";
                break;
            case 219:
                keyString = "Ő";
                break;
            case 191:
                keyString = "Ü";
                break;
            case 187:
                keyString = "Ó";
                break;
            case 221:
                keyString = "Ú";
                break;
            case 220:
                keyString = "Ű";
                break;
            case 226:
                keyString = "Í";
                break;
            default:
                hungarianLetter = false;
                keyString = String.fromCharCode(key);
        }
        if (key == 8) {
            if (focused > 0) {
                setForward(false);
                setFocused(focused - 1);
            }
            event.target.value = "";
            updateGuessedTrack("", index);
        } else {
            setForward(true);
            if (isLetter(keyString) || hungarianLetter) {
                updateGuessedTrack(keyString, index);
                event.target.value = keyString;
                if (index != getIndexOfLastLetter(track.name)) {
                    setFocused(focused + 1);
                } else {
                }
            }
        }
    };

    const textInput = [...track.name].map((character, index) => {
        let lastLineBreak = 0;
        if (isLetter(character)) {
            lastLineBreak++
            return (
                <Box
                    key={index}
                    id={"letter-" + index}
                    component="span"
                    className="letter-container"
                >
                    <TextField
                        className={"letter"}
                        inputRef={input => {
                            if (index == focused) {
                                setLetterInput(input);
                            }
                        }}
                        InputProps={{
                            readOnly: true
                        }}
                        onClick={() => setFocused(index)}
                        onKeyDown={event => textFieldKeyDown(event, index)}
                        variant="outlined"
                        size="medium"
                    />
                </Box>
            );
        } else if (character == " ") {
            if (index == focused && forward) setFocused(focused + 1);
            if (index == focused && !forward) setFocused(focused - 1);
            return (
                <Box
                    key={index}
                    id={"space-" + index}
                    component={
                        !index in [20,21,22,23,24,25, 30,31,32,33,34,35,40,41,42,43,44,45]
                            ? "span"
                            : "div"
                    }
                    className="space-letter"
                >
                    {" "}
                </Box>
            );
        } else {
            if (index == focused && forward) setFocused(focused + 1);
            if (index == focused && !forward) setFocused(focused - 1);
            return (
                <Box
                    key={index}
                    id={"letter-" + index}
                    component={
                        index < 15 || (index > 20 && index < 35)
                            ? "span"
                            : "div"
                    }
                    className="letter-container"
                >
                    <Box component="span" className="other-letter">
                        {character}
                    </Box>
                </Box>
            );
        }
    });

    useEffect(() => {
        if (letterInput != null) letterInput.focus();
    }, [letterInput]);

    useEffect(() => {
        if (guessedTrack[track.name.length - 1] == "") return;
        if (guessedTrack.length != track.name.length) return;
        console.log(track.name.toUpperCase(), guessedTrack.join(""));
        if (track.name.toUpperCase() == guessedTrack.join("")) {
            console.log("valid");
            //valid
            props.setGuessing(false);
        } else {
            //invalid
        }
    }, [guessedTrack]);

    return (
        <Container>
            <h2>Guess the track name!</h2>
            <h3>Track Name</h3>
            {textInput}
        </Container>
    );
}

function getIndexOfLastLetter(text) {
    for (let i = text.length - 1; i >= 0; i--) {
        if (isLetter(text[i])) return i;
    }
}

function isLetter(char) {
    const unicodeLetter = regex("^\\pL$");
    return unicodeLetter.test(char);
}
