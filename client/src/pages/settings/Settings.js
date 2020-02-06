import React, { Suspense, useState } from "react";
import { Typography, Button, makeStyles, Box } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import SelectPlaylists from "./SelectPlaylists";
import SelectTeams from "./SelectTeams";
import GameSettings from "./GameSettings";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    backButton: {
        marginRight: theme.spacing(1)
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

export default function Settings() {
    console.log("Render Settings");
    const [playlists, setPlaylists] = useState([]);
    const [teams, setTeams] = useState(["Team 1", "Team 2"]);
    const [duration, setDuration] = useState(5000);
    const [rounds, setRounds] = useState(10);
    const [roundLength, setRoundLength] = useState(45);
    const [powerUps, setPowerUps] = useState([
        {
            id: 0,
            name: "Replay",
            amount: 5,
            label: "",
            color: "#1abc9c",
            hoverBackgroundColor: "#16a085"
        },
        {
            id: 1,
            name: "Continue",
            amount: 3,
            label: "",
            color: "#e74c3c",
            hoverBackgroundColor: "#c0392b"
        },
        {
            id: 2,
            name: "Artist",
            amount: 1,
            label: "",
            color: "#2ecc71",
            hoverBackgroundColor: "#27ae60"
        },
        {
            id: 3,
            name: "Album",
            amount: 1,
            label: "",
            color: "#3498db",
            hoverBackgroundColor: "#2980b9"
        },
        {
            id: 4,
            name: "Letter",
            amount: 5,
            label: "",
            color: "#f1c40f",
            hoverBackgroundColor: "#f39c12"
        },
        {
            id: 5,
            name: "Cover",
            amount: 5,
            label: "",
            color: "#e67e22",
            hoverBackgroundColor: "#d35400"
        }
    ]);

    function getSteps() {
        return ["Create teams", "Add Playlists", "Game settings"];
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <SelectTeams teams={teams} setTeams={setTeams} />;
            case 1:
                return (
                    <SelectPlaylists
                        playlists={playlists}
                        setPlaylists={setPlaylists}
                    />
                );
            case 2:
                return (
                    <GameSettings
                        duration={[duration, setDuration]}
                        rounds={[rounds, setRounds]}
                        roundLength={[roundLength, setRoundLength]}
                    />
                );
            default:
                return "Unknown stepIndex";
        }
    }

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    if (activeStep === steps.length) {
    }

    return (
        <div className={classes.root}>
            <Stepper
                style={{ backgroundColor: "transparent" }}
                activeStep={activeStep}
                alternativeLabel
            >
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <div>
                    <Box className={classes.instructions}>
                        {getStepContent(activeStep)}
                    </Box>
                    <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                        >
                            Back
                        </Button>
                        {activeStep == 1 && playlists.length == 0 ? (
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={true}
                            >
                                Next
                            </Button>
                        ) : activeStep === steps.length - 1 ? (
                            <Link
                                to={{
                                    pathname: "/Game",
                                    state: {
                                        playlists,
                                        duration,
                                        rounds,
                                        roundLength,
                                        teams,
                                        powerUps
                                    }
                                }}
                            >
                                <Button variant="contained" color="primary">
                                    Start game
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
