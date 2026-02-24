import { useRecoilValue } from "recoil";
import { isDay } from "../../atoms";
import css from "./styles.module.css";

export const Footer = () => {
  const isDayValue = useRecoilValue(isDay);
  const themeClass = isDayValue ? css.day : css.night;
  const classes = [css.root, themeClass].join(" ");

  return (
    <footer className={classes}>
      <div className={css.inner}>
        <div className={css.brand}>
          <span className={css.logo}>⛅</span>
          <div>
            <p className={css.appName}>WeathApp</p>
            <p className={css.tagline}>Clima en tiempo real</p>
          </div>
        </div>

        <div className={css.stack}>
          <p className={css.stackTitle}>Hecho con</p>
          <div className={css.badges}>
            <span className={css.badge}>React 18</span>
            <span className={css.badge}>TypeScript</span>
            <span className={css.badge}>TanStack Query</span>
            <span className={css.badge}>WeatherAPI</span>
          </div>
        </div>

        <div className={css.copy}>
          <p>© {new Date().getFullYear()} Pablo Murillo</p>
          <p className={css.rights}>Todos los derechos reservados.</p>
        </div>
      </div>

      <div className={css.bottom}>
        <p>Datos provistos por <a className={css.link} href="https://www.weatherapi.com" target="_blank" rel="noreferrer">WeatherAPI</a></p>
      </div>
    </footer>
  );
};
