import { Routes, Route, Navigate } from "react-router-dom";

import Topbar from "./components/Topbar";
import Footer from "./components/Footer";

import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import BookDetails from "./pages/BookDetails";
import Settings from "./pages/Settings";

import "./pages/Books.css";

function App() {
  return (
    <div className="app-layout">

      {/* Top Navigation */}
      <Topbar />

      {/* Main Content */}
      <main className="content">

        <Routes>

          <Route path="/" element={<Navigate to="/books" />} />

          <Route path="/books" element={<BookList />} />

          <Route path="/books/add" element={<AddBook />} />

          <Route path="/books/edit/:id" element={<EditBook />} />

          <Route path="/books/:id" element={<BookDetails />} />

          <Route path="/settings" element={<Settings />} />

        </Routes>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;