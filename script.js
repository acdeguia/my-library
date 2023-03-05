const submitBtn = document.getElementById("submit-btn");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const error = document.querySelector('#error')

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBookToLibrary();
  clear();
  // closeForm()
});

let myLibrary = [
  {title: 'Everyday', author: 'David Levithan', pages: '394'},
];

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function Book() {
  // the constructor...
}

function addBookToLibrary() {

  if(title.value === '' || author.value === '' || pages.value === '') {
    error.innerHTML = 'pls fill up form'
  }else{
    myLibrary.push({
    title: title.value,
    author: author.value,
    pages: pages.value,
  });
  display()

  }
  


  
}

function clear() {
  title.value = "";
  author.value = "";
  pages.value = "";
}

function display() {
  const container = document.getElementById("container");
  const card = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const delBtn = document.createElement('button')
  delBtn.classList = ' del-btn'


  myLibrary.forEach((book) => {
    card.classList = "card-body";

    title.innerHTML = book.title;
    author.innerHTML = book.author;
    pages.innerHTML = book.pages;
    delBtn.innerHTML = 'Remove'

    card.append(title);
    card.append(author);
    card.append(pages);
    card.append(delBtn)
  });
  container.append(card);
}

display()