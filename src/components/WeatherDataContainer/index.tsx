import css from "./styles.module.css";
import { isDay } from "../../atoms";
import { CityName } from "../MainCityName";
import { Welcome } from "../Welcome";
import { useRecoilValue } from "recoil";
import { WeatherInfo } from "../WeatherDetails";

export function WeatherDataContainer() {
  const isDayAtom = useRecoilValue(isDay) ? "day" : "night";

  const classes = [css.root, css[isDayAtom]].join(" ");
  return (
    <>
      <div className={classes}>
        <Welcome />
        <CityName />
        <WeatherInfo />
      </div>
    </>
  );
}
