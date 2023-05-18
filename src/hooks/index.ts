import { useSetRecoilState } from "recoil";
import { APIgetWeather } from "../lib/APiCalls";
import { cityNameAtom, tmpAtom, tmpImgAtom } from "../atoms";
import { mock } from "./mockResponse";

export const useGetWeather = () => {
  const citySetter = useSetRecoilState(cityNameAtom);
  const tpmSetter = useSetRecoilState(tmpAtom);
  const tmpImgSetter = useSetRecoilState(tmpImgAtom);
  const putCityName = async () => {
    const result = mock; //await APIgetWeather();
    console.log(result);
    citySetter(result.location.name);
    tpmSetter(result.current.temp_c);
    tmpImgSetter(result.current.condition.icon);
  };
  return putCityName;
};
