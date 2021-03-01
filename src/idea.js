class Idea {
  constructor(obj) {
      this.title = obj.title;
      this.body = obj.body;
      this.id = obj.id || Date.now();
      this.star = obj.star || false;
      this.comment = obj.comment || [];
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
    this.saveToStorage();
  }
}
