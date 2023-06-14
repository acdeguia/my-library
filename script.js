const addBtn = document.querySelector("#submit-btn");
const bookCount = document.getElementById("book-count");
const container = document.getElementById("container");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.getElementById("read");
const error = document.querySelector("#error");

let myLibrary = [
  { title: "Everyday", author: "David Levithan", pages: "295", read: true },
];

addBtn.addEventListener("click", () => {
  event.preventDefault();
  addBookToLibrary();
  clear();
  console.log(myLibrary);
  display();
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function toggleRead(index) {
  myLibrary[index].toggleRead();
  render();
}

function displayBook(book) {
  const card = document.createElement("div");
  const cardContainer = document.createElement("div");
  const titleE = document.createElement("h3");
  const authorE = document.createElement("p");
  const pagesE = document.createElement("p");
  const delBtn = document.createElement("button");
  const readE = document.createElement("p");
  delBtn.classList = "del-btn";
  card.classList = "card-body";
  authorE.classList = "author";

  titleE.innerHTML = book.title;
  authorE.innerHTML = book.author;
  pagesE.innerHTML = `${book.pages} pages`;
  delBtn.innerHTML = "Remove";
  card.innerHTML = `<p class="del" onclick="deleteBook('${book.title}')">╳</p>`;

  if (book.read === true) {
    readE.innerHTML = "READ";
  } else {
    readE.innerHTML = "not yet read";
  }

  card.append(titleE);
  card.append(authorE);
  card.append(pagesE);
  card.append(readE);
  cardContainer.append(card);
  container.appendChild(cardContainer);
}

function display() {
  container.innerHTML = ""; // Clear the container

  myLibrary.forEach(displayBook);
  bookCount.innerHTML = `Total book/s count: ${myLibrary.length}`;
}

function addBookToLibrary() {
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const read = readInput.checked;

  if (title === "" || author === "" || pages === "") {
    error.innerHTML = "Please fill up all fields.";
  } else {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    display();
    console.log(myLibrary);
  }
}

function clear() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
}

display();

function deleteBook(title) {
  const result = confirm(`Want to delete ${title}?`);
  if (result === true) {
    const index = myLibrary.findIndex((book) => book.title === title);
    myLibrary.splice(index, 1);
    display();
    console.log(myLibrary);
  }
  console.log(result);
}
