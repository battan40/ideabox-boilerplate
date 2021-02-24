var saveButton = document.querySelector('#save');
var titleInput = document.querySelector('#titleInput');
var bodyInput = document.querySelector('#bodyInput');



saveButton.addEventListener('click', createIdeaCard);


function createIdeaCard() {
  var newIdea = new Idea();
  newIdea = createNewIdea();
  console.log(newIdea);
}

function createNewIdea() {
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  return newIdea;
}
