import React, { useState, useEffect } from "react";
import { Container, Button, TextField, Box } from "@material-ui/core";
import regex from "xregexp";
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

