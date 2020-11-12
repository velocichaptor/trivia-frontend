
function ce(tag){
    return document.createElement(tag)
}

function qs(selector){
    return document.querySelector(selector)
}

let toggle = false;
const userURL = `http://localhost:3000/users`;
const catURL = `http://localhost:3000/categories`;
const quizURL = `http://localhost:3000/quizzes`
const userButton = qs('#username');
const userForm = qs('.user-form');
const userInfo = qs('#user-info');
const categoryListPanel = document.querySelector('#list');
let dropdown = qs('.dropdown');
let categoryData 



document.addEventListener('DOMContentLoaded', () =>{
    fetchCategories();
    handleNameFormListener();
    fetchQuiz()

 })

 window.onload = function() {
    document.querySelector('.user-form').style.display = 'none';
    // document.querySelector('.')
  };

 //event listnener to dipslay user creation form 
 userButton.addEventListener('click', () =>{
    toggle = !toggle;
    if (toggle) {
        userForm.style.display = 'block';
    }else{
       userForm.style.display = 'none';
    }

})

//event listener to submit name after creation 

function handleNameFormListener(event){
   userForm.addEventListener('submit', function(event){
       event.preventDefault()
       const formData = {
           name: event.target['name'].value
       }
       event.target.reset()

       const reqObj = {
           method: 'POST',
           headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
           },
           body: JSON.stringify(formData)
       }
       fetch(userURL, reqObj)
       .then(resp => resp.json())
       .then(newUser => {
           if(newUser.error){
               alert(newUser.error)
           }else {
            userInfo.setAttribute('data-id', `${newUser.id}`)
            userInfo.innerHTML = `<ul><li>${newUser.name}</li>
            <li>${newUser.total_score}</li>
            </ul>
            <button class="my-quizzes-button" type="button">Edit My Quizzes</button>`
            userForm.style.display = 'none'
           }
       })
      
    })
}


// fetch request to display user info 
function fetchCategories(){
    return fetch(catURL)
    .then(resp => resp.json())
    .then(categories=>{
        categoryData = categories
         displayCategories(categories)
    })
}


function displayCategories(categories){
    categories.forEach(category =>{
        const liTag = document.createElement('li')
        liTag.innerText = `${category.title}`
        liTag.setAttribute("data-id", category.id)
        liTag.setAttribute("class", 'category closed')
        categoryListPanel.appendChild(liTag)

    })
}

document.addEventListener('click', function(event){
    if(event.target.tagName === "LI"){
        const matchingCategory = categoryData.find(category => category.id === parseInt(event.target.dataset.id))
        const cat = ce('ul')
        cat.innerHTML=displayQuizTitle(matchingCategory)
        if (event.target.className.includes('open')){
           event.target.style = ''
           Array.from(event.target.childNodes).forEach(node => {
               if(node.tagName === "UL"){
                node.remove()
               }
            })
       }else if (event.target.className.includes('closed')){
            event.target.append(cat)
            event.target.style = 'color:#2a9d8f'
       }
       event.target.className.includes('closed')? event.target.className = 'category open':event.target.className = 'category closed'
      
    }
})


function displayQuizTitle(category){
    let values = ""
    let quizzes = category.quizzes;
    for (const key in quizzes){values= values.concat("<li class=\"quiz\">"+ quizzes[key]['title'] + "</li>");}
    console.log(values)
    return values
}

