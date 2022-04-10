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
quizApp.radioTheme = document.querySelectorAll(".radioTheme");
quizApp.themeButton = document.querySelectorAll(".themeButton");
quizApp.levelButton = document.querySelectorAll(".levelButton");
quizApp.theme = document.querySelectorAll(".theme");
quizApp.radioLabels = document.querySelectorAll(".radioLabel");
quizApp.nameElement = document.querySelector(".userName");
quizApp.radioLevel = document.querySelectorAll(".radioLevel");
quizApp.quizCounter = 0;
quizApp.quizLetter = 0;
quizApp.choiceCounter = 0;
quizApp.scoreCounter = 0;
quizApp.myLevel = 0;
// quizApp.statusCounter = 1;
quizApp.surpriseNumber;
quizApp.gradient = 0;
quizApp.myName;
// quizApp.gameLength = 10;
quizApp.queryTheme;
quizApp.imageSources = [
  "./assets/1.png",
  "./assets/2.png",
  "./assets/3.png",
  "./assets/4.png",
  "./assets/5.png",
  "./assets/6.png",
];

quizApp.lettersArrary = [
  "q",
  "u",
  "i",
  "z",
  "t",
  "i2",
  "o",
  "n",
  "a",
  "r",
  "y",
];

quizApp.submitName.addEventListener("click", () => {
  if (
    !quizApp.nameElement.value ||
    quizApp.myLevel == 0 ||
    !quizApp.queryTheme
  ) {
    alert("Please complete all the fields");
  } else {

    if(quizApp.myLevel == 5) {
    console.log("it is 5")
    document.querySelector('h1').innerHTML = `
    <h1>
        <span class="q titleAnimation" id="q">Q</span>
        <span class="u titleAnimation" id="u">U</span>
        <span class="i titleAnimation" id="i">I</span>
        <span class="z titleAnimation" id="z">Z</span>
        <span class="y titleAnimation" id="y">Y</span>
      </h1>
    `
  } 


    quizApp.myName = quizApp.nameElement.value;
    const welcome = document.querySelector(".welcomeSection");
    welcome.classList.add("deactivate");
    welcome.addEventListener("transitionend", () => {
      welcome.classList.remove("active");
      quizApp.quizSection.classList.add("active");
      quizApp.getrandomImage();
      quizApp.displayImage();
      return quizApp.myName;
    });
  }
});

// user chooses themes for their quiz questions
quizApp.themeChoser = function () {
  quizApp.radioTheme.forEach((theme) => {
    theme.addEventListener("click", function () {
      if (theme.id) {
        quizApp.queryTheme = theme.id;
        console.log(theme.id);
        quizApp.getRandomWord();
      }
    });
  });
};
// user chooses 5 or 10 questions before proceeding the quiz
quizApp.userChoice = function () {
  quizApp.radioLevel.forEach((level) => {
    level.addEventListener("click", function () {
      if (level.id) {
        quizApp.myLevel = level.id;
        console.log(`you have chosen to play ${quizApp.myLevel}`);
      }
    });
  });
};
// background changes on click
quizApp.changeColor = function () {
  quizApp.gradient += 100;
  document.querySelector(
    "body"
  ).style.background = `linear-gradient(${quizApp.gradient}deg, #2879f2, #976ef7eb)`;
  console.log(quizApp.gradient);
};

// Creates random number (to create a random word to define)
quizApp.getRandomNumber = function () {
  quizApp.surpriseNumber = Math.floor(Math.random() * 4);
};

// creates random number (to procure random quiz questions)
quizApp.pusher = function () {
  quizApp.choiceCounter = Math.floor(Math.random() * 44);
};

quizApp.optionA = document.getElementById("spanA");
quizApp.optionB = document.getElementById("spanB");
quizApp.optionC = document.getElementById("spanC");
quizApp.optionD = document.getElementById("spanD");

// Fetches random words
quizApp.getRandomWord = function () {
  fetch(`https://api.datamuse.com/words?rel_trg=${quizApp.queryTheme}&max=200`)
    .then((res) => res.json())
    .then((resJson) => {
      let wordA = resJson[0 + quizApp.choiceCounter].word;
      let wordB = resJson[1 + quizApp.choiceCounter].word;
      let wordC = resJson[2 + quizApp.choiceCounter].word;
      let wordD = resJson[3 + quizApp.choiceCounter].word;

      quizApp.optionA.innerText = wordA;
      quizApp.optionB.innerText = wordB;
      quizApp.optionC.innerText = wordC;
      quizApp.optionD.innerText = wordD;

      quizApp.getRandomNumber();

      let randomWords = resJson;
      let randomWord =
        randomWords[quizApp.surpriseNumber + quizApp.choiceCounter].word;

      quizApp.fetchDiction(randomWord);
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
          if (definition.length > 250) {
            document.querySelector(".questions").style.fontSize = "0.7rem";
          } else {
            document.querySelector(".questions").style.fontSize = "1rem";
          }
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
quizApp.resetAll = function () {
  quizApp.getRandomWord(quizApp.surpriseNumber);
  quizApp.uncheckRadio();
};

// Loads quiz and core animations
quizApp.loadQuiz = function () {
  quizApp.uncheckRadio();
  quizApp.getRandomWord();
  quizApp.pusher();
  quizApp.quizCounter++;
  quizApp.liButtons.forEach((li) => {
    li.classList.add("animateInto");
  });
  quizApp.quizLetter++;
  // adds transitions
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
    let currentLetter = quizApp.lettersArrary[quizApp.quizLetter];
    let liInnerText = li.children[1].innerText;
    let letterTitle = liInnerText.substring(1);
    document.getElementById([currentLetter]).title = `${letterTitle}`;

    quizApp.questionDefintion.classList.remove("faded");
    quizApp.liButtons.forEach((li) => {
      li.classList.remove("animateButtons");
    });
    quizApp.liButtons.forEach((li) => li.classList.remove("clicked"));
    li.classList.add("clicked");
  });
});

// adding animation to the theme button
quizApp.themeButton.forEach((li) => {
  li.addEventListener("click", () => {
    quizApp.themeButton.forEach((li) => {
      li.classList.remove("themeSubmit");
    });
    quizApp.themeButton.forEach((li) => li.classList.remove("themeSubmit"));
    li.classList.add("themeSubmit");
  });
});

// adding animation to the level button
quizApp.levelButton.forEach((li) => {
  li.addEventListener("click", () => {
    quizApp.levelButton.forEach((li) => {
      li.classList.remove("levelSubmit");
    });
    quizApp.levelButton.forEach((li) => li.classList.remove("levelSubmit"));
    li.classList.add("levelSubmit");
  });
});

// Status bar functionality
// quizApp.setStatusBar = function () {
//   quizApp.statusCounter++;
//   let percentage = (quizApp.statusCounter / quizApp.myLevel) * 100;
//   console.log(percentage);
//   document.querySelector(".statusBar").style.width = `${percentage}%`;
// };

// Checks to see what button was selected
quizApp.selectedRadio = function () {
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
      let currentLetter = quizApp.lettersArrary[quizApp.quizLetter];
      document.getElementById([currentLetter]).classList.add("rightAnswer");
    } else {
      let currentLetter = quizApp.lettersArrary[quizApp.quizLetter];
      document.getElementById([currentLetter]).classList.add("wrongAnswer");
    }
    // quizCounter++;
    if (quizApp.quizCounter < quizApp.myLevel) {
      quizApp.questionDefintion.classList.add("faded");
      quizApp.loadQuiz();
      // quizApp.setStatusBar();
      console.log(quizApp.quizCounter);
    } else {
      quizApp.quizCard.innerHTML = `
           <h2>Congrats ${quizApp.myName}!!! 
           You got ${quizApp.scoreCounter}/ ${quizApp.myLevel} questions correctly</h2>
           <button class="againButton" onclick="location.reload()">Try Again</button>`;
    }
  }
});

// Generates random fun illustrations for the quiz card
quizApp.getrandomImage = function () {
  quizApp.randomImage = Math.floor(Math.random() * quizApp.imageSources.length);
  // console.log(quizApp.randomImage, quizApp.imageSources[quizApp.randomImage]);
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
    quizApp.themeChoser();
    quizApp.userChoice();
    quizApp.resetAll();
  })();
};

quizApp.init();
