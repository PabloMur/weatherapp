import css from "./styles.module.css";
import icon from "../../assets/vacations.png";
import lion from "../../assets/sea-lion.png";
import { isDay } from "../../atoms";
import { useRecoilValue } from "recoil";
export const CityName = ({ cityname }: any) => {
  const fontColor = useRecoilValue(isDay) ? "day" : "night";
  const imgBorderColor = useRecoilValue(isDay) ? "borderDay" : "borderNight";
  const containerClasses = [css.city, css[fontColor]].join(" ");
  const imgClasses = [css.imgCont, css[imgBorderColor]].join(" ");
  return (
    <>
      <div className={containerClasses}>
        <h2 className={css.cityname}>{cityname}</h2>
      </div>
      <div className={imgClasses}>
        <img className={css.img} src={lion} alt="sea lion" />
      </div>
      <div className={imgClasses}>
        <img className={css.img} src={icon} alt="beach" />
      </div>
    </>
  );
};
