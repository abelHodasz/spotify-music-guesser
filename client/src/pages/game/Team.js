import React, { useState, Fragment, useEffect } from "react";
import PowerUp from "./PowerUp";
import { pulse } from "react-animations";
import Radium, { StyleRoot } from "radium";

const styles = {
    active: {},
    inActive: {
        opacity: 0.3
    },
    pulse: {
        animation: "x 1s",
        animationName: Radium.keyframes(pulse, "pulse")
    },
    pulse2: {
        animation: "x 1s",
        animationName: Radium.keyframes(pulse, "pulse")
    }
};

export default function Team(props) {
    const [points, setPoints] = useState(0);
    const [powerUps, setPowerUps] = useState(
        JSON.parse(JSON.stringify(props.powerUps))
    );
    const powerUpHandlers = props.powerUpHandlers;
    const newPoints = props.newPoints;
    const [addPoints, setAddPoints] = useState(<Fragment />);
    const [newPointsIndex, setNewPointsIndex] = useState(1);

    const handlePowerUp = powerUp => {
        let powerUpsCopy = [...powerUps];
        powerUpsCopy[powerUp.id].amount -= 1;
        switch (powerUp.name) {
            case "Replay":
                powerUpHandlers.replay();
                break;
            case "Artist":
                powerUpHandlers.showArtist();
                break;
            case "Album":
                powerUpHandlers.showAlbum();
                break;
            case "Letter":
                powerUpHandlers.showLetter();
                break;
            case "Cover":
                powerUpHandlers.showAlbumCover();
                break;
            case "Continue":
                powerUpHandlers.continue();
                break;
        }
        setPowerUps(powerUpsCopy);
    };

    useEffect(() => {
        if (newPoints.length > 0 && props.active) {
            const pointValue = newPoints[0].value;
            const pointName = newPoints[0].name;
            const newPoint = points + pointValue;
            setAddPoints(
                <StyleRoot>
                    <h3>
                        +{pointValue}{" "}{pointName}
                    </h3>
                </StyleRoot>
            );
            setTimeout(
                () => setPoints(newPoint),
                1000
            );
        }
    }, [newPoints]);

    useEffect(() => {
        if (props.active && points != 0) {
            if (newPointsIndex != newPoints.length) {
                const pointValue = newPoints[newPointsIndex].value;
                const pointName = newPoints[newPointsIndex].name;
                const newPoint = points + pointValue;
                setAddPoints(
                    <StyleRoot>
                        <h3>
                            +{pointValue}{" "}
                            {pointName}
                        </h3>
                    </StyleRoot>
                );
                setNewPointsIndex(newPointsIndex + 1);
                setTimeout(
                    () => setPoints(newPoint),
                    1001
                );
            } else {
                if(props.winner[0].score < points){
                    props.winner[1]({name:props.teamName, score:points})
                }else if (props.winner[0].score == points){
                    props.winner[1]({name:"both teams", score:points})
                }
                setNewPointsIndex(1);
                props.setGuessing(false);
                setAddPoints("");
            }
        }
    }, [points]);

    return (
        <Fragment>
            <div style={props.active ? styles.active : styles.inActive}>
                <h2>{props.teamName}</h2>
                {addPoints}
                <h3>Points: {points}</h3>
                {powerUps.map(powerUp => (
                    <PowerUp
                        playingSong={props.playingSong}
                        key={powerUp.name}
                        active={props.guessing && props.active}
                        pu={powerUp}
                        handlePowerUp={() => handlePowerUp(powerUp)}
                    />
                ))}
            </div>
        </Fragment>
    );
}
