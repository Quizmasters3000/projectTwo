const quizApp = {};

quizApp.apiKEY = "44173360-753a-4c6f-9557-6cb1310964a6";
quizApp.submitName = document.querySelector(".submitName");
quizApp.introCard = document.querySelector(".introCard");
quizApp.quizSection = document.querySelector(".quizSection");
quizApp.quizCard = document.querySelector(".quizCard");
quizApp.radioChoices = document.querySelectorAll(".choice");
quizApp.radioA = document.getElementById("radioA");
quizApp.radioB = document.getElementById("radioB");
quizApp.radioC = document.getElementById("radioC");
quizApp.radioD = document.getElementById("radioD");
quizApp.submitAnswer = document.querySelector(".submitAnswer");
quizApp.questionDefintion = document.querySelector(".questions");
quizApp.choices = document.querySelector(".choices");
quizApp.liButtons = document.querySelectorAll(".liButton");
quizApp.quizCounter = 1;
quizApp.choiceCounter = 0;
quizApp.scoreCounter = 0;
quizApp.surpriseNumber;
quizApp.gradient = 45;
quizApp.radioLabels = document.querySelectorAll(".radioLabel");
quizApp.nameElement = document.querySelector(".userName");
quizApp.myName;
quizApp.gameLength = 10;
quizApp.imageSources = [
  "./assets/1.png",
  "./assets/2.png",
  "./assets/3.png",
  "./assets/4.png",
  "./assets/5.png",
  "./assets/6.png",
];


quizApp.submitName.addEventListener("click", () => {
  if (!quizApp.nameElement.value) {
    alert("Please enter your name");
  } else {
    quizApp.myName = quizApp.nameElement.value;
    // quizApp.myName = "stephen"
    const welcome = document.querySelector(".welcomeSection");
    welcome.classList.remove("active");
    // quizApp.quizWrapper.classList.remove("inactive");
    quizApp.quizSection.classList.add("active");
    quizApp.getrandomImage();
    quizApp.displayImage();
    return quizApp.myName;
  }
});

quizApp.changeColor = function () {
  quizApp.gradient += 100;
  document.querySelector(
    "body"
  ).style.background = `linear-gradient(${quizApp.gradient}deg, #2879f2, #976ef7eb)`;
  console.log(quizApp.gradient);
};

// Creates random number
quizApp.getRandomNumber = function () {
  quizApp.surpriseNumber = Math.floor(Math.random() * 4);
  console.log(quizApp.surpriseNumber);
  return quizApp.surpriseNumber;
};


quizApp.pusher = function() {
  quizApp.choiceCounter = (Math.floor(Math.random() * 44)) 
}

quizApp.queryTheme;
quizApp.radioTheme = document.querySelectorAll('.radioTheme')
console.log(quizApp.radioTheme)



// Fetches random words
quizApp.getRandomWord = function () {
  fetch(`http://api.datamuse.com/words?rel_trg=${quizApp.queryTheme}&max=200`)
    .then((res) => res.json())
    .then((resJson) => {
      
      let wordA = resJson[0 + quizApp.choiceCounter].word;
      let wordB = resJson[1 + quizApp.choiceCounter].word;
      let wordC = resJson[2 + quizApp.choiceCounter].word;
      let wordD = resJson[3 + quizApp.choiceCounter].word;

      document.getElementById("spanA").innerText = wordA;
      document.getElementById("spanB").innerText = wordB;
      document.getElementById("spanC").innerText = wordC;
      document.getElementById("spanD").innerText = wordD;

      quizApp.getRandomNumber();

      let randomWords = resJson;
      console.log(randomWords);
      let randomWord = randomWords[quizApp.surpriseNumber + quizApp.choiceCounter].word;
      console.log(randomWord);

      quizApp.fetchDiction(randomWord);
      // buttonSubmit();
      //   selectedRadio(randomWord);
    });

  // Fetches dictionary meaning for words
  quizApp.fetchDiction = (randomWord) => {
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${randomWord}?key=${quizApp.apiKEY}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson[0].shortdef[0]) {
          let def = resJson[0].shortdef[0];
          let definition = def.charAt(0).toUpperCase() + def.slice(1);
          quizApp.questionDefintion.innerText = definition;
          console.log(resJson);
        } else {
          console.log(resJson);
          throw Error("help");
        }
      })
      .catch((error) => {
        if (error) {
          quizApp.getRandomWord();

        }
      });
  };
};

quizApp.themeChoser = function() {
  quizApp.radioTheme.forEach(theme => {
    theme.addEventListener('click', function() {
      if(theme.id) {
        console.log(theme.id)
        quizApp.queryTheme = theme.id
        quizApp.getRandomWord()
      }
    })
  })
}


quizApp.resetAll = function () {
  quizApp.getRandomWord(quizApp.surpriseNumber);
  quizApp.uncheckRadio();
};

// Loads quiz and core animations
quizApp.loadQuiz = function () {
  quizApp.uncheckRadio();
  quizApp.getRandomWord();
  quizApp.pusher()

  // selectedRadio()
  quizApp.liButtons.forEach((li) => {
    li.classList.add("animateInto");
  });

  quizApp.quizCounter++;

  quizApp.liButtons.forEach((li) => {
    li.classList.remove("clicked");
  });
};

// Unchecks the radio options from memory
quizApp.uncheckRadio = function () {
  quizApp.radioChoices.forEach((choice) => (choice.checked = false));
};

// Adds animations to radio buttons
quizApp.liButtons.forEach((li) => {
  li.addEventListener("click", () => {
    quizApp.liButtons.forEach((li) => {
      li.classList.remove("animateInto");
    });
    quizApp.liButtons.forEach((li) => li.classList.remove("clicked"));
    li.classList.add("clicked");
  });
});

// Status bar functionality
quizApp.statusCounter = 1;
quizApp.setStatusBar = function () {
  quizApp.statusCounter++;
  let percentage = (quizApp.statusCounter / quizApp.gameLength) * 100;
  console.log(percentage);
  document.querySelector(".statusBar").style.width = `${percentage}%`;
};

// Checks to see what button was selected
quizApp.selectedRadio = function (randomWord) {
  let chosen;
  quizApp.radioChoices.forEach((choice) => {
    if (choice.checked) {
      chosen = choice.id;
    }
  });
  return chosen;
};

// Answer submission button functionality and animations
quizApp.submitAnswer.addEventListener("click", () => {
  quizApp.getrandomImage();
  quizApp.illustration = document.querySelector(".illustration").innerHTML =
    " ";
  quizApp.displayImage();
  quizApp.changeColor();
  let chosen = quizApp.selectedRadio();
  if (chosen) {
    if (chosen == quizApp.surpriseNumber) {
      quizApp.scoreCounter++;
    }
    // quizCounter++;
    if (quizApp.quizCounter < quizApp.gameLength) {
      quizApp.loadQuiz();
      quizApp.setStatusBar();
    } else {
      quizApp.quizCard.innerHTML = `
           <h2>Congrats ${quizApp.myName}!!! 
           You got ${quizApp.scoreCounter}/ ${quizApp.gameLength} questions correctly</h2>
           <button class="againButton" onclick="location.reload()">Try Again</button>`;
    }
  }
});

// Generates random fun illustrations for the quiz card
quizApp.getrandomImage = function () {
  quizApp.randomImage = Math.floor(Math.random() * quizApp.imageSources.length);
  console.log(quizApp.randomImage, quizApp.imageSources[quizApp.randomImage]);
  return quizApp.imageSources[quizApp.randomImage];
};

// Displays random illustrations
quizApp.displayImage = function () {
  quizApp.illustration = document.querySelector(".illustration");
  quizApp.image = document.createElement("img");
  quizApp.image.src = `${quizApp.imageSources[quizApp.randomImage]}`;
  quizApp.illustration.append(quizApp.image);
};

// IIFE to start things off after logging user name
quizApp.init = function () {
  (() => {
    quizApp.themeChoser()

    quizApp.resetAll();
  })();
};

quizApp.init();
