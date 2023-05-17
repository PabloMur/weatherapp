import css from "./styles.module.css";
import { tmpImgAtom } from "../../atoms";
import { useRecoilValue } from "recoil";
export const Temp = ({ tmp }: any) => {
  const imgUrl = useRecoilValue(tmpImgAtom);
  return (
    <>
      <div className={css.root}>
        {tmp}
        <img src={imgUrl} alt="weather icon" />
      </div>
    </>
  );
};
