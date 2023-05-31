import { useRecoilValue } from "recoil";
import { isDay } from "../../atoms";
import css from "./styles.module.css";

export const Welcome = () => {
  const name = "Pol";
  const borderColor = useRecoilValue(isDay) ? "day" : "night";
  const classes = [css.welcome, css[borderColor]].join(" ");
  return (
    <>
      <div className={classes}>
        <h1>Welcome: {name}</h1>
      </div>
    </>
  );
};
