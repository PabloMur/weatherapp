import css from "./styles.module.css";
import { dayMoment } from "../../atoms";
import { useRecoilValue } from "recoil";

const momentComponents: any = {
  morning: "morning",
  noon: "noon",
  afternoon: "afternoon",
  night: "night",
  midnight: "midnight",
};

export const Background = ({ children }: any) => {
  const moment = useRecoilValue(dayMoment);
  const MomentComponent = momentComponents[moment];
  const classes = [css.root, css[MomentComponent]].join(" ");

  return (
    <>
      <div className={classes}>{children}</div>
    </>
  );
};
