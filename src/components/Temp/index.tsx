import css from "./styles.module.css";
import { tmpAtom, tmpImgAtom } from "../../atoms";
import { useRecoilValue } from "recoil";
import Time from "../Time";
import CurrentDate from "../CurrentDate";
import CityComponent from "../DaysContainer";

export const Temp = () => {
  const imgUrl = useRecoilValue(tmpImgAtom);
  const tmp = useRecoilValue(tmpAtom);
  return (
    <>
      <div className={css.root}>
        <div className={css.filter}>
          <div className={css.timeContainer}>
            <CurrentDate></CurrentDate>
            <Time />
          </div>
          <img src={imgUrl} alt="weather icon" className={css.img} />
          {tmp}º
          <div className={css.cities}>
            <CityComponent />
          </div>
        </div>
      </div>
    </>
  );
};
