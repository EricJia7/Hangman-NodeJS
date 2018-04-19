
const Letter = require("./Letter.js");

class Word {
    constructor (str) {
        this.ltrArray = str.split('').map(ele => new Letter(ele))
    };
    showWord() {
        return ''.concat(...this.ltrArray.map(ele => ele.showChar()));
    };
    matchWord(str) {
        let checkVal = false;
        this.ltrArray.forEach(function(ele) {
            if(ele.matchCheck(str)) {
                checkVal = true;
            }
        });
        return checkVal;
    };
};

var word = new Word('tree');
word.showWord();
word.matchWord('t');
word.showWord();

module.exports = Word;