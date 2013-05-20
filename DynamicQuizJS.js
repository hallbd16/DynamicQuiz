/* To add
-done Add client-side data validation: make sure the user answers each question before proceeding to the next question.
—done Add a “Back” button to allow the user to go back and change her answer. The user can go back up to the first question. For the questions that the user has answered already, be sure to show the radio button selected, so that the user is not forced to answer the questions again, which she has completed.
— Use jQuery to add animation (fade out the current question and fade in the next question).
— Test the quiz on IE 8 and 9, and fix any bugs. This will give you a good workout
— Store the quiz questions in an external JSON file.
— Add user authentication: allow users log in, and save their login credentials to local storage (HTML5 browser storage).
— Use cookies to remember the user, and show a “Welcome, First Name” message when the user returns to the quiz.
-Make container a draggable item
-If blank, shake screen and prompt answer
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

//get reference to the basic tags and initialize global variables
var i = 0;
var numberCorrect = 0;
var container= document.getElementById("container");
var list = document.getElementById("list");
var h1 = document.getElementById("h1");
var button = document.getElementById("button");
var backButton = document.getElementById("backButton");

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
	//if(allQuestions[i].answerSelected) {radio[allQuestions[i].answerSelected].checked = true;} // Not working... to check if answer has already been recorded 
    h1.innerHTML = allQuestions[i].question; //append to a textnode
}
buildQuestions(i);//populate first question i=0

//test if answer has been selected
document.getElementById("button").onclick = function testForSelection () {
    var radios = document.getElementsByName("question" + i); // get HTML radio element for object reference, creates an array

	//determine if radio is selected	
	function checkedRadioBtn(group) {     
        for ( var j = 0; j < group.length; j++) {
            if (group.item(j).checked) {
                return group[j].name;
            } 
        }
        return undefined;
    }
	// if statement:  send to next question if selected or alert and rebuild question if no answer selected. 
    checkedRadioBtn(radios) ? buildNextQuestion(): window.alert("No answer selected.  Please select one.");  while (list.firstChild){
		list.removeChild(list.firstChild);}; buildQuestions(i);
    }

//build next question or final results if radio is selected
function buildNextQuestion() {
	var radios = document.getElementsByName("question" + i); // get HTML radio element for object reference, creates an array
	
	//create new allQuestion.answerSelected property to record answer choice
	for (var j=0; j<radios.length; j++) {
		if (radios[j].checked) { allQuestions[i].answerSelected = j
		}
	}
    
    //remove all childs of the list to clear the question then build next question or give results.
    while (list.firstChild){
		list.removeChild(list.firstChild);
	}

    i++; //increase index of question

    if (i < allQuestions.length) {
        buildQuestions(i);
    } else {
    	//maybe write global function to create element and attach a specific text node... save me time
        h1.innerHTML= "Results"; // should rewrite this to utilize 
        button.parentNode.removeChild(button);
        backButton.parentNode.removeChild(backButton);
        		
		//make array to store wrong answers and variable storing number of correct answers		        
        var wrongAnswers = [];
        for (var k= 0; k<allQuestions.length; k++) {	
        	if(allQuestions[k].answerSelected == allQuestions[k].correctAnswer) {
        	numberCorrect++;
        	}else {
        	wrongAnswers.push(k); 	
        	}
        }
        
        wrongAnswers = wrongAnswers.map(function(x) {return x+1;}) // adjust so text begins with index of 1
    
    //text for total score--  Need to refactor this.  Maybe use a function
	    var finalResult= document.createElement("p")
        var text= document.createTextNode("You answered " + numberCorrect + " out of " + allQuestions.length+ " correctly.")
        finalResult.appendChild(text);
        container.appendChild(finalResult);
        console.log( "wrong answers:" + wrongAnswers.join());
	//text for problems missed, right now this isn't working
		var missedProblems= document.createElement("p");
        var textMissed= document.createTextNode("You missed the following question(s):  " + wrongAnswers.join());
        missedProblems.appendChild(textMissed);
        container.appendChild(missedProblems);
    }
};

document.getElementById("backButton").onclick = function() { 
	if (i>0 ) { 
		i--;
		while (list.firstChild) {list.removeChild(list.firstChild);} //remove current question
		buildQuestions(i);	//build previous question
		var radios = document.getElementsByName("question" + i); //get reference to the radio HTML element
		radios[allQuestions[i].answerSelected].checked = true; //set answer as default radio choice previously selected
	}
}
}// window.onload bracket close