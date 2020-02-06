import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ReplayIcon from "@material-ui/icons/Replay";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AlbumIcon from "@material-ui/icons/Album";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import ImageIcon from "@material-ui/icons/Image";

export default function PowerUp(props) {
    const [icon, setIcon] = useState("");

    useEffect(() => {
        switch (props.pu.name) {
            case "Replay":
                setIcon(<ReplayIcon />);
                break;
            case "Artist":
                setIcon(<AccountCircleIcon />);
                break;
            case "Album":
                setIcon(<AlbumIcon />);
                break;
            case "Letter":
                setIcon(<SpellcheckIcon />);
                break;
            case "Cover":
                setIcon(<ImageIcon />);
                break;
            case "Continue":
                setIcon(<PlayArrowIcon />);
                break;
        }
    }, []);

    const FancyButton = withStyles(theme => ({
        root: {
            color: theme.palette.getContrastText(props.pu.color),
            backgroundColor: props.pu.color,
            margin: "10px 10px 0 10px",
            borderRadius: "20px",
            "&:hover": {
                backgroundColor: props.pu.hoverBackgroundColor
            }
        }
    }))(Button);


    return (
        <div className="power-up-button-container">
            <FancyButton disableElevation variant="contained" onClick = {props.active && !props.playingSong?props.handlePowerUp:()=>{}} disabled={props.pu.amount==0}>
                {icon}<span style={{marginLeft:"2px"}}>{props.pu.name}</span>
            </FancyButton>
            <p>x {props.pu.amount}</p>
        </div>
    );
}
