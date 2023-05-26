import { weather } from "../../atoms";
import { useRecoilValue } from "recoil";
import css from "./styles.module.css";

export const WeatherComp = () => {
  const moment = useRecoilValue(weather);

  return (
    <div>
      <p className={css.p}>Condition: {moment}</p>
    </div>
  );
};
