/* To add
-If blank, shake screen and prompt answer
-— Add client-side data validation: make sure the user answers each question before proceeding to the next question.
— Add a “Back” button to allow the user to go back and change her answer. The user can go back up to the first question. For the questions that the user has answered already, be sure to show the radio button selected, so that the user is not forced to answer the questions again, which she has completed.
— Use jQuery to add animation (fade out the current question and fade in the next question).
— Test the quiz on IE 8 and 9, and fix any bugs. This will give you a good workout
— Store the quiz questions in an external JSON file.
— Add user authentication: allow users log in, and save their login credentials to local storage (HTML5 browser storage).
— Use cookies to remember the user, and show a “Welcome, First Name” message when the user returns to the quiz.
*/

window.onload = function() {

var allQuestions = [{
    question: "What is 4x6?",
    choices: [46, 15, 25, 24],
    correctAnswer: 3
}, {
    question: "What is 21x 21?",
    choices: [441, 2121, 388],
    correctAnswer: 0
}, {
    question: "Which number is prime?",
    choices: [1, 5, 10, 39],
    correctAnswer: 1
}, {
    question: "What is 65/5",
    choices: [3, 31, 12, 13, 21],
    correctAnswer: 3
}];

//get reference to the basic tags
var i = 0;
var numCorrect = 0;
var container= document.getElementById("container");
var list = document.getElementById("list");
var h1 = document.getElementById("h1");
var button = document.getElementById("button");

function buildQuestions(i) {
    for (var j = 0, length = allQuestions[i].choices.length; j < length; j++) {

        //create radio button
        var radio = document.createElement("input");
        radio.setAttribute('type', 'radio');
        radio.setAttribute('name', 'question' + i);
        radio.setAttribute('value', allQuestions[i].choices[j]);
        //create text of radio buttons
        var text = document.createTextNode(allQuestions[i].choices[j]);

        var li = document.createElement("li");
        list.appendChild(li);
        li.appendChild(radio);
        li.appendChild(text);

    }
    h1.innerHTML = allQuestions[i].question; //append to a textnode
}

buildQuestions(i);


document.getElementById("button").onclick = function () {
    var radios = document.getElementsByName("question" + i);
    console.log(radios);
    if (radios[allQuestions[i].correctAnswer].checked) {
        numCorrect++;
    }
    i++;
    while (list.firstChild){
		list.removeChild(list.firstChild);
	}

    if (i < allQuestions.length) {
        buildQuestions(i);
    } else {
        h1.innerHTML= "Results";
        button.parentNode.removeChild(button);
        var finalResult= document.createElement("p")
        var text= document.createTextNode("You answered " + numCorrect + " out of " + allQuestions.length+ " correctly.")
        finalResult.appendChild(text);
        container.appendChild(finalResult);
    }
};

}// window.onload bracket close