import React from "react";
import css from "./styles.module.css";
import City from "../City";
import { isDay } from "../../atoms";
import { useRecoilValue } from "recoil";

const CityComponent: React.FC = () => {
  const borderTopColor = useRecoilValue(isDay) ? "day" : "night";
  const classes = [css.root, css[borderTopColor]].join(" ");
  return (
    <div className={classes}>
      <City name="Tucumán" />
      <City name="Montevideo" />
      <City name="Trenque Lauquen" />
    </div>
  );
};

export default CityComponent;
