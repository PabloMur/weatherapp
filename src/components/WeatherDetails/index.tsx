import { weather, termalSensation, humidity, isDay } from "../../atoms";
import { useRecoilValue } from "recoil";
import css from "./styles.module.css";

export const WeatherInfo = () => {
  const moment = useRecoilValue(weather);
  const termalSens = useRecoilValue(termalSensation);
  const hum = useRecoilValue(humidity);
  const borderTopColor = useRecoilValue(isDay)
    ? "borderTopDay"
    : "borderTopNight";
  const classes = [css.root, css[borderTopColor]].join(" ");
  return (
    <div className={classes}>
      <p className={css.p}>Condition: {moment}</p>
      <p className={css.p}>Humidity: {hum}%</p>
      <p className={css.p}>Thermal Sensation: {termalSens}º</p>
    </div>
  );
};
