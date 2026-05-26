import "./BookCard.css";

function BookCard({ book }) {
  return (
    <div className="book-card">

      <div className="book-icon">
        📚
      </div>

      <h2>{book.title}</h2>

      <div className="book-info">
        <p>
          <strong>Author:</strong> {book.author}
        </p>

        <p>
          <strong>Genre:</strong> {book.genre}
        </p>

        <p>
          <strong>Publication Year:</strong> {book.publicationYear}
        </p>
      </div>

    </div>
  );
}

export default BookCard;