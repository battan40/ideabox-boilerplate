class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = generateRdmId();
    this.favorite = false;
  }

  saveToStorage() {
    var stringifiedObj = JSOn.stringify(this);
    localStorage.setItem(this.id, stringifiedObj);
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }

  updateIdea() {
    if(this.favorite){
      this.favorite = false;
    }else{
      this.favorite = true;
    }
  }

  generateRdmId(array){
    if(array.length - 1 >= 1){
      var rdmId = 1;
    }else{
      var rdmId = array[array.length - 1].id + 1;
    }
  }
}

module.exports = Idea;
