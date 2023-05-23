import { useSetRecoilState } from "recoil";
import { APIgetWeather } from "../lib/APiCalls";
import { cityNameAtom, tmpAtom, tmpImgAtom, dayMoment } from "../atoms";
//import { mock } from "./mockResponse";

export const useGetWeather = () => {
  const citySetter = useSetRecoilState(cityNameAtom);
  const tpmSetter = useSetRecoilState(tmpAtom);
  const tmpImgSetter = useSetRecoilState(tmpImgAtom);
  const dayMommentSetter = useSetRecoilState(dayMoment);
  const putCityName = async () => {
    const result = await APIgetWeather();
    citySetter(result.location.name);
    tpmSetter(result.current.temp_c);
    tmpImgSetter(result.current.condition.icon);
    dayMommentSetter(result.current.condition.text);
  };
  return putCityName;
};
