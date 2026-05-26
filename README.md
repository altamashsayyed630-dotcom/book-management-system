# 📚 Book Management System

A full-featured Book Management System built with React, allowing users to view, add, update, and delete books with real-time API integration.

## 🌐 Live Demo
🔗 https://book-management-system-jade.vercel.app

## 📁 GitHub Repository
🔗 https://github.com/altamashsayyed630-dotcom/book-management-system

---

## ✨ Features

- 📋 **View Books** — Display all books in a clean table with ID, Title, Author, Genre, Year, Phone, Email
- ➕ **Add Book** — Add new books with cover photo upload (Cloudinary)
- ✏️ **Edit Book** — Update existing book details and cover photo
- 🗑️ **Delete Book** — Delete with confirmation modal
- 🔍 **Search** — Search books by title or author
- 🔽 **Filters** — Filter by Genre, Year, Phone, Email
- 📄 **Book Details** — Detailed view with book cover image
- ⚙️ **Settings** — Dark mode, books per page, language, app stats
- ⏳ **Loading States** — Spinner on every API call
- ❌ **Error Handling** — Error messages with retry option

---

## 🛠️ Tech Stack

| Technology | Usage |
|-----------|-------|
| React + Vite | Frontend framework |
| React Router DOM | Client-side routing |
| Axios | API calls |
| MockAPI | Backend / Database |
| Cloudinary | Image hosting |
| CSS Variables | Theming (Dark mode) |

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/altamashsayyed630-dotcom/book-management-system.git
cd book-management-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Axios (if not installed)
```bash
npm install axios
```

### 4. Configure API
Open `src/api/axios.js` and verify the base URL:
```js
const API = axios.create({
  baseURL: "https://6a1469706c7db8aac0547a26.mockapi.io",
});
```

### 5. Run the App
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build for Production
```bash
npm run build
```

---

## 🌐 Deployment (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Select your GitHub repo
4. Framework: **Vite**
5. Click **Deploy**

---

## 📂 Project Structure

```
src/
├── api/
│   └── axios.js          # Axios instance with base URL
├── components/
│   ├── Topbar.jsx         # Navigation bar
│   ├── Topbar.css
│   ├── Footer.jsx         # Footer
│   ├── Footer.css
│   ├── SearchBar.jsx      # Search input
│   ├── SearchBar.css
│   ├── ConfirmDelete.jsx  # Delete confirmation modal
│   └── ConfirmDelete.css
├── pages/
│   ├── BookList.jsx       # Main books table with filters
│   ├── AddBook.jsx        # Add new book form
│   ├── EditBook.jsx       # Edit book form
│   ├── BookDetails.jsx    # Book detail view
│   ├── Settings.jsx       # App settings
│   └── Books.css          # Shared styles
├── App.jsx                # Routes configuration
├── App.css
└── index.css              # Global styles + CSS variables
```

---

## 🔌 API Endpoints (MockAPI)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Fetch all books |
| GET | `/books/:id` | Fetch single book |
| POST | `/books` | Add new book |
| PUT | `/books/:id` | Update book |
| DELETE | `/books/:id` | Delete book |

---

## 👨‍💻 Developer

**Altamash Sayyed**  
Built as part of React Assignment — 2026