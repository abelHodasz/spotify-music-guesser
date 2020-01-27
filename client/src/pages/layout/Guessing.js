import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import Word from "./guessing/Word";
import { animated } from "animate.css";

export function Guessing(props) {
    const [guessStatus, setGuessStatus] = useState("guessing");
    const [animation, setAnimation] = useState("");

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
            default:
                break;
        }
    }, [guessStatus]);


    const setDefaultAnimation= ()=>{
        setAnimation("");
    }

    return (
        <Container>
            <h2>Guess the track name!</h2>
            <h3>Track Name</h3>
            <div className={"words-container animated fast " + animation} onAnimationEnd={setDefaultAnimation}>
                <Word
                    name={props.name}
                    artist={props.artist}
                    setGuessStatus={setGuessStatus}
                />
            </div>
        </Container>
    );
}
