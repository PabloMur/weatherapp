import css from "./styles.module.css";
import { useGetWeather } from "../../hooks";
import { cityNameAtom, tmpAtom } from "../../atoms";
import { CityName } from "../CityName";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { Temp } from "../Temp";
import { Background } from "../Background";
import CurrentDate from "../CurrentDate";
export function CitySearch() {
  const putName = useGetWeather();
  const tmp = useRecoilValue(tmpAtom);
  useEffect(() => {
    putName();
  }, []);
  const cityName = useRecoilValue(cityNameAtom);
  return (
    <>
      <Background>
        <div className={css.root}>
          <div className={css.cityNameContainer}>
            <h1>Welcome Pol:</h1>
            <CurrentDate />
            <CityName cityname={cityName} />
          </div>
          <div className={css.tmpContainer}>
            <Temp tmp={tmp} />
          </div>
        </div>
      </Background>
    </>
  );
}
