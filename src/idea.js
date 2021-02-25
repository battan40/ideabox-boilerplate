class Idea {
  constructor(title, body, array) {
    this.title = title;
    this.body = body;
    this.id = this.generateRdmId(array);
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
    if (this.star) {
      this.star = false;
    } else {
      this.star = true;
    }
  }

  generateRdmId(array) {
    if (array.length === 0) {
      var rdmId = 1;
    } else {
      var arrayLength = array.length - 1;
      var rdmId = array[arrayLength].id + 1;
    }
    return rdmId;
  }
}
