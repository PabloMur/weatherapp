import React, { useEffect, useState } from "react";
import css from "./styles.module.css";
import City from "../City";
import { isDay } from "../../atoms";
import { useRecoilValue } from "recoil";
import {
  useGetWeatherTucuman,
  useGetWeatherMontevideo,
  useGetWeatherTrenqueLauquen,
} from "../../hooks";

const CityComponent: React.FC = () => {
  const borderTopColor = useRecoilValue(isDay) ? "day" : "night";
  const classes = [css.root, css[borderTopColor]].join(" ");

  // Estados para almacenar las temperaturas de las tres ciudades
  const [tucumanTemp, setTucumanTemp] = useState<number | null>(null);
  const [montevideoTemp, setMontevideoTemp] = useState<number | null>(null);
  const [trenqueLauquenTemp, setTrenqueLauquenTemp] = useState<number | null>(
    null
  );

  const getTucumanTemp = useGetWeatherTucuman();
  const getMontevideoTemp = useGetWeatherMontevideo();
  const getTrenqueLauquenTemp = useGetWeatherTrenqueLauquen();

  // useEffect para obtener la temperatura de Tucumán
  useEffect(() => {
    const fetchTucumanTemp = async () => {
      try {
        const tucTemp = await getTucumanTemp();
        setTucumanTemp(tucTemp);
      } catch (error) {
        console.error("Error al obtener la temperatura de Tucumán:", error);
      }
    };

    fetchTucumanTemp();
  }, [getTucumanTemp]);

  // useEffect para obtener la temperatura de Montevideo
  useEffect(() => {
    const fetchMontevideoTemp = async () => {
      try {
        const monTemp = await getMontevideoTemp();
        setMontevideoTemp(monTemp);
      } catch (error) {
        console.error("Error al obtener la temperatura de Montevideo:", error);
      }
    };

    fetchMontevideoTemp();
  }, [getMontevideoTemp]);

  // useEffect para obtener la temperatura de Trenque Lauquen
  useEffect(() => {
    const fetchTrenqueLauquenTemp = async () => {
      try {
        const trenTemp = await getTrenqueLauquenTemp();
        setTrenqueLauquenTemp(trenTemp);
      } catch (error) {
        console.error(
          "Error al obtener la temperatura de Trenque Lauquen:",
          error
        );
      }
    };

    fetchTrenqueLauquenTemp();
  }, [getTrenqueLauquenTemp]);

  return (
    <div className={classes}>
      <City name="Tucumán" temp={tucumanTemp} />
      <City name="Montevideo" temp={montevideoTemp} />
      <City name="Trenque Lauquen" temp={trenqueLauquenTemp} />
    </div>
  );
};

export default CityComponent;
