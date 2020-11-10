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

    fetch('http://localhost:3000/quizzes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(console.log)
    // .then(add to list of quizzes to choose from)
}