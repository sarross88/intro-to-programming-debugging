//This is the input id =guess
const guessInput = document.getElementById('guess');
//This is the button id= submit 
const submitButton = document.getElementById('submit');
//This is the reset button
const resetButton = document.getElementById('reset');
//all messages have this class 
const messages = document.getElementsByClassName('message');
//This is the id of the paragraph too high
const tooHighMessage = document.getElementById('too-high');
//This is paragraph displays you guessed  too-low 
const tooLowMessage = document.getElementById('too-low');
const invalidNum = document.getElementById('invalid-num');
const notANum = document.getElementById('not-a-num');
//When you reach 5 guesses the paragraph with id max-guesses shows 
const maxGuessesMessage = document.getElementById('max-guesses');
//Empty paragraph with number of guesses left
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
//Paragraph if you guess corretly 
const correctMessage = document.getElementById('correct');

// TARGET NUMBER NOT DECLARED!!! 
let targetNumber;
let attempts = 0;
// THIS NEEDS TO BE LET NOT CONST!!!! 
let maxNumberOfAttempts = 5;



// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11

//NEED MIN AND MAX SET 
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//MUST DEFINE MIN AND MAX AND SET TARGET NUMBER 1 & 2 

//
function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  console.log(guess);
  attempts = attempts + 1;
  console.log(attempts);
//49:3 DOESNT LIKE DEBUGGER 
  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < 1 || guess > 99) {
      invalidNum.style.display = '';
    } else if (guess > targetNumber) {
      tooHighMessage.style.display = '';
    } else if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    }else {
      notANum.style.display = '';
    }
    console.log(`debugger max- ${maxNumberOfAttempts} total attempts ${attempts}`)
    //THIS WAS A BUG 
    const remainingAttempts = maxNumberOfAttempts - attempts;
    
    if (remainingAttempts === 1){
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remains`;
    } else if(remainingAttempts === 0){
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> Game over! Hit reset to play again!`;
      maxGuessesMessage.style.display = '';
    } else {
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    }
  }
//TOO MANY ==== SHOULD ONLY BE 3
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';

  resetButton.style.display = '';
}


// DEBUGGER DOESNT LIKE ++ or <=
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex< messages.length; elementIndex++) {
    messages[elementIndex].style.display = "none";
  }
}

///FUNCTION SPELLED WRONG 
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  maxNumberOfAttempts = 5;

  // Enable the input and submit button CHANGED TRUE
  submitButton.disabled = false;
  guessInput.disabled = false;
// SOMETHING WRONG HERE 
  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);


resetButton.addEventListener('click', setup);

setup();
