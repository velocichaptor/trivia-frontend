// hidden form
let writeQuestion = false;

const questionBtn = document.querySelector("#new-question-button");
const questionFormDiv = document.querySelector(".question-form-div");
function createFormListener(){
    const form = document.querySelector('form')
    form.addEventListener('submit', function(event){
      event.preventDefault()
      const formData = {
        ask: event.target['ask'].value,
        answer: event.target['answer'].value,
        wronganswer1: event.target['wronganswer1'].value,
        wronganswer2: event.target['wronganswer2'].value,
        wronganswer3: event.target['wronganswer3'].value,
      }
  
      event.target.reset()
  
      const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
  
      fetch('http://localhost:3000/questions', reqObj)
      .then(resp => resp.json())
      .then(question => {
        //build quiz function?
        //buildQuiz(question)
      })
    })
  }