import React from "react";
import css from "./styles.module.css";
import { Spinner } from "../ui/Spinner";

const City: React.FC<{ name: string; temp: any }> = ({ name, temp }) => (
  <div className={css.root}>
    <p>{name}</p>
    {temp ? <p className={css.temp}>{temp}</p> : <Spinner></Spinner>}
  </div>
);

export default City;
