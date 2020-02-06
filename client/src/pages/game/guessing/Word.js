import React, { useState, useEffect } from "react";
import Letter from "./Letter";
import { Box } from "@material-ui/core";
import Util from "../../../util/Util";

const Word = props => {
    const [guessStatus, setGuessStatus] = props.guess;
    const [letterHintIndexes, setLetterHintIndexes] = useState([]);

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
    
    useEffect(()=>{
        console.log("Show letter", props.numberOfLettersShown);
        if(props.numberOfLettersShown > 0){
            let letterIndexesCopy = [...letterHintIndexes]
            let randomIndex
            do{
                randomIndex = Util.getRandomInt(nameLetters.length)
            }while(letterIndexesCopy.includes(randomIndex))
            letterIndexesCopy.push(randomIndex)
            setLetterHintIndexes(letterIndexesCopy)
        }else {

        }
    },[props.numberOfLettersShown])

    useEffect(() => {
        if (Util.equalArrays(guessedName, nameLetters))
            setGuessStatus("correct");
    }, [guessedName, nameLetters]);

    let wordElement = [];
    let nameArray = name.split("");
    let letterIndex = 0;
    for (let i = 0; i < nameArray.length; i++) {
        let char = nameArray[i];
        if (Util.isLetter(char)) {
            wordElement.push(
                <span key={i} className="letter-container">
                    <Letter
                        className="letter "
                        index={letterIndex}
                        char={char}
                        setLetter={setGuessedNameLetter}
                        guess={props.guess}
                        prefilled={letterHintIndexes.includes(letterIndex)}
                    />
                </span>
            );
            letterIndex++;
        } else {
            wordElement.push(
                <Box key={i} className="char-container" component={char == " " ? "div" : "span"}>
                    {char}
                </Box>
            );
        }
    }

    return wordElement;
};

export default Word;
