const Word = require("./Word.js");
var inquirer = require('inquirer'); 

var playerName = '';

var wordBasic = ['tree', 'human'];
// var wordBasic = ['tree', 'boat', 'human', 'baby', 'moon'];
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

function singleGuess(obj,num) {
    inquirer.prompt([
        {
            type:'input',
            message: 'Guess a letter: ',
            name: 'letterGuessed'
        }
    ]).then(ans => {
        if(obj.matchWord(ans.letterGuessed)){
            console.log('\n CORRECT!! \n');
            console.log(obj.showWord());
        } else {
            num--;
            lineBreaker();
            console.log('\n INCORRECT!!')
            console.log('\n You have ' + num + ' guesses left! \n')
            console.log(obj.showWord());
        }
        if(num ===0) {
            
        }
        if(num>0) {
            singleGuess(obj,num);
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
        singleGuess(currWord,numGuess);
    } else {
        console.log('Congrats! all words have been guessed!')
    };
};

userInput();