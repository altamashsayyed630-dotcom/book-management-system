import "./ConfirmDelete.css";

function ConfirmDelete({ show, onClose, onDelete }) {

  if (!show) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <div className="modal-icon">🗑️</div>

        <h2>Delete Book</h2>

        <p>
          Are you sure you want to delete this book?<br />
          This action cannot be undone.
        </p>

        <div className="modal-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={onDelete}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmDelete;