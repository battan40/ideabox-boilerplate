var saveButton = document.querySelector('#save');
var titleInput = document.querySelector('#titleInput');
var bodyInput = document.querySelector('#bodyInput');
var ideaParent = document.querySelector('#ideaParent');

var savedIdeas = [];


saveButton.addEventListener('click', createIdeaCard);


function createIdeaCard() {
  if (titleInput.value !== "" && bodyInput.value !== "") {
    var newIdea = new Idea();
    newIdea = createNewIdea();
    updateIdeaArray(newIdea);
    renderIdeaCard();
  }
}

function createNewIdea() {
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  //newIdea.generateRdmId(savedIdeas);
  return newIdea;
}

function updateIdeaArray(newIdea) {
  console.log(savedIdeas.includes(newIdea.title) + " new idea inclues");
  // if (!savedIdeas.includes(newIdea.title) && !savedIdeas.includes(newIdea.body)){
    savedIdeas.push(newIdea);
  }
// }

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
