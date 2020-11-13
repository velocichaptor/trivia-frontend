
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


// in page load, we want to load the following functions.
document.addEventListener('DOMContentLoaded', () =>{
    fetchCategories();
    handleNameFormListener();
    fetchQuiz()


 })

 window.onload = function() {
    document.querySelector('.user-form').style.display = 'none';
 
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
       .then(user => {
           if(user.error){
               alert(user.error)
           }else {
           displayUser(user)
           }
       })
      
    })
}
//function to display user information. This is provided to the fetch request.
function displayUser(user){
    userInfo.setAttribute('data-id', `${user.id}`)
    userInfo.innerHTML = `<ul><li>${user.name}</li>
    <li class="score">${user.total_score}</li>
    </ul>
    <button class="my-quizzes-button" type="button">Edit My Quizzes</button>`
    userForm.style.display = 'none'
}

// fetch request to display categories
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
    if(event.target.className.includes("category")){
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
            event.target.style = 'font-size:20px; color: #F6AE2D;'
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

