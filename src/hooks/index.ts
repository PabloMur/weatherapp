import { useSetRecoilState } from "recoil";
import { APIgetWeather } from "../lib/APiCalls";
import {
  cityNameAtom,
  tmpAtom,
  tmpImgAtom,
  weather,
  humidity,
  termalSensation,
  isDay,
} from "../atoms";
//import { mock } from "./mockResponse";

export const useGetWeather = () => {
  const citySetter = useSetRecoilState(cityNameAtom);
  const tpmSetter = useSetRecoilState(tmpAtom);
  const tmpImgSetter = useSetRecoilState(tmpImgAtom);
  const humiditySetter = useSetRecoilState(humidity);
  const termalSensationSetter = useSetRecoilState(termalSensation);
  const weatherSetter = useSetRecoilState(weather);
  const isDaySetter = useSetRecoilState(isDay);
  const putCityName = async () => {
    const result = await APIgetWeather();
    const isDayRes = result.current.is_day;
    citySetter(result.location.name);
    tpmSetter(result.current.temp_c);
    tmpImgSetter(result.current.condition.icon);
    weatherSetter(result.current.condition.text);
    humiditySetter(result.current.humidity);
    termalSensationSetter(result.current.feelslike_c);
    isDayRes == 1 ? isDaySetter(true) : isDaySetter(false);
  };
  return putCityName;
};
