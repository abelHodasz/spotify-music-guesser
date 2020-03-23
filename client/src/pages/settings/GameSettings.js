import React, { useState, Fragment } from "react";
import { Slider, Container , Typography} from "@material-ui/core";

export default function GameSettings(props) {
    const [duration, setDuration] = props.duration;
    const [rounds, setRounds] = props.rounds;
    const [roundLength, setRoundLength] = props.roundLength;
    const [powerUps, setPowerUps] = props.powerUps;

    const durationMarks = [
        {
            value: 2,
            label: "2 sec"
        },
        {
            value: 10,
            label: "10 sec"
        }
    ]
    const roundsMarks=[
        {
            value: 5,
            label: "5"
        },
        {
            value: 20,
            label: "20"
        }
    ]
    const roundLengthMarks = [
        {
            value: 10,
            label: "10 sec"
        },
        {
            value: 60,
            label: "60 sec"
        }
    ]

    return (
        <Container style={{width:"50vw"}}>
            <Typography id="continuous-slider" gutterBottom>
                Playback duration
            </Typography>
            <Slider
                className="slider"
                value={duration/1000}
                min={2}
                max={10}
                onChange={(e, newValue)=>setDuration(newValue*1000)}
                aria-label="Duration"
                aria-labelledby="continuous-slider"
                valueLabelDisplay="on"
                valueLabelFormat={x => x + " s"}
                marks={durationMarks}
            />
            <Typography id="continuous-slider" gutterBottom>
                Number of Rounds
            </Typography>
            <Slider
                className="slider"
                value={rounds}
                min={5}
                max={20}
                onChange={(e, newValue)=>setRounds(newValue)}
                aria-label="rounds"
                aria-labelledby="continuous-slider"
                valueLabelDisplay="on"
                marks={roundsMarks}
            />
            <Typography id="continuous-slider" gutterBottom>
                Round length
            </Typography>
            <Slider
                className="slider"
                value={roundLength}
                min={10}
                max={60}
                onChange={(e, newValue)=>setRoundLength(newValue)}
                aria-label="roundLength"
                aria-labelledby="continuous-slider"
                valueLabelDisplay="on"
                marks={roundLengthMarks}
            />
        </Container>
    );
}
