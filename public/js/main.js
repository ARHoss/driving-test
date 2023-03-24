
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
    const answer = document.getElementsByClassName('questionAnswer');
    const answerIcon = document.querySelector('#answerIcon');

    Array.from(answer).forEach(el => el.classList.toggle('is-hidden'))

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
    const answerLink = document.querySelector('.answerHidden');
    const answerValue = answerLink.getAttribute('data-answer');

    // Get the user's selected answer value from the clicked answer link
    const answerSample = this.getAttribute('data-answer');

    // Check if the user's selected answer is correct
    if (answerValue === answerSample) {
        this.classList.add('correct');
        rightAnswer()
    } else {
        this.classList.add('wrong');
        wrongAnswer()

        // Highlight the correct answer
        answers.forEach(answer => {
            if (answer.getAttribute('data-answer') === answerValue) {
                answer.classList.add('correct');
            }
        });

        // Unbind the event listener from all answer links after the user has made a selection
        answers.forEach(answer => {
            answer.removeEventListener('click', findAnswer);
        });
    }
}

function rightAnswer(){

    let score = localStorage.getItem('rightAnswer');

    if(score == null){
        localStorage.setItem('rightAnswer', 1)     
    }else{
        score++
        localStorage.setItem('rightAnswer', score)
    }
    
}

function wrongAnswer(){

    let score = localStorage.getItem('wrongAnswer');

    if(score == null){
        localStorage.setItem('wrongAnswer', 1)     
    }else{
        score++
        localStorage.setItem('wrongAnswer', score)
    }
    
}