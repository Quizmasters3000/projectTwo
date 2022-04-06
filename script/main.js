const quizApp = {}

quizApp.apiKEY = "44173360-753a-4c6f-9557-6cb1310964a6";
quizApp.submitName = document.querySelector(".submit");
quizApp.nameInput = document.querySelector(".nameInput");
quizApp.quizWrapper = document.querySelector(".quizWrapper");
quizApp.quizTitle = document.querySelector(".quizTitle");
quizApp.radioChoices = document.querySelectorAll(".choice");
quizApp.radioA = document.getElementById("radioA");
quizApp.radioB = document.getElementById("radioB");
quizApp.radioC = document.getElementById("radioC");
quizApp.radioD = document.getElementById("radioD");
quizApp.submit = document.querySelector(".submitAnswer");
quizApp.questionDefintion = document.querySelector(".questions");
quizApp.choices = document.querySelector(".choices")
quizApp.liButtons = document.querySelectorAll(".liButton")
quizApp.quizCounter = 1;
quizApp.scoreCounter = 0;
quizApp.surpriseNumber; 
quizApp.gradient = 45;
quizApp.nameElement = document.querySelector("input")
quizApp.myName;
quizApp.imageSources = ["./assets/1.png", "./assets/2.png", "./assets/3.png", "./assets/4.png", "./assets/5.png", "./assets/6.png"]


quizApp.submitName.addEventListener('click', () => {
    if (!quizApp.nameElement.value) {
        alert("Please enter your name")
    } else {
      quizApp.myName = quizApp.nameElement.value
      quizApp.nameInput.classList.add("inactive");
      quizApp.quizWrapper.classList.remove("inactive");
      quizApp.quizWrapper.classList.add("active");
       quizApp.getrandomImage();
 quizApp.displayImage();
        }
})

quizApp.changeColor = function () {
 quizApp.gradient += 100;
 document.querySelector("body").style.background = `linear-gradient(${quizApp.gradient}deg, #2879f2, #976ef7eb)`;
console.log(quizApp.gradient)
}

quizApp.getRandomNumber = function () {
    quizApp.surpriseNumber = Math.floor(Math.random() * 4);
    console.log(quizApp.surpriseNumber)
    return quizApp.surpriseNumber
}

quizApp.getRandomWord = function () {
  fetch(`https://random-word-api.herokuapp.com/word?number=4`)
    .then((res) => res.json())
    .then((resJson) => {
      console.log("random word", resJson)
      let wordA = resJson[0];
      let wordB = resJson[1];
      let wordC = resJson[2];
      let wordD = resJson[3];

      quizApp.radioA.innerText = wordA;
      quizApp.radioB.innerText = wordB;
      quizApp.radioC.innerText = wordC;
      quizApp.radioD.innerText = wordD;


      quizApp.getRandomNumber()

      let randomWords = resJson;
      let randomWord = randomWords[quizApp.surpriseNumber];
      console.log(randomWord);

      quizApp.fetchDiction(randomWord);
      // buttonSubmit();
      //   selectedRadio(randomWord);
    });
  quizApp.fetchDiction = (randomWord) => {
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${randomWord}?key=${quizApp.apiKEY}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson[0].shortdef[0]) {
          let def = resJson[0].shortdef[0];
          let definition = def.charAt(0).toUpperCase() + def.slice(1)
          quizApp.questionDefintion.innerText = definition;
          console.log(resJson)
          
        } else {
          console.log(resJson)
          throw Error("help")
        }
      })
      .catch((error) => {
          if (error) {
            quizApp.getRandomWord();
              } 
                });
  };
  };

quizApp.resetAll = function() {
  quizApp.getRandomWord(quizApp.surpriseNumber);
  quizApp.uncheckRadio();
}


quizApp.loadQuiz = function() {
  quizApp.uncheckRadio();
  quizApp.getRandomWord();
    // selectedRadio()
  quizApp.quizCounter++;
  // quizApp.choices.classList.toggle('rightSideAnimate')
  // quizApp.choices.classList.toggle('leftSideAnimate')
  // quizApp.liButtons.forEach(li => li.classList.remove('blueish'))

}

quizApp.uncheckRadio = function() {
  quizApp.radioChoices.forEach((choice) => (choice.checked = false));
}

//   quizApp.liButtons.forEach(li => {
//     li.addEventListener('click', () => {
//           console.log('click')
//           quizApp.liButtons.forEach(li => li.classList.remove('blueish'))
//           li.classList.add('blueish')     
//     })
// })


quizApp.selectedRadio = function (randomWord) {
  let chosen;
  quizApp.radioChoices.forEach((choice) => {
    if (choice.checked) {
      chosen = choice.id;
      
    }
  });
  return chosen;
}

quizApp.submit.addEventListener("click", () => {
  console.log('submit')
  quizApp.getrandomImage();
 quizApp.displayImage();
  quizApp.changeColor();
    let chosen = quizApp.selectedRadio();
    if (chosen) {
      if (chosen == quizApp.surpriseNumber) {
        quizApp.scoreCounter++;
      }
      // quizCounter++;
      if (quizApp.quizCounter < 5) {
        quizApp.loadQuiz();
    
      } else {
        quizApp.quizTitle.innerHTML = `
           <h2>Congrats!!! 
           You got ${quizApp.scoreCounter}/ 5 questions correctly</h2>
           <button class="submit" onclick="location.reload()">Reload</button>`;
      }
    }
  })

quizApp.getrandomImage = function () {
 quizApp.randomImage = Math.floor(Math.random() * quizApp.imageSources.length);
 console.log(quizApp.randomImage, quizApp.imageSources[quizApp.randomImage]);
 return quizApp.imageSources[quizApp.randomImage]
};

quizApp.displayImage = function () {
  quizApp.imageArea = document.createElement("div")
  quizApp.image = document.createElement("img");
   quizApp.image.src= `${quizApp.imageSources[quizApp.randomImage]}`
  quizApp.imageArea.appendChild(quizApp.image)
  document.querySelector(".imgContainer").appendChild(quizApp.imageArea);
}

quizApp.init = function() {
  (() => {
  quizApp.resetAll();
})();
}


quizApp.init()