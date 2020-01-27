import React, { useState, useContext, useEffect, useStyle } from "react";
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

    const [name, setName] = useState(formatName(props.name));

    const [nameLetters, setNameLetters] = useState(
        name.split("").filter(char => Util.isLetter(char)).map(char=>char.toLowerCase())
    );

    const [guessedName, setGuessedName] = useState([]);


    const setGuessedNameLetter = (letter, index) => {
        let guessedNameCopy = [...guessedName];
        guessedNameCopy[index] = letter;
        setGuessedName(guessedNameCopy);
    };


    useEffect(()=>{
        if (Util.equalArrays(guessedName, nameLetters))
            console.log("CORRECT");
    },[guessedName])

    const changeEvent = (e)=>{
        console.log(e);
    }

    let wordElement = [];
    let nameArray = name.split("");
    let letterIndex = 0;
    for (let i = 0; i < nameArray.length; i++) {
        let char = nameArray[i];
        if (Util.isLetter(char)) {
            wordElement.push(
                <Letter
                    className = "letter"
                    onChange={changeEvent}
                    key={i}
                    index={letterIndex}
                    char={char}
                    setLetter={setGuessedNameLetter}
                />
            );
            letterIndex++;
        } else {
            wordElement.push(
                <Box key={i} component="span">
                    {char}
                </Box>
            );
        }
    }


    return wordElement;
};

export default Word;
