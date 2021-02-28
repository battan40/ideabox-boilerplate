class Idea {
  constructor(title, body, id, star) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.star = star || false;
    this.comment = []
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
