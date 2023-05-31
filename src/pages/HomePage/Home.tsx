import { Panel } from "../../components/Panel";
import { Footer } from "../../components/Footer";
import css from "./styles.module.css";
export function Home() {
  return (
    <>
      <div className={css.root}>
        <Panel />
      </div>
      <Footer />
    </>
  );
}
