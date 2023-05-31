import css from "./styles.module.css";
export const Panel = ({ children }: any) => {
  return (
    <>
      <div className={css.root}>{children}</div>
    </>
  );
};
