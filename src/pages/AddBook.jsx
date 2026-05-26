import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Books.css";

const CLOUDINARY_CLOUD = "db6ojh2yi";
const CLOUDINARY_PRESET = "books_upload";

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_PRESET);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
    { method: "POST", body: formData }
  );
  const data = await res.json();
  if (!data.secure_url) throw new Error("Image upload failed");
  return data.secure_url;
}

function AddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "", author: "", genre: "",
    publicationYear: "", phone: "", email: "",
  });
  const [imageFile, setImageFile]           = useState(null);
  const [imagePreview, setImagePreview]     = useState(null);
  const [loading, setLoading]               = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [error, setError]                   = useState("");

  const handleChange = (e) => setBook({ ...book, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("Image size must be less than 5MB"); return; }
    setError(""); setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); setError("");
      let imageUrl = "";
      if (imageFile) {
        setUploadProgress("📤 Uploading image...");
        imageUrl = await uploadToCloudinary(imageFile);
        setUploadProgress("✅ Image uploaded!");
      }
      await API.post("/books", { ...book, image: imageUrl });
      alert("Book Added Successfully!");
      navigate("/books");
    } catch {
      setError("Failed to add book. Please try again.");
      setUploadProgress("");
    } finally { setLoading(false); }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Add New Book</h2>
        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="book-form">

          {/* Row 1 — Title, Author, Genre */}
          <div className="form-grid">
            <div className="form-group">
              <label>Book Title *</label>
              <input type="text" placeholder="Enter book title"
                name="title" value={book.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Author *</label>
              <input type="text" placeholder="Enter author name"
                name="author" value={book.author} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Genre *</label>
              <input type="text" placeholder="e.g. Fiction, Science"
                name="genre" value={book.genre} onChange={handleChange} required />
            </div>
          </div>

          {/* Row 2 — Year, Phone, Email */}
          <div className="form-grid">
            <div className="form-group">
              <label>Publication Year *</label>
              <input type="number" placeholder="e.g. 2020"
                name="publicationYear" value={book.publicationYear} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone No</label>
              <input type="tel" placeholder="Enter phone number"
                name="phone" value={book.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter email address"
                name="email" value={book.email} onChange={handleChange} />
            </div>
          </div>

          {/* Photo Upload */}
          <div className="form-group">
            <label>Book Cover Photo (optional)</label>
            <div className="upload-box">
              <label className="upload-label">
                📷 Choose Image
                <input type="file" accept="image/*"
                  onChange={handleImageChange} className="upload-input" />
              </label>
              {imagePreview && (
                <div className="image-preview-wrap">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                  <div className="preview-info">
                    <p className="preview-name">{imageFile?.name}</p>
                    <button type="button" className="remove-image-btn"
                      onClick={() => { setImagePreview(null); setImageFile(null); }}>
                      ✕ Remove
                    </button>
                  </div>
                </div>
              )}
              {uploadProgress && <p className="upload-progress">{uploadProgress}</p>}
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Book"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddBook;