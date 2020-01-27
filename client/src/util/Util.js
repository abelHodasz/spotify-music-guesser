import regex from "xregexp";


export default class Util{

    static isLetter(char) {
        const unicodeLetter = regex("^\\pL$");
        return unicodeLetter.test(char);
    }
}