var saveButton = document.querySelector('#save');
var titleInput = document.querySelector('#titleInput');
var bodyInput = document.querySelector('#bodyInput');

var savedIdeas = [];


saveButton.addEventListener('click', createIdeaCard);


function createIdeaCard() {
  console.log(titleInput.value);
  console.log(bodyInput.value);
  if (titleInput.value !== "" && bodyInput.value !== "") {
    var newIdea = new Idea();
    newIdea = createNewIdea();
    console.log(newIdea);
  }
}

function createNewIdea() {
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  //newIdea.generateRdmId(savedIdeas);
  return newIdea;
}
