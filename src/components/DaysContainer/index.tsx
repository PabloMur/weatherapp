import React from "react";
import css from "./styles.module.css";
import City from "../City";

const CityComponent: React.FC = () => {
  return (
    <div className={css.root}>
      <City name="Tucumán" />
      <City name="Montevideo" />
      <City name="Trenque Lauquen" />
    </div>
  );
};

export default CityComponent;
