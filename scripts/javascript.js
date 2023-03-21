// Storage array for user's library of book objects
const myLibrary = [];

const addBtn = document.querySelector('.library__card--add');
const modal = document.querySelector('.modal');
const submitBtn = document.querySelector('.form__button');

addBtn.addEventListener('click', toggleModal);
submitBtn.addEventListener('click', submitForm);
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    toggleModal(e);
  }
});

// Class for defining book objects that represent the books a user adds to their library
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.key = title + author + pages; // Key used to ensure uniqueness and prevent duplicates
  }

  toggleRead() {
    this.read = !this.read;
  }
}

// -- Event Callback Functions --

// Hides or unhides form modal based on click event
function toggleModal() {
  modal.classList.toggle('hidden');
}

// Captures user data after form submission to store and display
function submitForm(e) {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#read');

  clearErrors(title, author, pages);
  if (validate(title, author, pages)) {
    const newBook = new Book(
      title.value,
      author.value,
      pages.value,
      read.checked
    );

    let isAlreadyInLibrary = false;

    myLibrary.forEach((book) =>
      book.key === newBook.key
        ? (isAlreadyInLibrary = true)
        : (isAlreadyInLibrary = false)
    );

    if (!isAlreadyInLibrary) {
      myLibrary.push(newBook);
    } else {
      alert('That book is already in your library');
    }

    e.preventDefault();
    displayBooks();
    toggleModal();

    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
  }
}

// Allows user to toggle if they've read a book in their library
function toggleReadDisplay(e) {
  const keyToFind = e.target.parentNode.dataset.key;
  myLibrary.forEach((book) => {
    if (book.key === keyToFind) {
      book.toggleRead();
    }
  });

  if (e.target.innerText === 'Read') {
    e.target.innerText = 'Unread';
    e.target.classList.remove('card__readBtn--Read');
    e.target.classList.add('card__readBtn--Unread');
  } else {
    e.target.innerText = 'Read';
    e.target.classList.remove('card__readBtn--Unread');
    e.target.classList.add('card__readBtn--Read');
  }
}

// Allows user to delete a book upon the clicking of the "X" button
function deleteBook(e) {
  const deleteDiv = e.target.parentNode;
  const library = deleteDiv.parentNode;

  myLibrary.forEach((book, index) => {
    if (book.key === deleteDiv.dataset.key) {
      myLibrary.splice(index, 1);
    }
  });
  library.removeChild(deleteDiv);
}

// -- Functions Utilized by Callback Functions --

// Called by submitForm function to display user's library
function displayBooks() {
  // Filter out books already displayed onscreen using key values
  const filteredLibrary = myLibrary.filter((book) => {
    const onPageBooks = document.querySelectorAll('.library__card');
    for (const onPageBook of onPageBooks) {
      if (onPageBook.dataset.key === book.key) {
        return false;
      }
    }
    return true;
  });
  filteredLibrary.forEach((book) => addBook(book));
}

// Called by displayBooks() to add any books not on screen to the screen
function addBook(book) {
  const library = document.querySelector('.library');
  const newDiv = document.createElement('div');
  const readStatus = book.read ? 'Read' : 'Unread'; // Translate boolean value to better display to user
  newDiv.classList.add('library__card');
  newDiv.dataset.key = `${book.key}`; // Book's unique key is kept as a data-value so it can be linked to matching object in storage array

  const title = document.createElement('h3');
  title.innerText = book.title;
  newDiv.appendChild(title);

  const author = document.createElement('p');
  author.innerText = book.author;
  newDiv.appendChild(author);

  const pages = document.createElement('p');
  pages.innerText = book.pages;
  newDiv.appendChild(pages);

  const readBtn = document.createElement('button');
  readBtn.classList.add('card__readBtn', `card__readBtn--${readStatus}`); // Read or Unread have unique CSS stylings
  readBtn.innerText = readStatus;
  readBtn.addEventListener('click', toggleReadDisplay);
  newDiv.appendChild(readBtn);

  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('card__deleteBtn');
  deleteBtn.innerHTML = '&times';
  deleteBtn.addEventListener('click', deleteBook);
  newDiv.appendChild(deleteBtn);

  library.insertAdjacentElement('afterbegin', newDiv);
}

// Called by submitForm to validate user data before anything is done with it
function validate(title, author, pages) {
  if (title.value === '') {
    title.classList.add('form__input--error');
    return false;
  }
  if (author.value === '') {
    author.classList.add('form__input--error');
    return false;
  }
  if (pages.value === '') {
    pages.classList.add('form__input--error');
  } else {
    return true;
  }
}

// Called by submitForm to clear errors highlighted for the user before successful submission or throwing new errors
function clearErrors(title, author, pages) {
  title.classList.remove('form__input--error');
  author.classList.remove('form__input--error');
  pages.classList.remove('form__input--error');
}
