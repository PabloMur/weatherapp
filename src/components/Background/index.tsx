import css from "./styles.module.css";

// const Morning = ({ children }: any) => {
//   return (
//     <>
//       <div className={css.night}>{children}</div>
//     </>
//   );
// };
// const Noon = ({ children }: any) => {
//   return (
//     <>
//       <div className={css.night}>{children}</div>
//     </>
//   );
// };
// const Afternoon = ({ children }: any) => {
//   return (
//     <>
//       <div className={css.night}>{children}</div>
//     </>
//   );
// };
// const Evening = ({ children }: any) => {
//   return (
//     <>
//       <div className={css.night}>{children}</div>
//     </>
//   );
// };
// const Night = ({ children }: any) => {
//   return (
//     <>
//       <div className={css.night}>{children}</div>
//     </>
//   );
// };
// const Midnight = ({ children }: any) => {
//   return (
//     <>
//       <div className={css.night}>{children}</div>
//     </>
//   );
// };
export const Background = ({ children }: any) => {
  return (
    <>
      <div className={css.root}>{children}</div>
    </>
  );
};
