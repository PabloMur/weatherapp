import css from "./styles.module.css";
import { dayMoment } from "../../atoms";
import { useRecoilValue } from "recoil";

const Morning = ({ children }: any) => {
  return (
    <>
      <div className={css.morning}>{children}</div>
    </>
  );
};
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
  const moment = useRecoilValue(dayMoment);
  console.log(moment);

  if (moment == "Sunny" || moment == "Partly cloudy") {
    return (
      <>
        <Morning>{children}</Morning>
      </>
    );
  } else {
    return (
      <>
        <div className={css.root}>{children}</div>
      </>
    );
  }
};
