import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Books.css";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  // ── Stats ─────────────────────────────────
  const [stats, setStats] = useState({ total: 0, genres: 0, latestYear: "—" });
  const [statsLoading, setStatsLoading] = useState(true);

  // ── Dark Mode ──────────────────────────────
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") !== "light"
  );

  // ── Books Per Page ─────────────────────────
  const [booksPerPage, setBooksPerPage] = useState(
    () => localStorage.getItem("booksPerPage") || "10"
  );

  // ── Language ──────────────────────────────
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "English"
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const res = await API.get("/books");
        const books = res.data;
        const genres = [...new Set(books.map((b) => b.genre).filter(Boolean))];
        const years  = books.map((b) => parseInt(b.publicationYear)).filter((y) => !isNaN(y));
        setStats({
          total: books.length,
          genres: genres.length,
          latestYear: years.length ? Math.max(...years) : "—",
        });
      } catch {} finally { setStatsLoading(false); }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleBooksPerPage = (val) => {
    setBooksPerPage(val);
    localStorage.setItem("booksPerPage", val);
  };

  const handleLanguage = (val) => {
    setLanguage(val);
    localStorage.setItem("language", val);
  };

  return (
    <div className="page">
      <div className="settings-grid">

        {/* ── HEADER ──────────────────────── */}
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <p>Manage your Library App preferences</p>
        </div>

        {/* ── STATS ───────────────────────── */}
        <div className="settings-card">
          <div className="settings-card-title">📊 Library Statistics</div>
          {statsLoading ? (
            <div className="state-box" style={{ padding: "30px" }}>
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Books</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{stats.genres}</div>
                <div className="stat-label">Genres</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{stats.latestYear}</div>
                <div className="stat-label">Latest Year</div>
              </div>
            </div>
          )}
        </div>

        {/* ── APPEARANCE ──────────────────── */}
        <div className="settings-card">
          <div className="settings-card-title">🌙 Appearance</div>
          <div className="setting-row">
            <div>
              <p className="setting-name">Dark Mode</p>
              <p className="setting-desc">{darkMode ? "Dark theme is ON" : "Light theme is ON"}</p>
            </div>
            <button
              className={`toggle-btn ${darkMode ? "toggle-on" : "toggle-off"}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              <span className="toggle-thumb"></span>
            </button>
          </div>
        </div>





        {/* ── ABOUT APP ───────────────────── */}
        <div className="settings-card">
          <div className="settings-card-title">ℹ️ About App</div>
          <div className="about-grid">
            <div className="about-row">
              <span className="about-label">App Name</span>
              <span className="about-value">Library Management System</span>
            </div>
            <div className="about-row">
              <span className="about-label">Version</span>
              <span className="about-value about-badge">v1.0.0</span>
            </div>
            <div className="about-row">
              <span className="about-label">Developer</span>
              <span className="about-value">Altamash Sayyed</span>
            </div>
            <div className="about-row">
              <span className="about-label">Tech Stack</span>
              <span className="about-value">React · MockAPI · Cloudinary</span>
            </div>
            <div className="about-row">
              <span className="about-label">Built With</span>
              <span className="about-value">❤️ React + Vite</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Settings;