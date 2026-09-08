import React, { useState, useEffect } from 'react';

interface AlertProps {
  message: string
  duration: number
  onClose: () => void
}

const Alert = ({ message, duration = 3000, onClose }: AlertProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const displayTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, duration);

    const unmountTimer = setTimeout(() => {
      if (onClose) onClose();
    }, duration + 300); 

    return () => {
      clearTimeout(displayTimer);
      clearTimeout(unmountTimer);
    };
  }, [duration, onClose]);

 
  return (
    <div className={`toast-popup ${isFadingOut ? 'fade-out' : ''}`}>
      {message}
    </div>
  );
};

export default Alert;
