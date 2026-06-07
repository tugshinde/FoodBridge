import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ expiryTime }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const expiry = new Date(expiryTime);
      const diffMs = expiry - now;

      if (diffMs <= 0) {
        setIsExpired(true);
        setIsUrgent(false);
        setTimeLeft('Expired');
        return;
      }

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

      // If less than 2 hours left, mark as urgent
      if (hours < 2) {
        setIsUrgent(true);
      } else {
        setIsUrgent(false);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [expiryTime]);

  if (isExpired) {
    return (
      <span className="fb-badge" style={{ backgroundColor: '#dc3545', color: 'white' }}>
        <i className="bi bi-exclamation-circle me-1"></i>Expired
      </span>
    );
  }

  return (
    <span className={`fb-badge ${isUrgent ? 'fb-badge-warning' : 'fb-badge-info'}`} style={isUrgent ? { backgroundColor: '#ff9800', color: 'white' } : { backgroundColor: '#17a2b8', color: 'white' }}>
      <i className="bi bi-stopwatch me-1"></i>
      {timeLeft} left
    </span>
  );
};

export default CountdownTimer;
