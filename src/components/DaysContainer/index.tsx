import React from "react";
import css from "./styles.module.css";
import City from "../City";
import { isDay } from "../../atoms";
import { useRecoilValue } from "recoil";
import {
  useWeatherTucuman,
  useWeatherMontevideo,
  useWeatherTrenqueLauquen,
} from "../../hooks";

const CityComponent: React.FC = () => {
  const borderTopColor = useRecoilValue(isDay) ? "day" : "night";
  const classes = [css.root, css[borderTopColor]].join(" ");

  const { data: tucuman } = useWeatherTucuman();
  const { data: montevideo } = useWeatherMontevideo();
  const { data: trenqueLauquen } = useWeatherTrenqueLauquen();

  return (
    <div className={classes}>
      <City name="Tucumán" temp={tucuman?.current.temp_c ?? null} />
      <City name="Montevideo" temp={montevideo?.current.temp_c ?? null} />
      <City name="Trenque Lauquen" temp={trenqueLauquen?.current.temp_c ?? null} />
    </div>
  );
};

export default CityComponent;
