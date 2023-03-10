const addBtn = document.querySelector("#submit-btn");
const bookCount = document.getElementById("book-count");

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

function display() {
  const container = document.getElementById("container");
  const card = document.createElement("div");
  const cardContainer = document.createElement("div");
  const titleE = document.createElement("h3");
  const authorE = document.createElement("p");
  const pagesE = document.createElement("p");
  const delBtn = document.createElement("button");
  const del = document.createElement("div");
  const readE = document.createElement("p");

  delBtn.classList = " del-btn";

  card.classList = "card-body";
  authorE.classList = "author";
  container.innerHTML = "";

  myLibrary.forEach((book) => {
    titleE.innerHTML = book.title;
    authorE.innerHTML = book.author;
    pagesE.innerHTML = `${book.pages} pages`;

    delBtn.innerHTML = "Remove";
    del.innerHTML = `<p class=" del" onclick="deleteBook('${book.title}')">╳</p>`;

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
    card.append(del);
    container.innerHTML += cardContainer.innerHTML;
  });
  bookCount.innerHTML = `Total book/s count: ${myLibrary.length}`;
}

function addBookToLibrary() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.getElementById("read").checked;

  let error = document.querySelector("#error");

  let newBook = new Book(title, author, pages, read);

  if (title === "" || author === "" || pages === "") {
    error.innerHTML = "pls fill up";
  } else {
    myLibrary.push(newBook);
    display();
    console.log(myLibrary);
  }
}

function clear() {
  title.value = "";
  author.value = "";
  pages.value = "";
}

display();

function deleteBook(title) {
  let result = confirm(`Want to delete ${title}?`);
  if (result === true) {
    let index = myLibrary.findIndex((book) => book.title == title);
    myLibrary.splice(index, 1);
    display();
    console.log(myLibrary);
  }
  console.log(result);
}
