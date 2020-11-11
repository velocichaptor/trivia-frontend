// hidden form
document.addEventListener("DOMContentLoaded",() => {
    createFormListener()
    fetchQs()
    fetchQuizId()
})
let questionToggle = false;

const questionFormData = document.querySelector(".add-question-form")
const quizDownOpt = document.querySelector('#select-quiz')



function fetchQuizId() {
  fetch('http://localhost:3000/quizzes')
        .then(resp => resp.json())
        .then(quizzes => {
          quizzes.forEach(quiz => { 
            quizDownOpt.setAttribute('data-id', `${quiz.id}`)
            quizDownOpt.innerHTML += `<option value="${quiz.id}">${quiz.title}</option>`
          //build quiz function?
          //buildQuiz(question)
        })
      })      
}
  

function fetchQs() {
fetch('http://localhost:3000/questions')
      .then(resp => resp.json())
      .then(json => {
        // console.log(json)
        //build quiz function?
        //buildQuiz(question)
      })
    }

const form = document.querySelector("#new-question-btn")
form.addEventListener('click', function(event){
    event.preventDefault()
    questionToggle = !questionToggle;
    if (questionToggle) {
        questionFormData.style.display = "block"
    } else {
        questionFormData.style.display = "none"
    }
})

const questionBtn = document.querySelector("#new-question-button");
const questionFormDiv = document.querySelector(".question-form-div");
function createFormListener(){
    
    questionFormData.addEventListener('submit', function(event){
        event.preventDefault()

        debugger

        const formData = {
            ask: event.target[0].value,
            answer: event.target[1].value,
            wronganswer1: event.target[2].value,
            wronganswer2: event.target[3].value,
            wronganswer3: event.target[4].value,
            quiz_id: event.target[5].value
          }
      //debugger
      event.target.reset()
      const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      }

      
      fetch('http://localhost:3000/questions', reqObj)
      .then(resp => resp.json())
      .then(question => {
        console.log(question)
        
      //   //build quiz function?
      //   //buildQuiz(question)
        })
      })
    }