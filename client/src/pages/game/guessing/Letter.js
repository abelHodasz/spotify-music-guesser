import React, { useState, useEffect, Fragment } from "react";
import { TextField } from "@material-ui/core";
import Util from "../../../util/Util";

const Letter = props => {
    const [char, setChar] = useState("");
    const [onLast, setOnLast] = useState(false);
    const [guessStatus, setGuessStatus] = props.guess;

    const changeChar = e => {
        setGuessStatus("guessing");
        let newChar = e.target.value;
        if (Util.isLetter(newChar)) {
            newChar = newChar.toUpperCase();
            setChar(newChar);
            let nextLetter = findNextLetter(e.target);
            if (nextLetter) nextLetter.focus();
            else {
                setGuessStatus("incorrect");
                setOnLast(true);
            }
        } else {
            setChar("");
        }
        props.setLetter(newChar, props.index);
    };

    const deleteChar = e => {
        setGuessStatus("guessing");
        if (e.keyCode === 8) {
            e.target.value = "";
            props.setLetter("");
            if (!onLast) {
                let previousLetter = findPreviousLetter(e.target);
                if (previousLetter) {
                    previousLetter.focus();
                }
            }
            setOnLast(false);
        }
    };

    const focusChar = e => {
        setChar("");
        props.setLetter("", props.index);
    };

    const isDisabled = guessStatus == "timesup" || guessStatus == "correct";

    return (
        <Fragment>
        <TextField
            disabled={isDisabled}
            className="letter"
            autoFocus={props.index === 0 ? true : false}
            variant="outlined"
            size="medium"
            inputProps={{ maxLength: 1, value:char }}
            onChange={changeChar}
            onKeyUp={deleteChar}
            onFocus={focusChar}
            label={props.prefilled?props.char.toUpperCase():" "}
        />
        </Fragment>
    );
};

function findNextLetter(element) {
    var sibling = element.parentElement.parentElement.parentElement.nextSibling;

    while (sibling) {
        if (sibling.matches(".letter-container"))
            return sibling.children[0].children[1].children[0];
        sibling = sibling.nextElementSibling;
    }
}

function findPreviousLetter(element) {
    var sibling =
        element.parentElement.parentElement.parentElement.previousSibling;

    while (sibling) {
        if (sibling.matches(".letter-container"))
            return sibling.children[0].children[1].children[0];
        sibling = sibling.previousElementSibling;
    }
}

export default Letter;
