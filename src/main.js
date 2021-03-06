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
var showComment = document.querySelector('#showComments');
var popupForm = document.querySelector('#popupForm');

var savedIdeas = [];

saveButton.addEventListener('click', createIdeaCard);
window.addEventListener('load', retrieveAllStorage);
titleInput.addEventListener('keyup', checkInputFields);
bodyInput.addEventListener('keyup', checkInputFields);
commentInput.addEventListener('keyup', checkCommentField);
ideaParent.addEventListener('click', checkTarget);
showFavoriteButton.addEventListener('click', findFavorites);
searchInput.addEventListener('keyup', filterIdeas);
searchInput.addEventListener('search', filterIdeas);
takeMeBackButton.addEventListener('click', showMain);
submitComment.addEventListener('click', postComment);

function createIdeaCard(event) {
  event.preventDefault();
  var newIdea = createNewIdea();
  addNewIdea(newIdea);
  renderIdeaCard(savedIdeas);
  clearInputFields();
  checkInputFields();
  showFavoriteButton.innerText = "Show Starred Ideas";
}

function createNewIdea() {
  var newIdea = new Idea({
    title: titleInput.value,
    body: bodyInput.value
  });
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
      <section class="comment-display-box hidden">
      </section>
      <section class="idea-box-footer">
        <img class="idea-comment-img" id="commentButton" src="./assets/comment.svg" alt="A comment button">
        <p class="idea-comment">Comment</p>
        <button class="show-comments" id="showComments">Show Comments</button>
      </section>
    </article>`
  }
}

function clearInputFields() {
  titleInput.value = "";
  bodyInput.value = "";
  commentInput.value = "";
}

function checkInputFields() {
  if (/\S/.test(titleInput.value) && /\S/.test(bodyInput.value)) {
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

function retrieveAllStorage() {
  checkInputFields();
  cardIDs = Object.keys(localStorage);
  for (i = 0; i < cardIDs.length; i++) {
    var parsed = JSON.parse(localStorage.getItem(cardIDs[i]));
    var newIdea = new Idea(parsed);
    savedIdeas.unshift(newIdea);
  }
  renderIdeaCard(savedIdeas);
}

function checkCommentField() {
  if (/\S/.test(commentInput.value)) {
    submitComment.disabled = false;
    submitComment.classList.remove('disabled-button');
  } else {
    submitComment.disabled = true;
    submitComment.classList.add('disabled-button');
  }
}

function checkTarget(event) {
  event.preventDefault()
  if (event.target.classList.contains("delete-idea")) {
    deleteIdea(event);
  } else if (event.target.classList.contains("idea-favorite")) {
    favoriteIdea(event);
  } else if (event.target.classList.contains("idea-comment-img")) {
    createComment(event);
  } else if (event.target.classList.contains("show-comments")) {
    showCommentCard(event);
  }
}

function deleteIdea(event) {
  updateIdeaArray(event.target.parentElement.parentElement.id);
  event.target.closest("article").remove();
}

function updateIdeaArray(id) {
  for (var i = 0; i < savedIdeas.length; i++) {
    if (parseInt(savedIdeas[i].id) === parseInt(id)) {
      savedIdeas[i].deleteFromStorage();
      savedIdeas.splice(i, 1);
      return;
    }
  }
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
    if (parseInt(savedIdeas[i].id) === parseInt(id)) {
      return i;
    }
  }
}

function createComment(event) {
  popupForm.id = event.target.parentElement.parentElement.id;
  showCommentForm();
}

function showCommentCard(event) {
  toggleCommentSection(event.target.parentElement.previousElementSibling);
  toggleCommentButtonText(event.target, event.target.parentElement.previousElementSibling);
  var idea = savedIdeas[findIdeaIndex(event.target.parentElement.parentElement.id)];
  generateComments(idea, event.target.parentElement.previousElementSibling);
}

function toggleCommentSection(commentSection) {
  commentSection.classList.toggle('hidden');
  commentSection.previousElementSibling.classList.toggle('hidden');
}

function toggleCommentButtonText(button, commentSection) {
  if (commentSection.classList.contains('hidden')) {
    button.innerText = "Show Comments";
  } else {
    button.innerText = "Show Idea";
  }
}

function generateComments(idea, commentSection) {
  commentSection.innerHTML = "";
  for (var i = 0; i < idea.comment.length; i++) {
    commentSection.innerHTML += `<p>${idea.comment[i].comment}</p>`;
  }
}

function showCommentForm() {
  checkCommentField();
  commentForm.classList.remove('hidden');
}

function filterIdeas() {
  event.preventDefault();
  if (showFavoriteButton.innerText === "Show All Ideas") {
    showsFilteredIdeas(filterFavorites());
  } else {
    showsFilteredIdeas(savedIdeas);
  }
}

function showsFilteredIdeas(array) {
  if (searchInput.value !== "") {
    var filteredIdeas = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i].title.toUpperCase().includes(searchInput.value.toUpperCase())) {
        filteredIdeas.push(array[i]);
      } else if (array[i].body.toUpperCase().includes(searchInput.value.toUpperCase())) {
        filteredIdeas.push(array[i]);
      }
    }
    renderIdeaCard(filteredIdeas);
  } else {
    renderIdeaCard(array);
  }
}

function filterFavorites() {
  var starredIdeas = [];
  for (var i = 0; i < savedIdeas.length; i++) {
    if (savedIdeas[i].star) {
      starredIdeas.push(savedIdeas[i]);
    }
  }
  return starredIdeas;
}

function findFavorites() {
  event.preventDefault();
  changeStarButtonText();
  filterIdeas();
}

function changeStarButtonText() {
  if (showFavoriteButton.innerText === "Show Starred Ideas") {
    showFavoriteButton.innerText = "Show All Ideas";
  } else {
    showFavoriteButton.innerText = "Show Starred Ideas";
  }
}

function showMain() {
  commentForm.classList.add('hidden');
  clearInputFields();
}

function postComment() {
  var comment = new Comment(commentInput.value);
  var cardIndex = findIdeaIndex(popupForm.id);
  savedIdeas[cardIndex].comment.push(comment);
  savedIdeas[cardIndex].saveToStorage();
  showMain();
  revealCommentCard(popupForm.id);
}

function revealCommentCard(id) {
  var ideaParent = document.getElementById(id);
  var commentSection = ideaParent.firstElementChild.nextElementSibling.nextElementSibling;
  var button = commentSection.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling;
  if (commentSection.classList.contains('hidden')) {
    toggleCommentSection(commentSection);
    toggleCommentButtonText(button, commentSection);
  }
  var idea = savedIdeas[findIdeaIndex(ideaParent.id)];
  generateComments(idea, commentSection);
}
