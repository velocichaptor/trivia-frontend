
function ce(tag){
    return document.createElement(tag)
}

function qs(selector){
    return document.querySelector(selector)
}

let addName = false;
const userURL = `http://localhost:3000/users`;
const catURL = `http://localhost:3000/categories`;
const userButton = qs('#username');
const userForm = qs('.user-form');
const userInfo = qs('#user-info');
const ulTag = qs('.menu')
let dropdown = qs('.dropdown')


document.addEventListener('DOMContentLoaded', () =>{
    fetchCategories()
    handleNameFormListener()

 })

 window.onload = function() {
    document.querySelector('.user-form').style.display = 'none';
  };

 //event listnener to dipslay user creation form 
 userButton.addEventListener('click', () =>{
    addName = !addName;
    if (addName) {
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
    .then(categories=> displayCategories(categories))
  
}


function displayCategories(categories){
    categories.forEach(category =>{
       ulTag.innerHTML += `<li>${category.title}</li>`;
      
    })
}

dropdown.addEventListener('click', (e) => {
  if (dropdown.classList.contains('closed')) {
    dropdown.classList.remove('closed')
  } else {
  dropdown.classList.add('closed')    
  }
})