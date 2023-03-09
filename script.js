const addBtn = document.querySelector("#submit-btn");

addBtn.addEventListener("click", () => {
  addBookToLibrary();
 clear();
  console.log(myLibrary);
  display();
});

let myLibrary = [
  {title: "Everyday", author: "David Levithan", pages: "295", read: 'read'},
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  // this.read = read;
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
  const readE = document.createElement("checkbox");
  delBtn.classList = " del-btn";
  card.classList = "card-body";
  container.innerHTML = "";
  
  myLibrary.forEach((book) => {

    titleE.innerHTML = book.title;
    authorE.innerHTML = book.author;
    pagesE.innerHTML = book.pages;
    readE.value = book.read;
    delBtn.innerHTML = "Remove";
    del.innerHTML = `<button class="remove-btn" onclick="deleteBook('${book.title}')">Delete</button><br>`;

    card.append(titleE);
    card.append(authorE);
    card.append(pagesE);
    card.append(del);
    card.append(readE)
    cardContainer.append(card);
    
    container.innerHTML += cardContainer.innerHTML;
  });
  
}

function addBookToLibrary() {

  let title = document.querySelector("#title").value;
let author = document.querySelector("#author").value;
let pages = document.querySelector("#pages").value;
let read = document.querySelector("#read").value;
let error = document.querySelector('#error')

  let newBook = new Book(title, author, pages, read);

  if(title === '' || author === '' || pages === ''){
    error.innerHTML = 'pls fill up'
  }else{
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
  let index = myLibrary.findIndex((book) => book.title == title);
  myLibrary.splice(index, 1);
  display();
  console.log(myLibrary);
}