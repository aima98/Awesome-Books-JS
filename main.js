let section = document.getElementById('section');
let addBtn = document.getElementById('Add');
let title = document.getElementById('title');
let author = document.getElementById('author');

// Creating empty array to store books
let bookStorage = [];

// CHecking if there are any books in Local Storage
if(localStorage.getItem('books')) {
  bookStorage = JSON.parse(localStorage.getItem('books'));
}

getItemsFromLocalStorage();

// Adding a book
addBtn.onclick = function() {
  if(title.value != "" && author.value != "") {
    addToBookStorage(title.value, author.value);
    title.value = "";
    author.value = ""; 
  }
}

function addToBookStorage(titleName, authorName) {
  const book = {
    id: Date.now(),
    title: titleName,
    author: authorName,
  };

  // Pushing books to bookStorage array
  bookStorage.push(book);
  // Adding books to page
  addBookToPage(bookStorage);
  // Adding books to local storage
  addDataToLocalStorage(bookStorage);
}

function addBookToPage (bookStorage) {
  // Creating empty section of books  
  section.innerHTML = "";
  // Adding books to the empty section of books  
  bookStorage.forEach(book => {
    section.innerHTML += `<div id="book">
        <label for="title">${book.title}</label> <br>
        <label for="author">${book.author}</label>
        <div>
          <span>
            <button onClick="deleteBook(${book.id})">Remove</button>
          </span>
        </div>
        <hr>
      </div>`;

    title.value = '';
    author.value = '';
  });
}

// const deleteBook = (e) => {
//   e.parentElement.parentElement.parentElement.remove();  
//   window.localStorage.setItem('e', JSON.stringify(bookStorage));
// }

function addDataToLocalStorage () {
  window.localStorage.setItem('books', JSON.stringify(bookStorage));
}

function getItemsFromLocalStorage () {
  let Data = window.localStorage.getItem('books');
  if(Data) {
    let books = JSON.parse(Data);
    addBookToPage(books);
  }
}

function deleteBook(id) {
  let books = bookStorage.filter((book) => book.id !== id);
  window.localStorage.setItem('books', JSON.stringify(books));
  addBookToPage(books);
}
  
deleteBook ();