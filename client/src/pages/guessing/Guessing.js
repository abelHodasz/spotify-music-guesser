import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import Word from "./Word";
import { animated } from "./node_modules/animate.css";
import CustomAlert from "../../util/CustomAlert";
import Countdown from "../../util/Countdown";

export function Guessing(props) {
    const [guessStatus, setGuessStatus] = useState("guessing");
    const [animation, setAnimation] = useState("");
    const [statusAlert, setStatusAlert] = useState("");
    useEffect(() => {
        switch (guessStatus) {
            case "correct":
                console.log("CORRECT");
                setAnimation("bounce");
                setTimeout(() => props.setGuessing(false), 1000);
                break;
            case "incorrect":
                console.log("INCORRECT");
                setAnimation("shake");
                break;
            case "timesup":
                setAnimation("bounceOut");
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

    const setDefaultAnimation = () => {
        setAnimation("");
    };

    const timesUp = () => {

        setGuessStatus("timesup");
        document.querySelector('.words-container').addEventListener('animationend', function() {
             props.setGuessing(false);
        })
    };


    return (
        <Container>
            <h2>Guess the track's name!</h2>
            <Countdown time={30} timesUp={timesUp} />
            <div
                className={"words-container animated fast " + animation}
                onAnimationEnd={setDefaultAnimation}
            >
                <Word
                    name={props.name}
                    artist={props.artist}
                    guess={[guessStatus, setGuessStatus]}
                />
            </div>
            {statusAlert}
        </Container>
    );
}
