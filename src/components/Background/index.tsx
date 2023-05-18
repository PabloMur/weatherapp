import css from "./styles.module.css";

const Morning = () => {};
const Noon = () => {};
const Afternoon = () => {};
const Evening = () => {};
const Night = () => {};
const Midnight = ({ children }: any) => {
  return (
    <>
      <div className={css.night}>{children}</div>
    </>
  );
};
export const Background = ({ children }: any) => {
  return (
    <>
      <div className={css.root}>{children}</div>
    </>
  );
};
