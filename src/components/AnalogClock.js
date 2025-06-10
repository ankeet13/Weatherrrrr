import React, { useState, useEffect } from 'react';
import './AnalogClock.css';

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="analog-clock">
        <div
          className="hand hour"
          style={{ transform: `rotate(${(hours % 12) * 30 + minutes * 0.5}deg)` }}
        />
        <div
          className="hand minute"
          style={{ transform: `rotate(${minutes * 6}deg)` }}
        />
        <div
          className="hand second"
          style={{ transform: `rotate(${seconds * 6}deg)` }}
        />
        <div className="center-dot" />
      </div>
    </div>
  );
};

export default AnalogClock;
