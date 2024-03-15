const wordsUrl =
  "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt";
const numberOfGuessesText = document.querySelector("#guesses");
const button = document.querySelector("button");
const form = document.querySelector("form");
const input = document.querySelector("input");
const word = document.querySelector("#word");
const lettersGuessed = document.querySelector("#letters");
let numberOfGuesses = 8;
var inputtedLetter;
var guessedLetterArray = [];
var randomWord;
var wordLetters;
var wordLetterArray = [];

const fetchWord = async () => {
  try {
    const res = await fetch(wordsUrl);
    const data = await res.text();
    displayWord(data);
  } catch (err) {
    console.log(err);
  }
};

const displayWord = (data) => {
  const wordsArray = data.split("\n");
  const randomIndex = Math.floor(Math.random() * wordsArray.length);
  randomWord = wordsArray[randomIndex].toUpperCase();
  wordLetters = randomWord.split("");
  word.innerHTML = wordLetters
    .map((letter) => {
      return `<div class="word-letter"></div>`;
    })
    .join("");
  wordLetterArray.push(document.querySelectorAll("div.word-letter"));
};

const checkWin = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if ((arr[i].textContent = "")) {
      return false;
    }
  }
  return true;
};

fetchWord();

// button.addEventListener("click", () => {
//   if (numberOfGuesses > 0) {
//     numberOfGuesses--;
//     numberOfGuessesText.textContent = numberOfGuesses;
//   }
// });

form.onsubmit = (event) => {
  event.preventDefault();
  inputtedLetter = input.value.toUpperCase();
  console.log(inputtedLetter);
  if (guessedLetterArray.includes(inputtedLetter)) {
    numberOfGuessesText.textContent = `You already guessed this letter. Try again. ${numberOfGuesses} guesses remaining.`;
  } else {
    if (guessedLetterArray.length === 0) {
      lettersGuessed.textContent = "Letters guessed: " + inputtedLetter;
    } else {
      lettersGuessed.textContent += ", " + inputtedLetter;
    }
    if (wordLetters.includes(inputtedLetter)) {
      for (let i = 0; i < wordLetters.length; i++) {
        if (wordLetters[i] === inputtedLetter) {
          wordLetterArray[0][i].innerText = `${inputtedLetter}`;
          wordLetterArray[0][i].classList.add("guessed-letter");
          setTimeout(() => {
            if (
              document.querySelectorAll(".guessed-letter").length ===
              wordLetters.length
            ) {
              alert(
                `You win!!! The word was ${randomWord}.\nRefresh to replay!`
              );
            }
          }, 300);
        }
      }
    } else {
      if (numberOfGuesses > 0) {
        numberOfGuesses--;
        if (numberOfGuesses === 0) {
          if (
            confirm(
              `Game Over. The word was ${randomWord}. \nPress OK to restart.`
            )
          ) {
            window.location.reload();
          }
        } else {
          numberOfGuessesText.textContent = `You have ${numberOfGuesses} guesses remaining.`;
        }
      }
    }
  }
  guessedLetterArray.push(inputtedLetter);
  input.value = "";
};
