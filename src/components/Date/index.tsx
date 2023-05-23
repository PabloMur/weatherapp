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

  const fechaActual = fecha.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <p>{fechaActual}</p>
    </div>
  );
};

export default FechaActual;
