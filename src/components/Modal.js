// src/components/Modal.js
import React, { useState } from 'react';

function Modal({ closeModal }) {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    alert(`Password reset link sent to ${email}`);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Forgot Password</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button onClick={handleReset}>Reset Password</button>
      </div>
    </div>
  );
}

export default Modal;
