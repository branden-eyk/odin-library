const myLibrary = [];
const addBtn = document.querySelector('.library__card--add');

addBtn.addEventListener('click', handleAdd);

function handleAdd() {
  const library = document.querySelector('.library');
  const newDiv = document.createElement('div');
  newDiv.classList.add('library__card');
  library.insertAdjacentElement('afterbegin', newDiv);
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? 'has been read' : 'not read yet'
  }`;
};
