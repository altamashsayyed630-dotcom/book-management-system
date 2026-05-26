import { NavLink } from "react-router-dom";
import "./Topbar.css";

function Topbar() {
  return (
    <div className="topbar">

      <NavLink to="/books" end>
        Books
      </NavLink>

      <NavLink to="/books/add">
        Add Book
      </NavLink>

      <NavLink to="/books/1">
        Book Details
      </NavLink>

      <NavLink to="/books/edit/1">
        Edit Book
      </NavLink>

      <NavLink to="/settings">
        Settings
      </NavLink>

    </div>
  );
}

export default Topbar;