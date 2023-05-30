import React, { useState, useEffect } from "react";
import css from "./styles.module.css";

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
    <div className={css.root}>
      <p>{fechaActual}</p>
    </div>
  );
};

export default FechaActual;
