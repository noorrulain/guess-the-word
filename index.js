const wordsUrl =
  "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt";
const numberOfGuessesText = document.querySelector("#guesses");
const button = document.querySelector("#game button");
const form = document.querySelector("form");
const input = document.querySelector("input");
const word = document.querySelector("#word");
const lettersGuessed = document.querySelector("#letters");
const modalBox = document.querySelector(".modal-box");
const resultBox = document.querySelector(".result-box");
const resultText = document.querySelector(".modal-box h2");
const resultNext = document.querySelector(".modal-box p");
const resultEmoji = document.querySelector(".modal-box span");
const resultButton = document.querySelector(".modal-box button");
let numberOfGuesses = 8;
var inputtedLetter;
var guessedLetterArray = [];
var randomWord;
var wordLetters;
var wordLetterArray = [];

const hideResult = () => {
  modalBox.style.display = "none";
};
// resultEmoji.innerHTML = "&#127881;";
// resultText.innerText = "You win!!!";
// resultNext.innerText = "Refresh to replay.";

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

hideResult();
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
  let testRegex = /[A-Za-z]/;
  if (testRegex.test(inputtedLetter)) {
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
            resultButton.addEventListener("click", hideResult);
            //input.disabled=true;
            setTimeout(() => {
              if (
                document.querySelectorAll(".guessed-letter").length ===
                wordLetters.length
              ) {
                modalBox.style.display = "flex";
                resultBox.style.backgroundColor = "#7abd7e";
                resultEmoji.innerHTML = "&#127881;";
                resultText.innerText = "You win!!!";
                resultNext.innerText = "Refresh to replay.";
                input.disabled = true;
                numberOfGuessesText.textContent = "Refresh to replay.";
                button.disabled = true;
              }
            }, 150);
          }
        }
      } else {
        if (numberOfGuesses > 0) {
          numberOfGuesses--;
          if (numberOfGuesses === 0) {
            input.disabled = true;
            resultBox.style.backgroundColor = "#e96868";
            modalBox.style.display = "flex";
            resultEmoji.innerHTML = "&#128128;";
            resultText.innerText = `Game Over. The word was ${randomWord}`;
            resultNext.innerText = "Press OK to restart.";
            resultButton.addEventListener("click", () => {
              hideResult();
              window.location.reload();
            });
            // if (
            //   confirm(
            //     `Game Over. The word was ${randomWord}. \nPress OK to restart.`
            //   )
            // ) {
            //   window.location.reload();
            // }
          } else {
            numberOfGuessesText.textContent = `You have ${numberOfGuesses} guesses remaining.`;
          }
        }
      }
    }
    guessedLetterArray.push(inputtedLetter);
  } else {
    numberOfGuessesText.textContent = `Guess a letter. ${numberOfGuesses} guesses remaining.`;
  }

  input.value = "";
};
