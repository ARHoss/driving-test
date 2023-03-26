
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







// Event handler code goes here
function showAnswer(e){
    e.preventDefault();
    const answer = document.querySelector('#questionAnswer');
    const answerIcon = document.querySelector('#answerIcon');

    answer.classList.toggle('is-hidden')

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

function rightAnswer(){

    let score = localStorage.getItem('rightAnswer');

    // Creating right answer span
    const spanElement = document.createElement('span');
    spanElement.setAttribute('class', 'icon has-text-success fa-lg mr-3');
    const iElement = document.createElement('i');
    iElement.setAttribute('class', 'fas fa-check-circle fa-2x');
    spanElement.appendChild(iElement);

    if(score == null){
        localStorage.setItem('rightAnswer', 1)     
    }else{
        score++
        localStorage.setItem('rightAnswer', score)
    }

    return spanElement;
    
}

function wrongAnswer(){

    let score = localStorage.getItem('wrongAnswer');

    const spanElement = document.createElement('span');
    spanElement.setAttribute('class', 'icon has-text-danger fa-lg mr-3');
    const iElement = document.createElement('i');
    iElement.setAttribute('class', 'fas fa-times-circle fa-2x');
    spanElement.appendChild(iElement);

    if(score == null){
        localStorage.setItem('wrongAnswer', 1)     
    }else{
        score++
        localStorage.setItem('wrongAnswer', score)
    }

    return spanElement;
    
}