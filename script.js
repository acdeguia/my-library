let title = document.querySelector("#title").value;
let author = document.querySelector("#author").value;
let pages = document.querySelector("#pages").value;
let read = document.querySelector("#pages").checked;

const addBtn = document.querySelector("#submit-btn");
addBtn.addEventListener("click", () => {
  addBookToLibrary();
  clear();
  console.log(myLibrary);
  display();
});

let myLibrary = [
  { title: "Everyday", author: "David Levithan", pages: "295", read: true },
];

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
  delBtn.classList = " del-btn";
  card.classList = "card-body";
  container.innerHTML = "";
  myLibrary.forEach((book) => {
    if(title.value !== '' || author.value)
    titleE.innerHTML = book.title;
    authorE.innerHTML = book.author;
    pagesE.innerHTML = book.pages;
    delBtn.innerHTML = "Remove";
    del.innerHTML = `<button onclick="deleteBook('${book.title}')">Delete</button><br>`;

    card.append(title);
    card.append(author);
    card.append(pages);
    card.append(del);
    cardContainer.append(card);
    container.innerHTML += cardContainer.innerHTML;
  });
}

function addBookToLibrary() {
  // let title = document.querySelector("#title").value;
  // let author = document.querySelector("#author").value;
  // let pages = document.querySelector("#pages").value;
  // let read = document.querySelector("#pages").checked;
  // let container = document.querySelector("#container").value;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  display();
  console.log(myLibrary);
}

function clear() {
  title.value = "";
  author.value = "";
  pages.value = "";
}

display();

function deleteBook(title) {
  let index = myLibrary.findIndex((book) => book.title == title);
  myLibrary.splice(index, 1);
  display();
  console.log(myLibrary);
}
