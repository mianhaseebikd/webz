import React, { useState, useEffect } from 'react';

function AnimatedNumber({ value, visible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (visible) {
      let start = 0;
      const duration = 1500; // 2 seconds
      const increment = value / (duration / 16); // roughly 60fps
      const interval = setInterval(() => {
        start += increment;
        if (start >= value) {
          start = value;
          clearInterval(interval);
        }
        setCount(Math.round(start));
      }, 16);
    }
  }, [visible, value]);

  return <span className="progress-value">{count}%</span>;
}
export default AnimatedNumber;