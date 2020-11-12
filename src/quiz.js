const quizDiv = qs('#show-panel');
const quizTag = qs(".quiz");
const questionDiv = qs('#question-panel');
let ol = qs('ol');


function fetchQuiz(){
    fetch (quizURL)
    .then(resp => resp.json())
    .then(quizItem=> renderQuizzes(quizItem))
}

function renderQuizzes(quiz){
    quiz.forEach(quizItem => {
       document.addEventListener('click', function(event){
            if (event.target.innerText.toLowerCase() === quizItem.title.toLowerCase()){
                quizDiv.innerHTML = renderQuiz(quizItem)
                // debugger
                const questionsIndex = quizItem.questions.map(question => question)
                let values = [];
                for(let key in questionsIndex) {
                values.push(`<h3>${(questionsIndex[key]['ask'])}</h3>
               <ol data-id="${questionsIndex[key]['id']}">
               <li class="true">${(questionsIndex[key]['answer'])}</li>
               <li class="false">${(questionsIndex[key]['wronganswer1'])}</li>
               <li class="false">${(questionsIndex[key]['wronganswer2'])}</li>
               <li class="false">${(questionsIndex[key]['wronganswer3'])}</li>
               </ol>`);
     
                }

                questionDiv.innerHTML = values
            }
        })
    });
}

function renderQuiz(quizItem){
  return ` <img src=${quizItem.url} />
        <h2>${quizItem.title}</h2>`
}


