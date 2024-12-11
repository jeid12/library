// Array that will hold all the books
const myLibrary = [
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        pages: 281,
        genre: "Fiction",
        read: "not read yet",
        description: "A classic novel about a young girl's struggle to survive in a dysfunctional family.",
        info: function () {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
        },
    },
    
];

const bookContainer = document.getElementById('book-container');
const addBookButton = document.getElementById('add-book');
const addBookForm = document.getElementById('add-book-form');
const cancelButton = document.getElementById('cancel-button');
const form = document.getElementById('form');

// Constructor for book object
function Book(title, author, genre, pages, read, description) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
    this.description = description;
    this.info = () => {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    };
}

// Function to add a new book to the library
const addBookToLibrary = (book) => {
    myLibrary.push(book);
    displayLibrary();  // Refresh the book display after adding the book
};

// Function to display the library with Read More functionality
const displayLibrary = () => {
    bookContainer.innerHTML = ""; // Clear previous content
    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <h2 class="book-title">${book.title}</h2>
            <hr>
            <p>Author: ${book.author}</p>
            <p>Genre: ${book.genre}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read}</
            `

        // Add Read More button
        const readMoreButton = document.createElement('button');
        readMoreButton.textContent = "Read More";
        readMoreButton.classList.add('read-more-btn');
        readMoreButton.addEventListener('click', () => openPopup(book, index));

        bookDiv.appendChild(readMoreButton);
        bookContainer.appendChild(bookDiv);
    });
};

// Function to open the popup with book details
const openPopup = (book, index) => {
    const popupDiv = document.createElement('div');
    popupDiv.classList.add('popup');

    // Popup content
    popupDiv.innerHTML = `
        <div class="popup-content">
            <span class="close-btn">&times;</span>
            <h2>${book.title}</h2>
            <p>Author: ${book.description}</p>
            <button class="delete-btn">Delete Book</button>
        </div>
    `;

    document.body.appendChild(popupDiv);

    // Close button functionality
    const closeBtn = popupDiv.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => popupDiv.remove());

    // Delete button functionality
    const deleteBtn = popupDiv.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        myLibrary.splice(index, 1); // Remove book from library
        popupDiv.remove(); // Remove popup
        displayLibrary(); // Refresh book display
    });
};

// Function to handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;
    const description = document.getElementById('description').value;

    const newBook = new Book(title, author, genre, pages, read, description);
    addBookToLibrary(newBook);
    toggleForm(); // Hide the form and show the book list
});

// Function to handle form cancel
cancelButton.addEventListener('click', () => {
    toggleForm(); // Hide the form and show the book list
});

// Function to toggle between book list and add book form
const toggleForm = () => {
    addBookForm.style.display = (addBookForm.style.display === 'none') ? 'block' : 'none';
    bookContainer.style.display = (bookContainer.style.display === 'none') ? 'block' : 'none';
};

// Initial display of books
displayLibrary();

// Event listener for Add Book button
addBookButton.addEventListener('click', () => {
    toggleForm(); // Show the form
    bookContainer.style.display = 'none'; // Hide the book list
});
