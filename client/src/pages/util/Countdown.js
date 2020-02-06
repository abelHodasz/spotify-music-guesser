import React, { useState, useEffect } from "react";

export default function Countdown(props) {
    const [time, setTime] = props.time;

    useEffect(() => {
        setTimeout(decreaseTimer, 1000);
    }, [time]);

    const decreaseTimer = () => {
        if (time > 0) {
            if (props.guessStatus != "correct") {
                setTime(time - 1);
            }
        } else {
            props.setGuessStatus("timesup");
        }
    };

    return <h2>{time}</h2>;
}
