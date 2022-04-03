const apiKEY = "44173360-753a-4c6f-9557-6cb1310964a6";
const submitName = document.querySelector(".submit");
const nameInput = document.querySelector(".nameInput");
const quizWrapper = document.querySelector(".quizWrapper");
const quiz = document.querySelector(".quizWrapper");
const radioChoices = document.querySelectorAll(".choice");
const radioA = document.getElementById("radioA");
const radioB = document.getElementById("radioB");
const radioC = document.getElementById("radioC");
const radioD = document.getElementById("radioD");
const submit = document.querySelector(".submitAnswer");
const questionDefintion = document.querySelector(".questions");

let quizCounter = 1;
let scoreCounter = 0;
let surpriseNumber;

function getRandomNumber() {
    surpriseNumber = Math.floor(Math.random() * 4);
    console.log(surpriseNumber)
    return surpriseNumber
}


getRandomWord = () => {
  fetch(`https://random-word-api.herokuapp.com/word?number=4`)
    .then((res) => res.json())
    .then((resJson) => {
      let wordA = resJson[0];
      let wordB = resJson[1];
      let wordC = resJson[2];
      let wordD = resJson[3];

      radioA.innerText = wordA;
      radioB.innerText = wordB;
      radioC.innerText = wordC;
      radioD.innerText = wordD;


      getRandomNumber()

      console.log(`${surpriseNumber} is the random num generated at the start`)

      let randomWords = resJson;

      let randomWord = randomWords[surpriseNumber];
      console.log(randomWord);

      fetchDiction(randomWord);
      // buttonSubmit();
      //   selectedRadio(randomWord);
    });
  fetchDiction = (randomWord) => {
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${randomWord}?key=${apiKEY}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson[0].shortdef[0]) {
          let def = resJson[0].shortdef[0];
          let definition = def.charAt(0).toUpperCase() + def.slice(1)
          questionDefintion.innerText = definition;
          console.log(resJson)
          
        } else {
          console.log(resJson)
          throw Error("help")
        }
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
        console.log('other')
        getRandomWord();
      });
  };
};

(() => {
  resetAll();
})();

function resetAll() {
  getRandomWord(surpriseNumber);
  uncheckRadio();
}

function loadQuiz() {
  uncheckRadio();
  getRandomWord();
  // selectedRadio()
  quizCounter++;
}

function uncheckRadio() {
  radioChoices.forEach((choice) => (choice.checked = false));
}

function selectedRadio(randomWord) {
  let chosen;
  radioChoices.forEach((choice) => {
    if (choice.checked) {
      chosen = choice.id;
    }
  });
  return chosen;
}
// function buttonSubmit() {
  submit.addEventListener("click", () => {
    let chosen = selectedRadio();
    if (chosen) {
      if (chosen == surpriseNumber) {
        scoreCounter++;
      }
      // quizCounter++;
      if (quizCounter < 5) {
        loadQuiz();
      } else {
        quiz.innerHTML = `
           <h2>Congrats!!! 
           You got ${scoreCounter}/ 5 questions correctly</h2>
           <button onclick="location.reload()">Reload</button>`;
      }
    }
  });
// }