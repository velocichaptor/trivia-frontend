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
        })
      })


//Edit Questions

// const updateQuestionBtn = document.querySelector('.my-quizzes-button')
// document.addEventListener('click', event => {
//     if(event.target.className === 'my-quizzes-button')
//     questionTableRender(event.target)
// })

// const questionTableRender = (target) => {
//     fetch('http://localhost:3000/quizzes')
//     .then(res => res.json())
//     .then(quizzes => {
//         let questionTable = quizzes.filter(quiz => quiz.questions == target.parentElement.dataset.id)
//         const myQuestionTable = document.createElement('table')
//         //const userInfo = document.querySelector('#user-info')
//         questionTable.forEach(question => {
//           myQuestionTable.innerHTML += 
//            `<tr><td>${question.ask}</td></tr>
//             <tr><td><button data-id="${question.id}" class="delete-button">Delete?</button></td></tr>
//             <tr><td><button data-id="${question.id}" class="edit-button">Edit?</button></td></tr>
//             </tr>`  
//         })
//         //userInfo.append(myQuestionTable)
//     })

//         updateQuestionBtn.addEventListener("click", (e) => {

//             editForm[0].value = question.ask
//             editForm[1].value = question.answer
//             editForm[2].value = question.wronganswer1
//             editForm[3].value = question.wronganswer2
//             editForm[4].value = question.wronganswer3

//             // const hiddenInput = ce("input")
//             // hiddenInput.setAttribute("type", "hidden")
//             // hiddenInput.value = question.quiz_id
//             // hiddenInput.name = "id"

//             // editForm.append(hiddenInput)

//         })

//       editForm.addEventListener("submit", (event) => {
//         event.preventDefault()

//         // debugger

//         // 
//         fetch('http://localhost:3000/quizzes') {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//               ask: event.target[0].value,
//               answer: event.target[1].value,
//               wronganswer1: event.target[2].value,
//               wronganswer2: event.target[3].value,
//               wronganswer3: event.target[4].value
//             })
//             const reqObj = {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 // "Accept": "application/json"
//               },
//               body: JSON.stringify(formData)
//             }
//         })
//         .then(res => res.json())
//         .then(updatedQuestion => {

//             const updateTr = Array.from(tbody.children).find(tr => tr.dataset.dogid == updatedQuestion.id)

//             // const dogRow = tbody.children[updatedQuestion.id-1]
//             // debugger

//             updateTr.children[0].innerHTML = updatedQuestion.ask
//             updateTr.children[1].innerHTML = updatedQuestion.answer
//             updateTr.children[2].innerHTML = updatedQuestion.wronganswer1
//             updateTr.children[3].innerHTML = updatedQuestion.wronganswer2
//             updateTr.children[4].innerHTML = updatedQuestion.wronganswer3
        
//         })
//       }
//   }