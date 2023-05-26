import css from "./styles.module.css";
import icon from "../../assets/vacations.png";
export const CityName = ({ cityname }: any) => {
  return (
    <>
      <h2 className={css.cityname}>{cityname}</h2>
      <img className={css.img} src={icon} alt="beach" />
    </>
  );
};
