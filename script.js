const submitBtn = document.getElementById('submit-btn')
const title = document.getElementById('title')
const author = document.getElementById('author')
const pages = document.getElementById('pages')

submitBtn.addEventListener('click', (event) => {
  event.preventDefault()
  addBookToLibrary()
  clear()
  console.log(myLibrary)
})

let myLibrary = [
  {
    title: "title1",
    author: "author1",
    pages: "pages1",
  },
  {
    title: "title2",
    author: "author2",
    pages: "pages2",
  },
  {
    title: "title3",
    author: "author3",
    pages: "pages3",
  },

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

function addBookToLibrary(form) {


        myLibrary.push(
            {
                title: title.value,
                author: author.value,
                pages: pages.value,
            },
        );
}

function clear() {
  title.value = ''
  author.value = ''
  pages.value = ''
}

myLibrary.forEach((book) => {
  const container = document.getElementById("container");
  const card = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("p");
  const pages = document.createElement("p");

  card.classList = "card-body";

  title.innerHTML = book.title;
  author.innerHTML = book.author;
  pages.innerHTML = book.pages;

  card.append(title);
  card.append(author);
  card.append(pages);

  container.append(card);
});
