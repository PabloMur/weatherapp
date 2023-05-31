import css from "./styles.module.css";
import icon from "../../assets/vacations.png";
import lion from "../../assets/sea-lion.png";
import { cityNameAtom, isDay } from "../../atoms";
import { useRecoilValue } from "recoil";
export const CityName = () => {
  const cityName = useRecoilValue(cityNameAtom);
  const imgBorderColor = useRecoilValue(isDay) ? "borderDay" : "borderNight";
  const imgClasses = [css.imgCont, css[imgBorderColor]].join(" ");
  return (
    <div className={css.root}>
      <div className={css.city}>
        <h2 className={css.cityname}>{cityName}</h2>
      </div>
      <div className={imgClasses}>
        <img className={css.img} src={lion} alt="sea lion" />
      </div>
      <div className={imgClasses}>
        <img className={css.img} src={icon} alt="beach" />
      </div>
    </div>
  );
};
