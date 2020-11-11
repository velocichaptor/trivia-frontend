const quizDiv = qs('#show-panel')
const quizTag = qs(".quiz")

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
            }
        })
    });
}


function renderQuiz(quizItem){
    const questionsIndex = quizItem.questions.map(question => question)
    let questions = questionsIndex.map(questions => questions.ask)
   debugger
  return ` <div><img src=${quizItem.url} />
  <h2>${quizItem.title}</h2>`
//   ${quiz.questions.map(question => {
//     `<h3>${question.ask}</h2>
//     <h4>${question.answer}</h4>
//     <h4>${question.wonganswer1}</h4>
//     <h4>${question.wronganswer2}</h4>
//     <h4>${question.wronganswer3}</h4> `
//   }) }
//    </div>`
}

