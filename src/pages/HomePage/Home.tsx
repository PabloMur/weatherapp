import { Footer } from "../../components/Footer";
import { WeatherDataContainer } from "../../components/WeatherDataContainer";
import css from "./styles.module.css";
export function Home() {
  return (
    <>
      <div className={css.root}>
        <WeatherDataContainer />
      </div>
      <Footer />
    </>
  );
}
