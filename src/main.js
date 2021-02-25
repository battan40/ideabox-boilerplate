var saveButton = document.querySelector('#save');
var titleInput = document.querySelector('#titleInput');
var bodyInput = document.querySelector('#bodyInput');
var ideaParent = document.querySelector('#ideaParent');
var ideasGrid = document.querySelector('#ideasGrid');


var savedIdeas = [];


saveButton.addEventListener('click', createIdeaCard);
window.addEventListener('load', checkInputFields);
titleInput.addEventListener('keyup', checkInputFields);
bodyInput.addEventListener('keyup', checkInputFields);
ideaParent.addEventListener('click', function() {
  deleteIdea(event);
});

function createIdeaCard() {
    event.preventDefault();
    var newIdea = createNewIdea();
    addNewIdea(newIdea);
    renderIdeaCard();
    clearInputFields();
    checkInputFields();
}

function createNewIdea() {
  var newIdea = new Idea(titleInput.value, bodyInput.value, savedIdeas);
  console.log(savedIdeas);
  return newIdea;
}

function addNewIdea(newIdea) {
    savedIdeas.push(newIdea);
  }

function renderIdeaCard() {
  ideaParent.innerHTML = "";
  for (var i = 0; i < savedIdeas.length; i++) {
    ideaParent.innerHTML +=
    `<article class="ideas-display" id="ideasGrid">
      <section class="idea-header">
        <img class="idea-favorite" id="favoriteButton" src="./assets/star.svg" alt="A star for favoriting">
        <img class="delete-idea" id="deleteButton" src="./assets/delete.svg" alt="An X for deleting ideas">
      </section>
      <section class="idea-card-inner">
        <h3 class="idea-title">${savedIdeas[i].title}</h3>
        <p class="idea-body">${savedIdeas[i].body}</p>
      </section>
      <section class="idea-box-footer">
        <img class="idea-comment-img" id="commentButton" src="./assets/comment.svg" alt="A comment button">
        <p class="idea-comment">Comment</p>
      </section>
    </article>`
  }
}

function clearInputFields() {
  titleInput.value  = "";
  bodyInput.value = "";
}

function checkInputFields() {
  if(/\S/.test(titleInput.value) && /\S/.test(bodyInput.value)){
    saveButton.disabled = false;
    removeButtonState();
  }else{
    saveButton.disabled = true;
    addButtonState();
  }
}

function addButtonState() {
  saveButton.classList.add("disabled-button");
  saveButton.innerHTML = "Enter valid idea";
}

function removeButtonState() {
  saveButton.classList.remove("disabled-button");
  saveButton.innerHTML = "Save";
}

function deleteIdea(event){
  event.preventDefault();
  if(event.target.classList.contains("delete-idea")){
    event.target.closest("article").remove();
  }
}
