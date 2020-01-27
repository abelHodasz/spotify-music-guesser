import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Util from "../../../util/Util";

const Letter = props => {
    const [char, setChar] = useState("");

    const changeChar = e => {
        const newChar = e.target.value;
        if (Util.isLetter(newChar)) {
            setChar(newChar.toUpperCase());
            let nextLetter = findNextLetter(e.target)
            if (nextLetter)nextLetter.focus();
        } else {
            setChar("");
        }
        props.setLetter(newChar, props.index);
    };


    const deleteChar = e => {
        if (e.keyCode == 8){
            let previousLetter = findPreviousLetter(e.target);
            if (previousLetter){
                props.setLetter("");
                e.target.value = "";
                previousLetter.focus();
            }
        }
    }

    const focusChar = e => {
        setChar("");
        props.setLetter("", props.index);
    }

    return (
        <TextField
            autoFocus={props.index == 0? true: false}
            className="letter"
            variant="outlined"
            size="medium"
            inputProps={{ maxLength: 1, value: char }}
            onChange={changeChar}
            onKeyUp={deleteChar}
            onFocus={focusChar}
        />
    );
};


function findNextLetter(element){
    var sibling =  element.parentElement.parentElement.nextSibling;

	while (sibling) {
		if (sibling.matches(".letter")) return sibling.children[0].children[0];
		sibling = sibling.nextElementSibling
	}
}

function findPreviousLetter(element){
    var sibling =  element.parentElement.parentElement.previousSibling;

	while (sibling) {
		if (sibling.matches(".letter")) return sibling.children[0].children[0];
		sibling = sibling.previousElementSibling
	}
}


export default Letter;
