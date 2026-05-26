import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import API from "../api/axios";
import ConfirmDelete from "../components/ConfirmDelete";
import "./Books.css";

function BookList() {
  const [books, setBooks]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // ── Filters ──────────────────────────────
  const [filters, setFilters] = useState({
    search: "", genre: "", year: "", phone: "", email: "",
  });

  const fetchBooks = async () => {
    try {
      setLoading(true); setError("");
      const res = await API.get("/books");
      setBooks(res.data);
    } catch { setError("Failed to load books. Please try again."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBooks(); }, []);

  // Unique values for filter dropdowns
  const unique = (key) => [...new Set(books.map((b) => b[key]).filter(Boolean))];

  const handleFilter = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ search: "", genre: "", year: "", phone: "", email: "" });
  };

  const filteredBooks = books.filter((book) => {
    const q = filters.search.toLowerCase();
    const matchSearch =
      !q ||
      (book.title  || "").toLowerCase().includes(q) ||
      (book.author || "").toLowerCase().includes(q);
    const matchGenre = !filters.genre || (book.genre || "") === filters.genre;
    const matchYear  = !filters.year  || String(book.publicationYear) === filters.year;
    const matchPhone = !filters.phone || (book.phone || "") === filters.phone;
    const matchEmail = !filters.email || (book.email || "") === filters.email;
    return matchSearch && matchGenre && matchYear && matchPhone && matchEmail;
  });

  const openDeleteModal = (id) => { setSelectedId(id); setShowDelete(true); };

  const handleDelete = async () => {
    try {
      await API.delete(`/books/${selectedId}`);
      setBooks(books.filter((b) => b.id !== selectedId));
      setShowDelete(false);
    } catch { alert("Failed to delete book."); }
  };

  return (
    <div className="page">
      <div className="table-card">

        {/* ── FILTER BAR ───────────────────── */}
        <div className="filter-bar">

          <div className="filter-row">

            {/* Search */}
            <div className="filter-group">
              <label>Search</label>
              <input
                type="text"
                name="search"
                placeholder="Search by title or author..."
                value={filters.search}
                onChange={handleFilter}
                className="filter-input"
              />
            </div>

            {/* Genre */}
            <div className="filter-group">
              <label>Genre</label>
              <select name="genre" value={filters.genre}
                onChange={handleFilter} className="filter-select">
                <option value="">All</option>
                {unique("genre").map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            {/* Year */}
            <div className="filter-group">
              <label>Year</label>
              <select name="year" value={filters.year}
                onChange={handleFilter} className="filter-select">
                <option value="">All</option>
                {unique("publicationYear").sort().reverse()
                  .map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            {/* Phone */}
            <div className="filter-group">
              <label>Phone No</label>
              <select name="phone" value={filters.phone}
                onChange={handleFilter} className="filter-select">
                <option value="">All</option>
                {unique("phone").map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Email */}
            <div className="filter-group">
              <label>Email</label>
              <select name="email" value={filters.email}
                onChange={handleFilter} className="filter-select">
                <option value="">All</option>
                {unique("email").map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>

          </div>

          {/* Actions row */}
          <div className="filter-actions">
            <button type="button" className="clear-btn" onClick={clearFilters}>
              Clear
            </button>
            <span className="total-badge">
              Total Books : {filteredBooks.length}
            </span>
            <Link to="/books/add">
              <button className="add-book-btn">+ Add Book</button>
            </Link>
          </div>

        </div>

        {/* ── LOADING / ERROR ──────────────── */}
        {loading && (
          <div className="state-box">
            <div className="spinner"></div>
            <p>Loading books...</p>
          </div>
        )}
        {error && !loading && (
          <div className="state-box error-state">
            <p>⚠️ {error}</p>
            <button onClick={fetchBooks} className="retry-btn">Retry</button>
          </div>
        )}

        {/* ── TABLE ────────────────────────── */}
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Year</th>
                <th>Phone No</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-results">No books found.</td>
                </tr>
              ) : (
                filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>
                      <Link to={`/books/${book.id}`} className="title-link">
                        {book.title || "—"}
                      </Link>
                    </td>
                    <td>{book.author || "—"}</td>
                    <td>{book.genre  || "—"}</td>
                    <td>{book.publicationYear || "—"}</td>
                    <td>{book.phone || "—"}</td>
                    <td>{book.email || "—"}</td>
                    <td className="action-buttons">
                      <Link to={`/books/${book.id}`}>
                        <button className="view-btn">View</button>
                      </Link>
                      <Link to={`/books/edit/${book.id}`}>
                        <button className="edit-btn">Edit</button>
                      </Link>
                      <button className="delete-btn"
                        onClick={() => openDeleteModal(book.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

      </div>

      <ConfirmDelete
        show={showDelete}
        onClose={() => setShowDelete(false)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default BookList;