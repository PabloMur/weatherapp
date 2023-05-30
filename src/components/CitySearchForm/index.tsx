import css from "./styles.module.css";
import { useGetWeather } from "../../hooks";
import { cityNameAtom, tmpAtom } from "../../atoms";
import { CityName } from "../CityName";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { Temp } from "../Temp";
import { Background } from "../Background";
import { WeatherComp } from "../Weather";

export function CitySearch() {
  const getWeather = useGetWeather();
  const tmp = useRecoilValue(tmpAtom);
  useEffect(() => {
    getWeather();
  }, []);
  const cityName = useRecoilValue(cityNameAtom);
  return (
    <>
      <Background>
        <div className={css.root}>
          <div className={css.cityNameContainer}>
            <div className={css.welcome}>
              <h1 className={css.welcomeTitle}>Welcome Pol:</h1>
            </div>
            <div className={css.city}>
              <CityName cityname={cityName} />
            </div>
            <div className={css.info}>
              <WeatherComp />
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
