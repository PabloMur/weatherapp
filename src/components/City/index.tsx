import React from "react";
import css from "./styles.module.css";

const City: React.FC<{ name: string }> = ({ name }) => (
  <div className={css.root}>
    <p>{name}</p>
  </div>
);

export default City;
