import { useSetRecoilState } from "recoil";
import {
  APIgetWeather,
  APIgetWeatherMontevideo,
  APIgetWeatherTrenqueLauquen,
  APIgetWeatherTucuman,
} from "../lib/APiCalls";
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

export const useGetWeatherTucuman = () => {
  return async () => {
    try {
      const weatherTucuman = await APIgetWeatherTucuman();
      if (weatherTucuman) {
        console.log("Datos del clima de Tucumán:", weatherTucuman);
        return weatherTucuman.current.temp_c;
      } else {
        console.error("No se pudo obtener el clima de Tucumán");
        return null;
      }
    } catch (error) {
      console.error("Error al llamar a la API:", error);
      return null;
    }
  };
};

export const useGetWeatherTrenqueLauquen = () => {
  return async () => {
    try {
      const weatherTrenqueLauquen = await APIgetWeatherTrenqueLauquen();
      if (weatherTrenqueLauquen) {
        console.log(
          "Datos del clima de Trenque Lauquen:",
          weatherTrenqueLauquen
        );
        return weatherTrenqueLauquen.current.temp_c;
      } else {
        console.error("No se pudo obtener el clima de Trenque Lauquen");
        return null;
      }
    } catch (error) {
      console.error("Error al llamar a la API de Trenque Lauquen:", error);
      return null;
    }
  };
};

export const useGetWeatherMontevideo = () => {
  return async () => {
    try {
      const weatherMontevideo = await APIgetWeatherMontevideo();
      if (weatherMontevideo) {
        console.log("Datos del clima de Montevideo:", weatherMontevideo);
        return weatherMontevideo.current.temp_c;
      } else {
        console.error("No se pudo obtener el clima de Montevideo");
        return null;
      }
    } catch (error) {
      console.error("Error al llamar a la API de Montevideo:", error);
      return null;
    }
  };
};
