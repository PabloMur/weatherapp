import css from "./styles.module.css";
import icon from "../../assets/vacations.png";
export const CityName = ({ cityname }: any) => {
  return (
    <>
      <h1 className={css.cityname}>{cityname}</h1>
      <img className={css.img} src={icon} alt="beach" />
    </>
  );
};
