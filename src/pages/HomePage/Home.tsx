import { Panel } from "../../components/Panel";
import { Footer } from "../../components/Footer";
import { SearchBar } from "../../components/SearchBar";
import { ForecastSection } from "../../components/ForecastSection";
import { useMainWeather } from "../../hooks/useMainWeather";
import { useRecoilValue } from "recoil";
import { isDay } from "../../atoms";
import css from "./styles.module.css";

export function Home() {
  const { isLoading, isError, forecastDays } = useMainWeather();
  const isDayValue = useRecoilValue(isDay);

  return (
    <div className={css.root}>
      <SearchBar />
      {isError && (
        <div className={css.error}>
          No se pudo obtener el clima. Verificá tu conexión o la ciudad ingresada.
        </div>
      )}
      <Panel isLoading={isLoading} />
      <ForecastSection days={forecastDays} isDay={isDayValue} />
      <Footer />
    </div>
  );
}
