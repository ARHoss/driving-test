
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
function showAnswer(){
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



