import React from "react";
import css from "./styles.module.css";

interface ForecastDayProps {
  date: string;
  maxTemp: number;
  minTemp: number;
  conditionIcon: string;
  conditionText: string;
}

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const ForecastDay: React.FC<ForecastDayProps> = ({
  date,
  maxTemp,
  minTemp,
  conditionIcon,
  conditionText,
}) => {
  const dayName = DAYS[new Date(date + "T12:00:00").getDay()];

  return (
    <div className={css.root}>
      <span className={css.day}>{dayName}</span>
      <img
        src={conditionIcon}
        alt={conditionText}
        className={css.icon}
        title={conditionText}
      />
      <span className={css.max}>{Math.round(maxTemp)}°</span>
      <span className={css.min}>{Math.round(minTemp)}°</span>
    </div>
  );
};

export default ForecastDay;
