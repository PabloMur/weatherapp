import { weather, termalSensation, humidity } from "../../atoms";
import { useRecoilValue } from "recoil";
import css from "./styles.module.css";

export const WeatherComp = () => {
  const moment = useRecoilValue(weather);
  const termalSens = useRecoilValue(termalSensation);
  const hum = useRecoilValue(humidity);

  return (
    <div>
      <p className={css.p}>Condition: {moment}</p>
      <p className={css.p}>Humidity: {hum}%</p>
      <p className={css.p}>Thermal Sensation: {termalSens}º</p>
    </div>
  );
};
