import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedCityAtom, isDay } from "../../atoms";
import { useSearchCities } from "../../hooks";
import css from "./styles.module.css";

export const SearchBar: React.FC = () => {
  const isDayValue = useRecoilValue(isDay);
  const setSelectedCity = useSetRecoilState(selectedCityAtom);

  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [geoError, setGeoError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce 300ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(inputValue), 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const { data: suggestions = [], isFetching } = useSearchCities(debouncedValue);

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Abrir dropdown cuando hay sugerencias
  useEffect(() => {
    setIsOpen(suggestions.length > 0 && debouncedValue.length >= 2);
    setFocusedIndex(-1);
  }, [suggestions, debouncedValue]);

  const selectCity = (lat: number, lon: number, name: string) => {
    setSelectedCity(`${lat},${lon}`);
    setInputValue(name);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      const s = suggestions[focusedIndex];
      selectCity(s.lat, s.lon, `${s.name}, ${s.country}`);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleGeolocate = () => {
    setGeoError(false);
    if (!navigator.geolocation) {
      setGeoError(true);
      return;
    }
    setInputValue("Localizando...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const q = `${pos.coords.latitude},${pos.coords.longitude}`;
        setSelectedCity(q);
        setInputValue("");
      },
      () => {
        setGeoError(true);
        setInputValue("");
      }
    );
  };

  const borderClass = isDayValue ? css.day : css.night;
  const wrapperClasses = [css.wrapper, borderClass].join(" ");

  return (
    <div className={css.container} ref={containerRef}>
      <div className={wrapperClasses}>
        <input
          type="text"
          className={css.input}
          placeholder="Buscar ciudad..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          aria-label="Buscar ciudad"
          aria-autocomplete="list"
          aria-expanded={isOpen}
        />
        {isFetching && <span className={css.spinner}>⟳</span>}
        <button
          className={css.geoBtn}
          onClick={handleGeolocate}
          title="Usar mi ubicación"
          aria-label="Usar mi ubicación"
        >
          ◎
        </button>
      </div>

      {geoError && (
        <p className={css.geoError}>No se pudo acceder a la ubicación.</p>
      )}

      {isOpen && (
        <ul className={css.dropdown} role="listbox">
          {suggestions.map((s, i) => (
            <li
              key={s.id}
              role="option"
              aria-selected={i === focusedIndex}
              className={[css.option, i === focusedIndex ? css.focused : ""].join(" ")}
              onMouseDown={() => selectCity(s.lat, s.lon, `${s.name}, ${s.country}`)}
            >
              <span className={css.cityName}>{s.name}</span>
              <span className={css.region}>
                {s.region && `${s.region}, `}{s.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
