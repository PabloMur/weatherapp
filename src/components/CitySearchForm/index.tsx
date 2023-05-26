import css from "./styles.module.css";
import { useGetWeather } from "../../hooks";
import { cityNameAtom, tmpAtom } from "../../atoms";
import { CityName } from "../CityName";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { Temp } from "../Temp";
import { Background } from "../Background";
import { WeatherComp } from "../Weather";
import { Humidity } from "../Humidity";

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
            <h1>Welcome Pol:</h1>
            <CityName cityname={cityName} />
            <WeatherComp />
            <Humidity />
          </div>
          <div className={css.tmpContainer}>
            <Temp tmp={tmp} />
          </div>
        </div>
      </Background>
    </>
  );
}
