import React, { useState, useEffect, Fragment } from "react";
import { Container, Box } from "@material-ui/core";
import Word from "./Word";
import {
    bounce,
    shake,
    bounceInLeft,
    bounceOutRight,
    bounceOut
} from "react-animations";
import Radium, { StyleRoot } from "radium";

import CustomAlert from "../../util/CustomAlert";
import Countdown from "../../util/Countdown";

export function Guessing(props) {
    const [team1Current, setTeam1Current] = props.currentTeam;
    const [guessStatus, setGuessStatus] = useState("guessing");
    const [animation, setAnimation] = useState({});
    const [time, setTime] = useState(props.roundLength);
    const [statusAlert, setStatusAlert] = useState(
        <CustomAlert
            message="Start guessing!"
            alertClassName="correct-message"
            severity="info"
        />
    );
    const [guessOver, setGuessOver] = useState(false);

    const styles = {
        bounce: {
            animation: "x 2s",
            animationName: Radium.keyframes(bounce, "bounce")
        },
        shake: {
            animation: "x 1s",
            animationName: Radium.keyframes(shake, "shake")
        },
        bounceInLeft: {
            animation: "x 2s",
            animationName: Radium.keyframes(bounceInLeft, "bounceInLeft")
        },
        bounceOutRight: {
            animation: "x 2s",
            animationName: Radium.keyframes(bounceOutRight, "bounceOutRight")
        },
        bounceOut: {
            animation: "x 1s",
            animationName: Radium.keyframes(bounceOut, "bounceOut")
        }
    };

    useEffect(() => {
        switch (guessStatus) {
            case "correct":
                console.log("CORRECT");
                setAnimation(styles.bounce);
                break;
            case "incorrect":
                console.log("INCORRECT");
                setAnimation(styles.shake);
                break;
            case "timesup":
                setAnimation(styles.bounceOut);
            default:
                break;
        }
    }, [guessStatus]);

    useEffect(() => {
        switch (guessStatus) {
            case "correct":
                setStatusAlert(
                    <CustomAlert
                        message="Good job!"
                        alertClassName="correct-message"
                        severity="success"
                    />
                );
                break;
            case "incorrect":
                setStatusAlert(
                    <CustomAlert
                        message="Try again!"
                        alertClassName="correct-message"
                        severity="warning"
                    />
                );
                break;
            case "timesup":
                setStatusAlert(
                    <CustomAlert
                        message="Times Up!"
                        alertClassName="correct-message"
                        severity="error"
                    />
                );

            default:
                break;
        }
    }, [animation]);

    const animationEnd = e => {
        console.log(e.target.style.animationName);
        if (e.target.style.animationName.includes("bounceInLeft")) {
            setTimeout(() => {
                setAnimation(styles.bounceOutRight);
            }, 1500);
        } else if (e.target.style.animationName.includes("bounceOutRight")) {
            props.setGuessing(false);
        } else if (e.target.style.animationName.includes("bounceOut")) {
            setGuessOver(true);
            setAnimation(styles.bounceInLeft);
        } else if (e.target.style.animationName.includes("shake")) {
            setAnimation({});
        } else if (e.target.style.animationName.includes("bounce")) {
            props.setPoints([
                {
                    name: "Guessed song",
                    value: 100
                },
                {
                    name: "Remaining time",
                    value: time
                },
                {
                    name: "Number of characters",
                    value: props.name.length
                }
            ]);
        }
    };

    return (
        <Container>
            <h2>Guess the track's name!</h2>
            <Countdown
                time={[time, setTime]}
                guessStatus={guessStatus}
                setGuessStatus={setGuessStatus}
            />
            {statusAlert}
            <StyleRoot>
                <div
                    className="words-container"
                    style={animation}
                    onAnimationEnd={animationEnd}
                >
                    {!guessOver ? (
                        <Word
                            numberOfLettersShown={props.numberOfLettersShown}
                            name={props.name}
                            artist={props.artist}
                            guess={[guessStatus, setGuessStatus]}
                        />
                    ) : (
                        <Fragment>
                            <h3>Correct answer</h3>
                            <Box>
                                <h2>{props.name}</h2>
                            </Box>
                        </Fragment>
                    )}
                </div>
            </StyleRoot>
        </Container>
    );
}
