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

export const dayMoment = atom({
  key: "dayMoment",
  default: "",
});

export const weather = atom({
  key: "weather",
  default: "",
});

export const humidity = atom({
  key: "humidity",
  default: 0,
});

export const termalSensation = atom({
  key: "termalSensation",
  default: "",
});

export const isDay = atom({
  key: "isDay",
  default: true,
});
