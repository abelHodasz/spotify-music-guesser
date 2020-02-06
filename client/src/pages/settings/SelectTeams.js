import React from "react";
import { Container, TextField } from "@material-ui/core";

export default function SelectTeams(props) {

    const changeTeamName = (teamIndex, newValue)=>{
        let teams = [...props.teams];
        teams[teamIndex] = newValue;
        props.setTeams(teams);
    }


    return (
        <React.Fragment>
            <Container>
                <div className="select-team-textfield" >
                    <h2>Team Names</h2>
                <TextField defaultValue={props.teams[0]} onChange={(e)=>changeTeamName(0,e.target.value)} variant="outlined"/>
                </div>
                <div className="select-team-textfield">
                <TextField  defaultValue={props.teams[1]} onChange={(e)=>changeTeamName(1,e.target.value)} variant="outlined"/>
                </div>
            </Container>
        </React.Fragment>
    );
}
