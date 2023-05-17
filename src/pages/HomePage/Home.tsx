import { Footer } from "../../components/Footer";
import { CitySearch } from "../../components/CitySearchForm";
import css from "./styles.module.css";
export function Home() {
  return (
    <>
      <div className={css.root}>
        <CitySearch />
      </div>
      <Footer />
    </>
  );
}
