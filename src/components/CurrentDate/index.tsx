import React, { useState, useEffect } from "react";

const Time: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div>
      <p>{time.toDateString()}</p>
    </div>
  );
};

export default Time;
