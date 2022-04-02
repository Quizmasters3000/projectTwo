// A welcome page will ask for the users name and display the title of the game. It will contain and input for the text name and a button that will trigger the start of the quiz game. This will be written in the HTML of game. It's container will be given a CSS class of 'active' as visible. Once the start button has been pushed, the name will be stored to a variable for later use. The active class will then be deactivated, rendering it and the content hidden to the screen. Simultaneously, the active class will be added to the quiz container, making the game visible to the user. 

// A global space for declaring all of the getElement / querySelectors 


// Variable that contains the users first name to hold for the last page

// Variable for stretch goal, to let users decide on how long they would like to play / number of questions


// An array of objects (quizData) will contain all the questions and radio options that users will encounter in the game. 


// A function will be made to the Merriam-Webster dictionary api for data fetching. It will take one parameter - a word that will replace the query term on the api. When called, a word from the quizData array of objects will be passed into it, which will query the api and this will obtain the needed definition of each question. These will then be rendered to the screen in the header of the page. 


// A counter will be generated to keep track of the users correct answer score and their place in the quizData array. Both of thses will start at zero (0)


// A function will display all of the quizData array content (radio options a, b, c, or d) sequentially as they fall within the quizData array of objects using innerText method. A variable will be used inside this function to keep track of where in the array of quiz questions the game is at. 


// A function will be called to start the game. It will house inside it the functioned for clearing the checked radio buttons and to display the content to the screen. This will be persistent / always run unless told not to


// The default is for the radio button to remain chosen between submisstions. A function will therefore reset the radio checked state to unchecked after every submission


// A function will log what radio button the user has chosen and store its value


// A an event listener will be triggered when the submit button is clicked. When it is, it will first check to see if a radio has been chosen. If it hasn't, nothing will be happen on click. If it has, it will check to see what choice it is. If the choice matches the correct answer that is located in the quizData array-object, it will add 1 point to the scoreCounter


//  Then, it wil check to see where the user is on their path. A conditional statement will check to see if they have met the designated length of questions they set out to answer for the quiz. If its been met, then an else statment will takeover and display a final congratulations / total score count to the page using innerHTML. 
    