import React, { useState, useEffect } from "react";

const FechaActual: React.FC = () => {
  const [fecha, setFecha] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setFecha(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div>
      <p>{fecha.toLocaleTimeString()}</p>
    </div>
  );
};

export default FechaActual;