// A  welcome page will ask for the users name and display the title of the game. It will contain and input for the text name and a button that will trigger the start of the quiz game. This will be written in the HTML of game. It's container will be given a CSS class of 'active' as visible. Once the start button has been pushed, the name will be stored to a variable for later use. The active class will then be deactivated, rendering it and the content hidden to the screen. Simultaneously, the active class will be added to the quiz container, making the game visible to the user. 

// A global space for declaring all of the getElement / querySelectors 

const quiz = document.querySelector(".quizWrapper");
const radioAnswers = document.querySelectorAll('.answer')
const questionHeader = document.querySelector(".questions");
const radioA = document.getElementById("radioA");
const radioB = document.getElementById("radioB");
const radioC = document.getElementById("radioC");
const radioD = document.getElementById("radioD");
const submit = document.querySelector(".submit");

// Variable that contains the users first name to hold for the last page

// Variable for stretch goal, to let users decide on how long they would like to play / number of questions



// An array of objects (quizData) will contain all the questions and radio options that users will encounter in the game. 

const quizData = [
  {
    question: "What is 4 + 4",
    a: "8",
    b: "10",
    c: "2",
    d: "none of the above",
    correct: "a",
  },
  {
    question: "What colour is the sky",
    a: "Yello",
    b: "Grey",
    c: "Turquoise",
    d: "Blue",
    correct: "d",
  },
  {
    question: "How many hours in a day",
    a: "12",
    b: "20",
    c: "24",
    d: "30",
    correct: "c",
  },
  {
    question: "What cohort are we in Juno",
    a: "39",
    b: "40",
    c: "41",
    d: "42",
    correct: "b",
  },
];

// A function will be made to the Merriam-Webster dictionary api for data fetching. It will take one parameter - a word that will replace the query term on the api. When called, a word from the quizData array of objects will be passed into it, which will query the api and this will obtain the needed definition of each question. These will then be rendered to the screen in the header of the page. 

fetchDiction = (words) => {
    fetch(`https://www.dictionaryapi.com/api/v3/references/sd2/json/${words}?key=${apiKEY}`)
      .then((res) => res.json())
      .then((resJson) => {
        let definition = resJson[0].shortdef[0]
        console.log(definition)
        questionEl.innerText = definition
      }); 
}

// A counter will be generated to keep track of the users correct answer score and their place in the quizData array. Both of thses will start at zero (0)

let currentSpot = 0
let scoreCounter = 0


// A function will display all of the quizData array content (radio options a, b, c, or d) sequentially as they fall within the quizData array of objects using innerText method. A variable will be used inside this function to keep track of where in the array of quiz questions the game is at. 

loadQuiz()

function loadQuiz() {

    deselectAnswers()

    const currentData = quizData[currentSpot]

    radioA.innerText = currentData.a
    radioB.innerText = currentData.b
    radioC.innerText = currentData.c
    radioD.innerText = currentData.d
}

// A function will be called to start the game. It will house inside it the functioned for clearing the checked radio buttons and to display the content to the screen. This will be persistent / always run unless told not to


// The default is for the radio button to remain chosen between submisstions. A function will therefore reset the radio checked state to unchecked after every submission

function deselectAnswers() {
    radioAnswers.forEach(ans => ans.checked = false)
}


// A function will log what radio button the user has chosen and store its value

function getSelected() {
    let answer
    radioAnswers.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}


// A an event listener will be triggered when the submit button is clicked. When it is, it will first check to see if a radio has been chosen. If it hasn't, nothing will be happen on click. If it has, it will check to see what choice it is. If the choice matches the correct answer that is located in the quizData array-object, it will add 1 point to the scoreCounter


//  Then, it wil check to see where the user is on their path. A conditional statement will check to see if they have met the designated length of questions they set out to answer for the quiz. If its been met, then an else statment will takeover and display a final congratulations / total score count to the page using innerHTML. 
    
submit.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === quizData[currentSpot].correct) {
           scoreCounter++
       }

       currentSpot++

       if(currentSpot < quizData.length) {
           loadQuiz()
       } else {
           quiz.innerHTML = `
           <h2>Congrats! 
           You got:
           ${scoreCounter}/${quizData.length} on this word quiz!</h2>

           <button onclick="location.reload()">Reload</button>
           `
       }
    }
})