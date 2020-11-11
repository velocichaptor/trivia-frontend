const quizDiv = qs('#show-panel')
const quizTag = qs(".quiz")

function fetchQuiz(){
    fetch (quizURL)
    .then(resp => resp.json())
    .then(quizzes=> renderQuizzes(quizzes))
}

function renderQuizzes(quizzes){
    quizzes.forEach(quiz => {
        quizTag.addEventListener('click', function(event){
            event.preventDefault()
            if (event.target.className.toLowerCase === "quiz"){
                quizDiv.innerHTML = renderQuiz(quiz)
            }
        })
    });
}


function renderQuiz(quiz){
  return `<img src=${quiz.url} />
  <h2>${quiz.title}</h2>
  <div>
  ${quiz.questions.map(question => {
    `<h3>${question.ask}</h2>
    <h4>${question.answer}</h4>
    <h4>${question.wonganswer1}</h4>
    <h4>${question.wronganswer2}</h4>
    <h4>${question.wronganswer3}</h4> `
  }) }
   </div>`
}

