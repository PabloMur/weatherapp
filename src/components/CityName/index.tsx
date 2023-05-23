import css from "./styles.module.css";
export const CityName = ({ cityname }: any) => {
  return <h1 className={css.cityname}>{cityname}</h1>;
};
