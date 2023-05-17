import { atom } from "recoil";

export const cityNameAtom = atom({
  key: "cityName",
  default: "Mar del Plata",
});

export const tmpAtom = atom({
  key: "tmpAtom",
  default: 0,
});

export const tmpImgAtom = atom({
  key: "tmpImgAtom",
  default: "",
});