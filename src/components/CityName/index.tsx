import css from "./styles.module.css";
import icon from "../../assets/vacations.png";
import lion from "../../assets/sea-lion.png";
export const CityName = ({ cityname }: any) => {
  return (
    <>
      <div className={css.city}>
        <h2 className={css.cityname}>{cityname}</h2>
      </div>
      <div className={css.imgCont}>
        <img className={css.img} src={lion} alt="sea lion" />
      </div>
      <div className={css.imgCont}>
        <img className={css.img} src={icon} alt="beach" />
      </div>
    </>
  );
};
