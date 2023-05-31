import css from "./styles.module.css";
import { isDay } from "../../atoms";
import { useRecoilValue } from "recoil";
export const Footer = () => {
  const isDayNow = useRecoilValue(isDay);
  console.log(isDayNow);
  const prueba = isDayNow ? "dia" : "noche";
  const classes = [css[prueba], css.test].join(" ");
  console.log(classes);

  return (
    <div className={css.root}>
      <p className={classes}>
        Copyright © 2023 Pablo Murillo | Todos los derechos reservados.
      </p>
    </div>
  );
};
