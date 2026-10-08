import { Temp } from "../Temp";
import css from "./styles.module.css";
import { Background } from "../Background";
import { isDay } from "../../atoms";
import { WeatherDataContainer } from "../WeatherDataContainer";
import { useRecoilValue } from "recoil";

interface PanelProps {
  isLoading?: boolean;
}

export const Panel = ({ isLoading }: PanelProps) => {
  const borderColor = useRecoilValue(isDay) ? "day" : "night";
  const classes = [css.root, css[borderColor]].join(" ");

  return (
    <Background>
      <div className={classes}>
        {isLoading ? (
          <div className={css.loading}>Cargando clima...</div>
        ) : (
          <>
            <WeatherDataContainer />
            <Temp />
          </>
        )}
      </div>
    </Background>
  );
};
