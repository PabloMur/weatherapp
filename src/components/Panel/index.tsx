import { Temp } from "../Temp";
import css from "./styles.module.css";
import { Background } from "../Background";
import { isDay } from "../../atoms";
import { WeatherDataContainer } from "../WeatherDataContainer";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { useGetWeather } from "../../hooks";
export const Panel = () => {
  const borderColor = useRecoilValue(isDay) ? "day" : "night";
  const classes = [css.root, css[borderColor]].join(" ");
  const getWeather = useGetWeather();
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <>
      <Background>
        <div className={classes}>
          <WeatherDataContainer />
          <Temp />
        </div>
      </Background>
    </>
  );
};
