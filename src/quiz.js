const quizDiv = qs('#show-panel')
const quizTag = qs(".quiz")
const questionDiv = qs('#question-panel')
let ol = qs('ol')
function fetchQuiz(){
    fetch (quizURL)
    .then(resp => resp.json())
    .then(quizItem=> renderQuizzes(quizItem))
}

function renderQuizzes(quiz){

    quiz.forEach(quizItem => {
        document.addEventListener('click', function(event){
            event.preventDefault()
            if (event.target.innerText.toLowerCase() === quizItem.title.toLowerCase()){
                quizDiv.innerHTML = renderQuiz(quizItem)
                const questionsIndex = quizItem.questions.map(question => question)
                for(let key in questionsIndex) {
               questionDiv.innerHTML = `<h3>${(questionsIndex[key]['ask'])}</h3>
               <ol><li>${(questionsIndex[key]['answer'])}</li>
               <li>${(questionsIndex[key]['wronganswer1'])}</li>
               <li>${(questionsIndex[key]['wronganswer2'])}</li>
               <li>${(questionsIndex[key]['wronganswer3'])}</li>
               </ol>`;
     
                }
            }
        })
    });
}


for (let i = ol.children.length; i>=0; i++){
    ol.appendChild(ol.children[Math.random()*i| 0]);
}

function renderQuiz(quizItem){
  return ` <img src=${quizItem.url} />
        <h2>${quizItem.title}</h2>`
}

