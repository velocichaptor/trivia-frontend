const quizDiv = qs('#show-panel');
const quizTag = qs(".quiz");
const questionDiv = qs('#question-panel');
const progressText = qs('#progressText');
const scoreText = qs('#score');
const progressBarFull = qs('#progressBarFull');
const ol = qs('.quest');
let currentQuestion = {};
let score = 0;
let questionsCounter = 0
let availableQuestions = []
let goodAudio = new Audio("assets/good.ogg")
var badAudio = new Audio("assets/wrong.ogg")
let values = []


//this code fetches the quizes
function fetchQuiz(){
    fetch (quizURL)
    .then(resp => resp.json())
    .then(quizItem=> renderQuizzes(quizItem))
}

// for each quiz, we're rendering the questions and answers. set interval to render quizes one at a time. 
function renderQuizzes(quiz){
    quiz.forEach(quizItem => {
       document.addEventListener('click', function(event){
            if (event.target.innerText.toLowerCase() === quizItem.title.toLowerCase()){
                quizDiv.innerHTML = renderQuiz(quizItem)
                // debugger
                const questionsIndex = quizItem.questions.map(question => question)
                // let values = []
                for(let key in questionsIndex) { 
                    
                    const answers = [`<li id="choice-container" class="true">${(questionsIndex[key]['answer'])}</li>`,
                    `<li id="choice-container" class="false">${(questionsIndex[key]['wronganswer1'])}</li>`,
                    `<li id="choice-container" class="false">${(questionsIndex[key]['wronganswer2'])}</li>`,
                    `<li id="choice-container" class="false">${(questionsIndex[key]['wronganswer3'])}</li>`
                    ].sort(() => Math.random() - 0.5).join('')
                    let olElements = (`<h2>${(questionsIndex[key]['ask'])}</h2>
                    <ol class="quest" data-id="${questionsIndex[key]['id']}">
                     ${answers}
                    </ol>`)

                    values.push(olElements);
                    let counter = 0
                    function next_word()
                    {
                        quizDiv.innerHTML = values[counter % values.length];
                        counter += 1;
                    }
                    
                    setInterval(next_word, 10000);


                    // questionDiv.innerHTML = values
            
                    
                }

            }
        })
    });
}




//for each quiz, we're redering the image and the title with this code 
function renderQuiz(quizItem){
  return ` <img src=${quizItem.url} />
        <h2>${quizItem.title}</h2>`
}
// when clicked, the game counter increases and the progress bar moves forward and game plays sounds
document.addEventListener('click', function(event){
    if (event.target.className === "true"){
        scoreText.innerText = parseInt(scoreText.innerText)+1
        goodAudio.play()
        event.target.style = "background:#90be6d"
        questionsCounter += 1
        let max = values.length
        progressText.innerText =`Question ${questionsCounter} of ${max}`
        progressBarFull.style.width = `${(questionsCounter/max) * 100}%`
     
        handleQuizScore(event)
     document.querySelector('.score').value+=1
    }else if (event.target.className === 'false'){
        badAudio.play()
         event.target.style = "background:red"
         questionsCounter += 1
         let max = values.length
         progressText.innerText =`Question ${questionsCounter} of ${max}`
         progressBarFull.style.width = `${(questionsCounter/max) * 100}%`
    }

})
// this function takes care of persisting user score 
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
     
        displayUser(user);
    })

}

