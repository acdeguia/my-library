const addBtn = document.querySelector("#submit-btn");
const bookCount = document.getElementById("book-count");
const container = document.getElementById("container");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.getElementById("read");
const error = document.querySelector("#error");

let myLibrary = [];

addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBookToLibrary();
  clear();
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
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

    // Add the new book document to the "books" collection in Firestore
    db.collection("books")
      .add({
        title: newBook.title,
        author: newBook.author,
        pages: newBook.pages,
        read: newBook.read,
      })
      .then((docRef) => {
        console.log("Book added to Firestore with ID:", docRef.id);
        newBook.id = docRef.id;
        myLibrary.push(newBook);
        // display();
      })
      .catch((error) => {
        console.log("Error adding book to Firestore:", error);
      });
  }
}

// Retrieve the books from Firestore and display them
function display() {
  container.innerHTML = ""; // Clear the container

  const bookIds = new Set(); // Keep track of book IDs

  myLibrary.forEach((book) => {
    if (!bookIds.has(book.id)) {
      displayBook(book);
      bookIds.add(book.id);
    }
  });

  bookCount.innerHTML = `Total book/s count: ${myLibrary.length}`;
}

// Display a book card in the container
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
  card.innerHTML = `<p class="del" onclick="deleteBook('${book.id}')">×</p>`;

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

// Delete a book from Firestore and update the display
function deleteBook(bookId) {
  const result = confirm(`Want to delete book with ID ${bookId}?`);
  if (result === true) {
    // Delete the book document from the "books" collection in Firestore
    db.collection("books")
      .doc(bookId)
      .delete()
      .then(() => {
        console.log("Book deleted from Firestore with ID:", bookId);
        const index = myLibrary.findIndex((book) => book.id === bookId);
        myLibrary.splice(index, 1);
        display(); // Update the display after removing the book from myLibrary
      })
      .catch((error) => {
        console.log("Error deleting book from Firestore:", error);
      });
  }
}


// Clear the input fields
function clear() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
}

// Listen for changes in the "books" collection in Firestore
db.collection("books").onSnapshot((snapshot) => {
  const changes = snapshot.docChanges();

  changes.forEach((change) => {
    const bookData = change.doc.data();
    const bookId = change.doc.id;

    if (change.type === "added") {
      const existingBook = myLibrary.find((book) => book.id === bookId);
      if (!existingBook) {
        const book = new Book(
          bookData.title,
          bookData.author,
          bookData.pages,
          bookData.read
        );
        book.id = bookId;
        myLibrary.push(book);
      }
    } else if (change.type === "modified") {
      const index = myLibrary.findIndex((book) => book.id === bookId);
      if (index !== -1) {
        myLibrary[index].title = bookData.title;
        myLibrary[index].author = bookData.author;
        myLibrary[index].pages = bookData.pages;
        myLibrary[index].read = bookData.read;
      }
    } else if (change.type === "removed") {
      const index = myLibrary.findIndex((book) => book.id === bookId);
      if (index !== -1) {
        myLibrary.splice(index, 1);
      }
    }
  });

  display();
});


