
class Letter {
    constructor(char) {
        this.char = char;
        this.hasBeenGuessed = false;
    };
    showChar() {
        if(this.hasBeenGuessed) {
            return(' ' + this.char + ' ')
        } else {
            return(' _ ')
        }
    };
    matchCheck(ltr) {
        if(ltr === this.char) {
            this.hasBeenGuessed = true;
            return true;
        } else {
            return false;
        }
    };
};

module.exports = Letter;