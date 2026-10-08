import React from "react";
import css from "./styles.module.css";
import ForecastDay from "../ForecastDay";
import type { ForecastDay as ForecastDayType } from "../../types/weather";

interface ForecastSectionProps {
  days: ForecastDayType[];
  isDay: boolean;
}

export const ForecastSection: React.FC<ForecastSectionProps> = ({ days, isDay }) => {
  if (days.length === 0) return null;

  const borderColor = isDay ? "day" : "night";
  const classes = [css.root, css[borderColor]].join(" ");

  return (
    <section className={classes}>
      <h3 className={css.title}>Próximos 7 días</h3>
      <div className={css.strip}>
        {days.map((d) => (
          <ForecastDay
            key={d.date}
            date={d.date}
            maxTemp={d.day.maxtemp_c}
            minTemp={d.day.mintemp_c}
            conditionIcon={d.day.condition.icon}
            conditionText={d.day.condition.text}
          />
        ))}
      </div>
    </section>
  );
};
