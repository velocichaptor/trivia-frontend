const quizDiv = qs('#show-panel');
const quizTag = qs(".quiz");
const questionDiv = qs('#question-panel');
const ol = qs('.quest')
;


//this code fetches the quizes
function fetchQuiz(){
    fetch (quizURL)
    .then(resp => resp.json())
    .then(quizItem=> renderQuizzes(quizItem))
}

// for each quiz, we're rendering the questions and answers 
function renderQuizzes(quiz){
    quiz.forEach(quizItem => {
       document.addEventListener('click', function(event){
            if (event.target.innerText.toLowerCase() === quizItem.title.toLowerCase()){
                quizDiv.innerHTML = renderQuiz(quizItem)
                // debugger
                const questionsIndex = quizItem.questions.map(question => question)
                let values = []
                for(let key in questionsIndex) { 
                    
                    const answers = [`<li class="true">${(questionsIndex[key]['answer'])}</li>`,
                    `<li class="false">${(questionsIndex[key]['wronganswer1'])}</li>`,
                    `<li class="false">${(questionsIndex[key]['wronganswer2'])}</li>`,
                    `<li class="false">${(questionsIndex[key]['wronganswer3'])}</li>`
                    ].sort(() => Math.random() - 0.5).join('')
                    let olElements = (`<h3>${(questionsIndex[key]['ask'])}</h3>
                    <ol class="quest" data-id="${questionsIndex[key]['id']}">
                     ${answers}
                    </ol>`)

                values.push(olElements);
     
                }

                questionDiv.innerHTML = values
            }
        })
    });
}




//for each quiz, we're redering the image and the title with this code 
function renderQuiz(quizItem){
  return ` <img src=${quizItem.url} />
        <h2>${quizItem.title}</h2>`
}

document.addEventListener('click', function(event){
    if (event.target.className === "true"){
        alert("great choice")
        event.target.style = "color:#90be6d"
        handleQuizScore(event)
     document.querySelector('.score').value+=1
    }else if (event.target.className === 'false'){
         alert("do better next time") 
         event.target.style = "color:#f94144"
    }

})

function handleQuizScore(event){
    const userId = userInfo.dataset.id;
    let score = parseInt(userInfo.firstElementChild.children[1].innerText);
    let scoreCount = score + 1;
    let userData = {
        user: {
            total_score: scoreCount
        }
    }
    const reqObj ={
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
    }

    fetch(`http://localhost:3000/users/${userId}`, reqObj)
    .then(resp => resp.json())
    .then(user => {
   
        console.log(user)
        // user.total_score += 1
        displayUser(user);
    })

}

