import React from "react";
import { Slider, Typography } from "@material-ui/core";

export default function PositionSlider(props) {
    const handleSliderChange = (e, newValue) => {
        props.setPosition(newValue);
    };

    return (
        <React.Fragment>
            <Typography id="continuous-slider" gutterBottom>
                Song starting position
            </Typography>
            <Slider
                className="slider"
                value={props.position}
                max={90}
                onChange={handleSliderChange}
                aria-label="position"
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                valueLabelFormat={x => x + "%"}
            />
        </React.Fragment>
    );
}
