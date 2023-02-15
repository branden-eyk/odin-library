const myLibrary = [];
const addBtn = document.querySelector('.library__card--add');
const library = document.querySelector('.library');
const modalBackground = document.querySelector('.modal');
const modal = document.querySelector('.modal');
const submitBtn = document.querySelector('.form__button');

addBtn.addEventListener('click', toggleModal);
submitBtn.addEventListener('click', submitForm);
modalBackground.addEventListener('click', (e) => {
  if (e.target === modalBackground) {
    toggleModal(e);
  }
});

function displayBooks() {
  myLibrary.forEach((book) => addBook(book));
  /* Add function for checking if a book is already displayed on page, maybe using the title and author combo as a way to identify it */
}

function toggleModal() {
  modal.classList.toggle('hidden');
}

function submitForm(e) {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#read');

  const newBook = new Book(
    title.value,
    author.value,
    pages.value,
    read.checked
  );
  console.log(newBook);
  myLibrary.push(newBook);
  e.preventDefault();
  displayBooks();
  toggleModal();
}

function addBook(book) {
  const newDiv = document.createElement('div');
  const readStatus = book.read ? 'Read' : 'Unread';
  newDiv.classList.add('library__card');
  newDiv.innerHTML = `
    <h3>${book.title}</h3>
    <p>By: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <button class="card__readBtn card__readBtn--${readStatus}">${readStatus}</button>
    <span class="card__deleteBtn">&times</span>
  `;
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
