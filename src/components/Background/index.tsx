import css from "./styles.module.css";

export const Background = ({ children }: any) => {
  return (
    <>
      <div className={css.root}>{children}</div>
    </>
  );
};
