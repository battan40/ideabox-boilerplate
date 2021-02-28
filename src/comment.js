class Comment {
  constructor(comment) {
    this.comment = comment;
    this.id = Date.now;
  }


  saveToStorage() {
    localStorage.setItem(this.id, this.comment);
  }


  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }
}
