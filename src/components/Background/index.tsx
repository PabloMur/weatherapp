import css from "./styles.module.css";
import { dayMoment, isDay } from "../../atoms";
import { useRecoilValue } from "recoil";

export const Background = ({ children }: any) => {
  const moment = useRecoilValue(dayMoment);
  const fontColor = useRecoilValue(isDay) ? "day" : "night";
  const classes = [css.root, css[fontColor], css[moment]].join(" ");
  return (
    <>
      <div className={classes}>{children}</div>
    </>
  );
};
