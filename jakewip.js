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
        ///points: 1 //do I need this or is this default?
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