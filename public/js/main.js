// Check if element with id "showAnswer" exists
if (document.querySelector("#showAnswer")) {
    // Attach event listener to element with id "showAnswer"
    document.querySelector('#showAnswer').addEventListener('click', showAnswer);
}

// Check if element with class "markComplete" exists
if (document.querySelector(".markComplete")) {
    // Attach event listener to element with class "markComplete"
    document.querySelector('.markComplete').addEventListener('click', markComplete);
}

// Event handler function for showing/hiding answer
function showAnswer(e){
    e.preventDefault();
    const answer = document.querySelector('#questionAnswer');
    const answerIcon = document.querySelector('#answerIcon');

    // Toggle the visibility of the answer
    answer.classList.toggle('is-hidden')

    // Toggle the text and icon of the show/hide answer button
    if(answerIcon.classList.contains('fa-eye')){
        answerIcon.innerText = 'Show Answer';
        answerIcon.classList.remove('fa-eye');
        answerIcon.classList.add('fa-eye-slash');
    }else{
        answerIcon.innerText = 'Hide';
        answerIcon.classList.remove('fa-eye-slash');
        answerIcon.classList.add('fa-eye'); 
    }    
}

// Event handler function for marking a question as complete
function markComplete(){
    const markComplete =  document.querySelector('.markComplete');
    markComplete.classList.toggle('is-success')
}

// JavaScript code for handling answer event
const answers = document.querySelectorAll('.answer');

// Bind the event listener to each answer link
answers.forEach(answer => {
  answer.addEventListener('click', findAnswer)
})

// Event handler function for finding the correct answer
function findAnswer(e) {
    e.preventDefault();

    // Get the correct answer value from the hidden answer link
    const answerLink = document.querySelector('#realAnswer');
    const answerValue = answerLink.getAttribute('data-answer');

    // Get the user's selected answer value from the clicked answer link
    const answerSample = this.getAttribute('data-answer');
    const answerDiv = this.parentElement;

    // Check if the user's selected answer is correct
    if (answerValue === answerSample) {
        this.classList.add('correct');
        answerDiv.insertBefore(rightAnswer(), answerDiv.firstChild);
        
    } else {
        this.classList.add('wrong');
        answerDiv.insertBefore(wrongAnswer(), answerDiv.firstChild);
        
        // Highlight the correct answer
        answers.forEach(answer => {
            if (answer.getAttribute('data-answer') === answerValue) {
                answer.classList.add('correct');
                const answerDiv = answer.parentElement;
                answerDiv.insertBefore(rightAnswer(), answerDiv.firstChild);
            }
        });
    }

    // Unbind the event listener from all answer links after the user has made a selection
    answers.forEach(answer => {
        answer.removeEventListener('click', findAnswer);
    });
}

// Function for creating a span element for correct answers
function rightAnswer(){

    // Get the current number of correct answers from local storage
    let score = localStorage.getItem('rightAnswer');

    // Create a new span element with the appropriate CSS classes
    const spanElement = document.createElement('span');
    spanElement.setAttribute('class', 'icon has-text-success fa-lg mr-3');

    // Create a new i element with the appropriate CSS classes
    const iElement = document.createElement('i');
    iElement.setAttribute('class', 'fas fa-check-circle fa-2x');

    // Add the i element to the span element
    spanElement.appendChild(iElement);

    // Increment the correct answer score in local storage
    if(score == null){
        localStorage.setItem('rightAnswer', 1)     
    }else{
        score++
        localStorage.setItem('rightAnswer', score)
    }

    // Return the newly created span element
    return spanElement;   
}


// Function for creating a span element for wrong answers
function wrongAnswer(){

    // Retrieve the current score from localStorage
    let score = localStorage.getItem('wrongAnswer');

    // Create the icon element for the wrong answer
    const spanElement = document.createElement('span');
    spanElement.setAttribute('class', 'icon has-text-danger fa-lg mr-3');
    const iElement = document.createElement('i');
    iElement.setAttribute('class', 'fas fa-times-circle fa-2x');
    spanElement.appendChild(iElement);

    // Update the score in localStorage
    if(score == null){
        localStorage.setItem('wrongAnswer', 1)     
    }else{
        score++
        localStorage.setItem('wrongAnswer', score)
    }

    // Return the wrong answer icon
    return spanElement;
    
}
