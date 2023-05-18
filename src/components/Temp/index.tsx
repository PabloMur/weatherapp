import css from "./styles.module.css";
import { tmpImgAtom } from "../../atoms";
import { useRecoilValue } from "recoil";
import Time from "../Time";
import CityComponent from "../DaysContainer";
export const Temp = ({ tmp }: any) => {
  const imgUrl = useRecoilValue(tmpImgAtom);
  return (
    <>
      <div className={css.root}>
        <div className={css.filter}>
          <div className={css.timeContainer}>
            <Time />
          </div>
          <img src={imgUrl} alt="weather icon" className={css.img} />
          {tmp}
          <div className={css.days}>
            <CityComponent></CityComponent>
          </div>
        </div>
      </div>
    </>
  );
};
