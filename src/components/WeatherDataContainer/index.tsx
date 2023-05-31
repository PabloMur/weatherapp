import css from "./styles.module.css";
import { useGetWeather } from "../../hooks";
import { cityNameAtom, tmpAtom, isDay } from "../../atoms";
import { CityName } from "../CityName";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { Temp } from "../Temp";
import { Background } from "../Background";
import { WeatherInfo } from "../Weather";

export function WeatherDataContainer() {
  const getWeather = useGetWeather();
  const tmp = useRecoilValue(tmpAtom);
  const isDayAtom = useRecoilValue(isDay) ? "day" : "night";
  useEffect(() => {
    getWeather();
  }, []);
  const cityName = useRecoilValue(cityNameAtom);
  const classes = [css.root, css[isDayAtom]].join(" ");
  return (
    <>
      <Background>
        <div className={classes}>
          <div className={css.cityNameContainer}>
            <div className={css.welcome}>
              <h1 className={css.welcomeTitle}>Welcome Pol:</h1>
            </div>
            <div className={css.city}>
              <CityName cityname={cityName} />
            </div>
            <div className={css.info}>
              <WeatherInfo />
            </div>
          </div>
          <div className={css.tmpContainer}>
            <Temp tmp={tmp} />
          </div>
        </div>
      </Background>
    </>
  );
}
