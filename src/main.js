var saveButton = document.querySelector('#save');
var titleInput = document.querySelector('#titleInput');
var bodyInput = document.querySelector('#bodyInput');
var ideaParent = document.querySelector('#ideaParent');
var ideasGrid = document.querySelector('#ideasGrid');
var showFavoriteButton = document.querySelector('#showStarred');
var searchInput = document.querySelector('#searchInput');
var commentForm = document.querySelector('#commentForm');
var leftBox = document.querySelector('#leftBox');
var rightSide = document.querySelector('#rightSide');
var submitComment = document.querySelector('#submitComment');
var takeMeBackButton = document.querySelector('#takeMeBack');
var commentInput = document.querySelector('#commentInput');

var savedIdeas = [];
var showFavoriteIdeas = false;
var cardIDGlobal

saveButton.addEventListener('click', createIdeaCard);
window.addEventListener('load', retrieveAllStorage);
titleInput.addEventListener('keyup', checkInputFields);
bodyInput.addEventListener('keyup', checkInputFields);
ideaParent.addEventListener('click', function() {
  checkTarget(event);
});
showFavoriteButton.addEventListener('click', findFavorites);
searchInput.addEventListener('keyup', filterIdeas);
takeMeBackButton.addEventListener('click', showMain);
submitComment.addEventListener('click', postComment);


function createIdeaCard() {
    event.preventDefault();
    var newIdea = createNewIdea();
    addNewIdea(newIdea);
    renderIdeaCard(savedIdeas);
    clearInputFields();
    checkInputFields();
}

function createNewIdea() {
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  return newIdea;
}

function addNewIdea(newIdea) {
    savedIdeas.push(newIdea);
    newIdea.saveToStorage();
  }

function renderIdeaCard(array) {
  ideaParent.innerHTML = "";
  for (var i = 0; i < array.length; i++) {
    var starImg = "./assets/star.svg";
    if (array[i].star) {
      starImg = "./assets/star-active.svg";
    }
    ideaParent.innerHTML +=
    `<article class="ideas-display" id="${array[i].id}">
      <section class="idea-header">
        <img class="idea-favorite" id="favoriteButton" src="${starImg}" alt="A star for favoriting">
        <img class="delete-idea" id="deleteButton" src="./assets/delete.svg" alt="An X for deleting ideas">
      </section>
      <section class="idea-card-inner">
        <h3 class="idea-title">${array[i].title}</h3>
        <p class="idea-body">${array[i].body}</p>
      </section>
      <section class="idea-box-footer">
        <img class="idea-comment-img" id="commentButton" src="./assets/comment.svg" alt="A comment button">
        <p class="idea-comment">${array[i].comment}</p>
      </section>
    </article>`
  }
}

function findFavorites() {
  event.preventDefault();
  showFavoriteIdeas = !showFavoriteIdeas;
  filterIdeas();
  changeStarButtonText();
}

function filterFavorites() {
  var starredIdeas = [];
  for (var i = 0; i < savedIdeas.length; i++) {
    if(savedIdeas[i].star){
      starredIdeas.push(savedIdeas[i]);
    }
  }
  return starredIdeas;
}

function changeStarButtonText() {
  if (showFavoriteIdeas) {
    showFavoriteButton.innerText = "Show All Ideas";
  } else {
    showFavoriteButton.innerText = "Show Starred Ideas";
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
  } else {
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

function checkTarget(event) {
  event.preventDefault()
  if (event.target.classList.contains("delete-idea")) {
    deleteIdea(event);
  } else if (event.target.classList.contains("idea-favorite")) {
    favoriteIdea(event);
  } else if (event.target.classList.contains("idea-comment-img")) {
    createComment(event);
  }
}

function deleteIdea(event) {
  updateIdeaArray(event.target.parentElement.parentElement.id);
  event.target.closest("article").remove();
}

function favoriteIdea(event) {
  var ideaArrayIndex = findIdeaIndex(event.target.parentElement.parentElement.id);
  savedIdeas[ideaArrayIndex].updateIdea();
  if (savedIdeas[ideaArrayIndex].star) {
    event.target.src = "./assets/star-active.svg";
  } else {
    event.target.src = "./assets/star.svg";
  }
}

function findIdeaIndex(id) {
  for (var i = 0; i < savedIdeas.length; i++) {
    if(parseInt(savedIdeas[i].id) === parseInt(id)) {
      return i;
    }
  }
}

function updateIdeaArray(id) {
  for (var i = 0; i < savedIdeas.length; i++) {
    if(parseInt(savedIdeas[i].id) === parseInt(id)) {
      savedIdeas[i].deleteFromStorage();
      savedIdeas.splice(i, 1);
      return;
    }
  }
}


function retrieveAllStorage() {
  checkInputFields()
  cardIDs = Object.keys(localStorage);
  for (i = 0; i < cardIDs.length; i++) {
    var parsed = JSON.parse(localStorage.getItem(cardIDs[i]));
    var newIdea = new Idea(parsed.title, parsed.body, parsed.id, parsed.star);
    savedIdeas.unshift(newIdea);
  }
  renderIdeaCard(savedIdeas);
}

function filterIdeas() {
  event.preventDefault();
  if (showFavoriteIdeas) {
    showsFilteredIdeas(filterFavorites());
  } else {
    showsFilteredIdeas(savedIdeas);
  }
}

function showsFilteredIdeas(array) {
  if (searchInput.value !== ""){
    var filteredIdeas = [];
    for(var i = 0; i < array.length; i++)
    {
      if(array[i].title.includes(searchInput.value)) {
        filteredIdeas.push(array[i]);
      } else if (array[i].body.includes(searchInput.value)) {
        filteredIdeas.push(array[i]);
      }
    }
    renderIdeaCard(filteredIdeas);
  } else {
    renderIdeaCard(array);
  }
}
function createComment(event) {
  cardIDGlobal = event.target.parentElement.parentElement.id;
  showCommentForm();
}

function showCommentForm() {
  commentForm.classList.remove('hidden');
  leftBox.classList.add('hidden');
  rightSide.classList.add('hidden');
}

function showMain() {
  commentForm.classList.add('hidden');
  leftBox.classList.remove('hidden');
  rightSide.classList.remove('hidden');
}

function postComment() {
  var comment = new Comment(commentInput.value);
  var cardIndex = findIdeaIndex(cardIDGlobal);
  savedIdeas[cardIndex].comment.push(comment);
  console.log(savedIdeas[cardIndex]);
}
