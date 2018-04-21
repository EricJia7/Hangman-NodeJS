const Word = require("./Word.js");
var inquirer = require('inquirer'); 

var playerName = '';

var wordBasic = ['tree', 'boat', 'human', 'baby', 'moon', 'Android'];
var wordChallenge = ['fortlee','darkknight','mitsubishi','metuchen','philadelphia'];

var wordPool = [];
var maxGuessNum = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

function userInput() {
    inquirer.prompt([
        {
            type:'input',
            message: 'Type in your name',
            name:'playername'
        },
        {
            type: 'checkbox',
            name: 'selWordPool',
            message: 'Please choose Basic or Challenging version of the game',
            choices: ['BASIC', 'CHALLENGE']
        },
        {
            type: 'checkbox',
            name: 'numOfGuess',
            message: 'Please choose how many guesses can be made',
            choices: ['3', '6', '9']
        }
    ]).then(answer => {
        playerName = answer.playername;
        maxGuessNum = parseInt(answer.numOfGuess[0]);
        if(answer.selWordPool[0] === 'BASIC') {
            wordPool = wordBasic;
            initGame();
        } else if(answer.selWordPool[0] === 'CHALLENGE') {
            wordPool = wordChallenge;
            initGame();
        };
    });    
};

function lineBreaker() {
    console.log('\n');
};

function initGame() {
    lineBreaker();
    console.log("==============================================");
    console.log("Hello " + playerName + ' , let\'s play the game!')
    console.log("==============================================");
    gameon();
};

function singleGuess(wordObj,num,wordStr) {
    inquirer.prompt([
        {
            type:'input',
            message: 'Guess a letter: ',
            name: 'letterGuessed'
        }
    ]).then(ans => {
        if(wordObj.matchWord(ans.letterGuessed)){
            console.log('\n CORRECT!! \n');
            console.log(wordObj.showWord());
        } else {
            num--;
            lineBreaker();
            console.log('\n INCORRECT!!')
            if(num >0) {
                console.log('\n You have ' + num + ' guesses left! \n')
                console.log(wordObj.showWord()+'\n');
            } else if (num === 0 ) {
                console.log('\n Run out of luck!! Let\'s guess the next word!! \n');
                wordPool.push(wordStr);
                gameon();
            }
        };
        if(wordObj.showWord().split(' ').indexOf('_') === -1) {
            console.log('\n You got it right!! Let\'s guess the next word!! \n')
            gameon();
        } else if (num>0) {
            singleGuess(wordObj,num,wordStr); 
        };
    }); 
};

function gameon() {
    if(wordPool.length>0) {
        var index = getRandomInt(wordPool.length);
        var wordBeingGuess = wordPool[index];
        var currWord = new Word(wordBeingGuess);
        var numGuess = maxGuessNum;
        console.log(currWord.showWord());
        wordPool.splice(index,1);
        singleGuess(currWord,numGuess,wordBeingGuess);
    } else {
        console.log('Congrats!! all words have been guessed!!');
    };
};

userInput();