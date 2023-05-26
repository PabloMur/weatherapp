import { useSetRecoilState } from "recoil";
import { APIgetWeather } from "../lib/APiCalls";
import { cityNameAtom, tmpAtom, tmpImgAtom, weather, humidity } from "../atoms";
//import { mock } from "./mockResponse";

export const useGetWeather = () => {
  const citySetter = useSetRecoilState(cityNameAtom);
  const tpmSetter = useSetRecoilState(tmpAtom);
  const tmpImgSetter = useSetRecoilState(tmpImgAtom);
  const humiditySetter = useSetRecoilState(humidity);

  const weatherSetter = useSetRecoilState(weather);
  const putCityName = async () => {
    const result = await APIgetWeather();
    citySetter(result.location.name);
    tpmSetter(result.current.temp_c);
    tmpImgSetter(result.current.condition.icon);
    weatherSetter(result.current.condition.text);
    humiditySetter(result.current.humidity);
  };
  return putCityName;
};
