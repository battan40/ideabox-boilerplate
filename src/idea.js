class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = 1;
    this.star = false;
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
  //     var arrayLength = arrayLength.length - 1;
  //     var rdmId = array[arrayLength].id + 1;
  //   }
  // }
}
