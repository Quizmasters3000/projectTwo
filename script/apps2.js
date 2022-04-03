// const apiKEY = "8830677a-8030-4a96-a3db-4eeb5fa00be1";
// https://www.dictionaryapi.com/api/v3/references/sd2/json/${randomWord}?key=${apiKEY}
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
let nameElement = document.querySelector(".name")
let myName;

submitName.addEventListener('click', () => {
    nameInput.classList.add("inactive");
    quizWrapper.classList.add("active");
    quizWrapper.classList.remove("inactive");
    if (!nameElement.value) {
        alert("Please enter your name")
    } else {
        myName = nameElement.value
        console.log(myName)
        return myName;
    }

})
// submitName.addEventListener("click", () => {
    
//   //   if (myName){
//   //       console.log(myName);
//   //   } else {
//   //   alert("Please put in your name!")
//   // }
// });
getRandomWord = () => {
  fetch(`https://random-word-api.herokuapp.com/word?number=4`)
    .then((res) => res.json())
    .then((resJson) => {
      // displayWords(resJson)
      let wordA = resJson[0];
      let wordB = resJson[1];
      let wordC = resJson[2];
      let wordD = resJson[3];
      radioA.innerText = wordA;
      radioB.innerText = wordB;
      radioC.innerText = wordC;
      radioD.innerText = wordD;
      let surpriseNumber = Math.floor(Math.random() * 4);
      let randomWords = resJson;
      let randomWord = randomWords[surpriseNumber];
      console.log(randomWord);
      fetchDiction(randomWord);
      buttonSubmit(surpriseNumber);
      //   selectedRadio(randomWord);
    });
  fetchDiction = (randomWord) => {
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${randomWord}?key=${apiKEY}`
    )
      .then((res) => res.json())
      // .then((resJson) => {
      // .then((res) => {
      //   if (res.status >= 200 && res.status <= 299) {
      //     return res.json();
      //   } else {
      //     throw Error(res.statusText);
      //   }
      // })
      .then((resJson) => {
        if (resJson[0].shortdef[0]) {
          let def = resJson[0].shortdef[0];
          let definition = def.charAt(0).toUpperCase() + def.slice(1)
          questionDefintion.innerText = definition;
          console.log(resJson)
  
        } else {
          console.log(resJson)
          throw Error("hep")
        }
        
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
        console.log('other')
        getRandomWord();
        // let def = resJson[0].shortdef[0];
        //   let definition = def.charAt(0).toUpperCase() + def.slice(1)
        //   questionDefintion.innerText = definition;
      });
  };
};

(() => {
  resetAll();
})();

function resetAll() {
  getRandomWord();
  uncheckRadio();
}
function loadQuiz() {
  uncheckRadio();
  getRandomWord();
  selectedRadio()
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
function buttonSubmit(surpriseNumber) {
  submit.addEventListener("click", () => {
    let chosen = selectedRadio();
    // chosen = Number(chosen)
    if (chosen) {
      console.log(chosen)
      console.log(surpriseNumber)
      if (chosen == surpriseNumber) {
        scoreCounter++;
        console.log(`${scoreCounter} is your new score`);
      }
      // quizCounter++
      // getRandomWord();
      if (quizCounter < 5) {
        loadQuiz();
      } else {
        quiz.innerHTML = `
           <h2>Congrats!!! ${myName}
           you got ${scoreCounter}/ 5 questions correctly</h2>
           <button onclick="location.reload()">Reload</button>`;
      }
    }
  });
}
