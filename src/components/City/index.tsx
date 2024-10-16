import React from "react";
import css from "./styles.module.css";

const City: React.FC<{ name: string; temp: any }> = ({ name, temp }) => (
  <div className={css.root}>
    <p>{name}</p>
    <p className={css.temp}>{temp}</p>
  </div>
);

export default City;
