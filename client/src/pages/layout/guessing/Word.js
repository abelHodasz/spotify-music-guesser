import React, { useState, useEffect } from "react";
import Letter from "./Letter";
import { Box } from "@material-ui/core";
import Util from "../../../util/Util";

const Word = props => {
    console.log("Render Word");
    const formatName = name => {
        let newName = name.split(" - ")[0];
        const regex = /\(.*?\)/g;
        newName = newName.replace(regex, "");
        newName = newName.trim();
        return newName;
    };

    const name = useState(formatName(props.name))[0];

    const nameLetters = useState(
        name
            .split("")
            .filter(char => Util.isLetter(char))
            .map(char => char.toUpperCase())
    )[0];

    const [guessedName, setGuessedName] = useState([]);

    const setGuessedNameLetter = (letter, index) => {
        let guessedNameCopy = [...guessedName];
        guessedNameCopy[index] = letter;
        setGuessedName(guessedNameCopy);
    };

    useEffect(() => {
        if (Util.equalArrays(guessedName, nameLetters))
            props.setGuessStatus("correct");
    }, [guessedName, nameLetters]);

    let wordElement = [];
    let nameArray = name.split("");
    let letterIndex = 0;
    for (let i = 0; i < nameArray.length; i++) {
        let char = nameArray[i];
        if (Util.isLetter(char)) {
            wordElement.push(
                <span className="letter-container">
                    <Letter
                        className="letter "
                        key={i}
                        index={letterIndex}
                        char={char}
                        setLetter={setGuessedNameLetter}
                        setGuessStatus={props.setGuessStatus}
                    />
                </span>
            );
            letterIndex++;
        } else {
            wordElement.push(
                <Box key={i} component={char == " " ? "div" : "span"}>
                    {char}
                </Box>
            );
        }
    }

    return wordElement;
};

export default Word;
