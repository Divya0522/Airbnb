import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="airbnb-toast-container" role="status" aria-live="polite">
      <div className="airbnb-toast">
        {message}
      </div>
    </div>
  );
};

export default Toast;
