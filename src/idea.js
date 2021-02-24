class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    //this.id = generateRdmId();
    this.star = false;
    this.id = 1;
  }

  saveToStorage() {
    var stringifiedObj = JSON.stringify(this);
    localStorage.setItem(this.id, stringifiedObj);
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }

  updateIdea() {
    if(this.star){
      this.star = false;
    }else{
      this.star = true;
    }
  }

  // generateRdmId(array){
  //   if(array.length - 1 >= 1){
  //     var rdmId = 1;
  //   }else{
  //     var rdmId = array[array.length - 1].id + 1;
  //   }
  // }
}
