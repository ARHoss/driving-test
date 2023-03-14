document.querySelector('#showAnswer').addEventListener('click', showAnswer);
document.querySelector('.markComplete').addEventListener('click', markComplete);


function showAnswer(){
    const answer = document.querySelector('#answer');
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



