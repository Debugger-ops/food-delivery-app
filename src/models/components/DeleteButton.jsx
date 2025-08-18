import { useState } from "react";
import './deletebutton.css'; // Import the external CSS file

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="delete-overlay">
        <div className="delete-dialog">
          <div>Are you sure you want to delete?</div>
          <div className="button-group">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              type="button"
              className="confirm-button"
            >
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setShowConfirm(true)}>
      {label}
    </button>
  );
}
