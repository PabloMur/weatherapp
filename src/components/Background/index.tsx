import React from "react";
import css from "./styles.module.css";
import { dayMoment } from "../../atoms";
import { useRecoilValue } from "recoil";

function Morning({ children }: any) {
  return <div className={css.morning}>{children}</div>;
}

function Noon({ children }: any) {
  return <div className={css.noon}>{children}</div>;
}

function Afternoon({ children }: any) {
  return <div className={css.afternoon}>{children}</div>;
}

function Night({ children }: any) {
  return <div className={css.night}>{children}</div>;
}

function Midnight({ children }: any) {
  return <div className={css.midnight}>{children}</div>;
}

interface MomentComponents {
  [key: string]: React.ComponentType<any> | undefined;
  morning?: React.ComponentType<any>;
  noon?: React.ComponentType<any>;
  afternoon?: React.ComponentType<any>;
  night?: React.ComponentType<any>;
  midnight?: React.ComponentType<any>;
}

const momentComponents: MomentComponents = {
  morning: Morning,
  noon: Noon,
  afternoon: Afternoon,
  night: Night,
  midnight: Midnight,
};

export const Background = ({ children }: any) => {
  const moment = useRecoilValue(dayMoment);
  const MomentComponent = momentComponents[moment];

  return (
    <>
      <div className={MomentComponent ? css[moment] : css.root}>
        {MomentComponent ? (
          <MomentComponent>{children}</MomentComponent>
        ) : (
          children
        )}
      </div>
    </>
  );
};
