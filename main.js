window.addEventListener('load', init);

// Global variables
var highscores = [];
var storedScores = 0;
var boardFull = false;
var insert = true;
var similar = false;

//Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
}

//To change level
const currentLevel = levels.medium;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscore1 = document.querySelector('#highscore1');
const highscore2 = document.querySelector('#highscore2');
const highscore3 = document.querySelector('#highscore3');

const words = [
  'agreement',
  'management',
  'participant',
  'probably',
  'series',
  'staff',
  'throughout',
  'whose',
  'treatment',
  'developer',
  'successful',
  'source',
  'shoot',
  'responsibility',
  'mini',
  'hail',
  'lovely',
  'criminal',
  'pretty',
  'ubiquitous',
  'tremendous',
  'people',
  'monkey',
  'dog',
  'elephant'
];

//Initialize Game
function init(){
  //Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  //Load word from array
  showWord(words);
  //Start matching on word input
  wordInput.addEventListener('input', startMatch);
  //Call countdown every seconds
  setInterval(countdown, 1000);
  //Check game status
  setInterval(checkStatus, 50);

}

// Start match
function startMatch(){

  if(matchWords()){
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }

  //If score is -1, display 0
  if(score === -1){
    scoreDisplay.innerHTML = 0;

  }else{
    scoreDisplay.innerHTML = score;
  }

}

//Match currentWord to wordInput
function matchWords(){
  if(wordInput.value === currentWord.innerHTML){
    message.innerHTML = 'Correct!';
    return true
  }else{
    message.innerHTML = '';
    return false;
  }
}


//Pick & show random words
function showWord(words){
  //Generate random array index
  const randIndex = Math.floor(Math.random() * words.length)

  //Output random word
  currentWord.innerHTML = words[randIndex];

}

// Countdown timer
function countdown(){
  // Make sure time is not run Output
  if(time > 0){
    // Decrement
    time--;
  }else if(time === 0){
    //Game is over
    isPlaying = false;
  }

  //Show time
  timeDisplay.innerHTML = time;

}

//Check game checkStatus
function checkStatus(){
  if(!isPlaying && time === 0){
    message.innerHTML = 'Game Over!!!';

    //Highscore board
    if(storedScores ==  2){
      highscores.sort();
      for(var i = 0, j = 0; i < 3; i++){

        if(score > highscores[i]){
          j++;
          insert = true;
          similar = false;
        }

        if(score == highscores[i]){
            similar = true;
        }

      }

      if(insert == true && similar == false){
        highscores.splice( j, 0, score);
        insert = false;
      }
    }

    if(storedScores < 3 && score > 0 && score != highscores[0] && boardFull == false){
      highscores.sort();
      highscores.push(score);
      storedScores ++;
      //stop at 2
      if(storedScores == 2){
        boardFull = true;
      }
    }

    highscores.reverse();
    highscore1.innerHTML = highscores[0];
    highscore2.innerHTML = highscores[1];
    highscore3.innerHTML = highscores[2];
    setToZero();
    // end of highscore board manipulation

    score = -1;
  }
}

//Set highscores of undefined value or less than zero to 0
function setToZero(){
  if(highscore1.innerHTML === undefined || highscore1.innerHTML  < 0){
    highscore1.innerHTML = 0;
  }
  if(highscore2.innerHTML === undefined || highscore2.innerHTML  < 0){
    highscore2.innerHTML = 0;
  }
  if(highscore3.innerHTML === undefined || highscore3.innerHTML  < 0){
    highscore3.innerHTML = 0;
  }
}
