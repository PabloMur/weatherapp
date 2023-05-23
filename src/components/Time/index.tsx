import React, { useState, useEffect } from "react";
import { asignarMomentoDelDia } from "../../lib/FranjaHoraria";
import css from "./styles.module.css";
import { dayMoment } from "../../atoms";
import { useSetRecoilState } from "recoil";

const Time: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const setMomentoDelDia = useSetRecoilState(dayMoment);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    const hours = time.getHours();
    const nuevoMomentoDelDia = asignarMomentoDelDia(hours);
    setMomentoDelDia(nuevoMomentoDelDia);
  }, [time]);

  const hours = time.getHours();
  const minutes = time.getMinutes();

  return (
    <div>
      <p className={css.time}>
        {hours}:{minutes < 10 ? `0${minutes}` : minutes}
      </p>
    </div>
  );
};

export default Time;
