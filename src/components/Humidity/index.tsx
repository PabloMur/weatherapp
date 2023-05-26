import { humidity } from "../../atoms";
import { useRecoilValue } from "recoil";
import css from "./styles.module.css";
export const Humidity = () => {
  const hum = useRecoilValue(humidity);
  return (
    <>
      <div>
        <p className={css.p}>Humedad: {hum}</p>
      </div>
    </>
  );
};
