import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/axios";
import "./Books.css";
import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/books/${id}`);
        setBook(res.data);
      } catch { setError("Failed to load book details."); }
      finally { setLoading(false); }
    };
    fetchBook();
  }, [id]);

  if (loading) return (
    <div className="page"><div className="card">
      <div className="state-box"><div className="spinner"></div><p>Loading...</p></div>
    </div></div>
  );

  if (error || !book) return (
    <div className="page"><div className="card">
      <div className="state-box error-state">
        <p>⚠️ {error || "Book not found."}</p>
        <Link to="/books"><button className="retry-btn">Back to Books</button></Link>
      </div>
    </div></div>
  );

  return (
    <div className="page">
      <div className="details-wrapper">

        {/* LEFT — Cover */}
        <div className="details-cover-col">
          <div className="cover-frame">
            {book.image ? (
              <img src={book.image} alt={book.title} className="book-cover-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/320x420/1A2030/D4A853?text=${encodeURIComponent(book.title || "Book")}`;
                }} />
            ) : (
              <div className="cover-placeholder">
                <span>📚</span><p>{book.title}</p>
              </div>
            )}
          </div>
          <div className="id-badge">ID #{book.id}</div>
        </div>

        {/* RIGHT — Info */}
        <div className="details-info-col">

          <div className="details-header">
            <h1 className="details-title">{book.title}</h1>
            <p className="details-author">by {book.author}</p>
          </div>

          <div className="details-meta">
            <div className="meta-item">
              <span className="meta-label">📖 Genre</span>
              <span className="meta-value genre-tag">{book.genre || "—"}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">📅 Publication Year</span>
              <span className="meta-value">{book.publicationYear || "—"}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">📞 Phone No</span>
              <span className="meta-value">{book.phone || "—"}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">✉️ Email</span>
              <span className="meta-value">{book.email || "—"}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">🆔 Book ID</span>
              <span className="meta-value">{book.id}</span>
            </div>
          </div>

          <div className="details-actions">
            <Link to="/books">
              <button className="back-btn">← Back to Books</button>
            </Link>
            <Link to={`/books/edit/${book.id}`}>
              <button className="edit-btn">✏️ Edit Book</button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BookDetails;