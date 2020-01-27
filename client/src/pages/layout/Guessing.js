import React from "react";
import { Container } from "@material-ui/core";
import Word from "./guessing/Word"

export function Guessing(props) {
    return (
        <Container>
            <h2>Guess the track name!</h2>
            <h3>Track Name</h3>
            <Word name={props.name} artist ={props.artist}/>
        </Container>
    );
}