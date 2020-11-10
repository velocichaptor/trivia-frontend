// make create form visible
let addQuiz = false;

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
            dropDownOpt.innerHTML += 
            `<option value="${category.title}">${category.title}/option>`
        })
    })
}
addCategories()