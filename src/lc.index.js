// make create form visible
let addQuiz = false;
const createForm = document.querySelector('.add-quiz-form')

const createBtn = document.querySelector("#new-quiz-btn");
const createFormDiv = document.querySelector(".create-form-div");
createBtn.addEventListener("click", () => {
    // hide & seek with the form
    addQuiz = !addQuiz;
    if (addQuiz) {
        createFormDiv.style.display = "block";
    } else {
        createFormDiv.style.display = "none";
    }
})
// grab all categories and add to create form dropdown
const dropDownOpt = document.querySelector('#select-category')
const addCategories = () => {
    fetch("http://localhost:3000/categories")
    .then(res => res.json())
    .then(categories => {
        categories.forEach(category => {
            dropDownOpt.setAttribute('data-id', `${category.id}`)
            dropDownOpt.innerHTML += 
            `<option value="${category.title}">${category.title}</option>`
        })
    })
}
addCategories()

// save new quiz

createForm.addEventListener('submit', event => {
    event.preventDefault()
    console.log(event.target)
    handleNewQuiz(event.target)
}
)

const handleNewQuiz = (target) => {

let data = {
    title: createForm[0].value,
    url: createForm[1].value,
    category: createForm[2].dataset.id,
    user_id: userInfo.dataset.id
} 
createForm.reset()

    fetch('http://localhost:3000/quizzes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(res => res.json())
}

// read all my quizzes
const myQuizBtn = document.querySelector('.my-quizzes-button')
document.addEventListener('click', event => {
    if(event.target.className === 'my-quizzes-button')
    displayMyQuizzes(event.target)
})

const displayMyQuizzes = (target) => {
    fetch('http://localhost:3000/quizzes')
    .then(res => res.json())
    .then(quizzes => {
        let myQuizArray = quizzes.filter(quiz => quiz.user_id == target.parentElement.dataset.id)
        const myQuizTable = document.createElement('table')
        const userInfo = document.querySelector('#user-info')
        myQuizArray.forEach(quiz => {
          myQuizTable.innerHTML += 
           `<tr><td>${quiz.title}</td></tr>
            <tr><td><img src=${quiz.url}></td></tr>
            <tr><td><button data-id="${quiz.id}" class="delete-button">Delete?</button></td></tr>
            <tr><td><button data-id="${quiz.id}" class="edit-button">Edit?</button></td></tr>
            </tr>`  
        })
        userInfo.append(myQuizTable)
    })
    // display list of quizzes created
}