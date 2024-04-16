const bookList = document.getElementById('book-list');
const searchForm = document.getElementById('search-form');
const bookInfo = document.getElementById('book-info');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookSummary = document.getElementById('book-summary');

function fetchBooks(searchTerm = '') {
    fetch(`https://wjs-api.vercel.app/api/books?search=${searchTerm}`)
.then(response => response.json())
        .then(data => {
            bookList.innerHTML = '';
            data.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `${book.title} by ${book.authors}`;
                li.addEventListener('click', function() {
                    showBookInfo(book);
                });
                bookList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Chyba při načítání dat:', error);
        });
}

function showBookInfo(book) {
    bookTitle.textContent = `Název: ${book.title}`;
    bookAuthor.textContent = `Autor: ${book.authors}`;
    bookSummary.textContent = `Shrnutí: ${book.shortDescription}`;
    bookInfo.style.display = 'block';
}

fetchBooks();

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search').value;
    fetchBooks(searchTerm);
});