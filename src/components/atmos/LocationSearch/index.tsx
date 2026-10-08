import { type KeyboardEvent, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { selectedCityAtom } from "../../../atoms";
import { useSearchCities } from "../../../hooks";
import type { SearchResult } from "../../../types/weather";
import css from "./styles.module.css";

interface LocationSearchProps {
  onClose: () => void;
}

export function LocationSearch({ onClose }: LocationSearchProps) {
  const setSelectedCity = useSetRecoilState(selectedCityAtom);
  const [value, setValue] = useState("");
  const [debounced, setDebounced] = useState("");
  const [focused, setFocused] = useState(-1);
  const [geo, setGeo] = useState<"idle" | "locating" | "error">("idle");

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value.trim()), 300);
    return () => clearTimeout(timer);
  }, [value]);

  const { data = [], isFetching, isError } = useSearchCities(debounced);
  const suggestions = debounced.length >= 2 ? data : [];

  useEffect(() => setFocused(-1), [debounced]);

  const select = (city: SearchResult) => {
    setSelectedCity(`${city.lat},${city.lon}`);
    onClose();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown" && suggestions.length) {
      e.preventDefault();
      setFocused((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp" && suggestions.length) {
      e.preventDefault();
      setFocused((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && suggestions.length) {
      select(suggestions[Math.max(focused, 0)]);
    }
  };

  const geolocate = () => {
    if (!navigator.geolocation) {
      setGeo("error");
      return;
    }
    setGeo("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setSelectedCity(`${pos.coords.latitude},${pos.coords.longitude}`);
        onClose();
      },
      () => setGeo("error"),
    );
  };

  let note: string | null = null;
  if (geo === "locating") note = "TRIANGULANDO POSICIÓN…";
  else if (geo === "error") note = "! UBICACIÓN NO DISPONIBLE";
  else if (isError) note = "! SIN ENLACE CON LA API";
  else if (debounced.length >= 2 && !isFetching && suggestions.length === 0) {
    note = "SIN RESULTADOS";
  }

  return (
    <div className={css.root} role="search">
      <div className={css.prompt}>
        <span className={css.ps1} aria-hidden="true">
          LOC&gt;
        </span>
        <input
          autoFocus
          className={css.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="BUSCAR CIUDAD"
          aria-label="Buscar ciudad"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={suggestions.length > 0}
          aria-controls="atmos-loc-list"
          aria-activedescendant={focused >= 0 ? `atmos-loc-${focused}` : undefined}
        />
        {isFetching && (
          <span className={css.busy} aria-hidden="true">
            ···
          </span>
        )}
        <button type="button" className={css.action} onClick={geolocate}>
          ◎ GPS
        </button>
        <button
          type="button"
          className={css.action}
          onClick={onClose}
          aria-label="Cerrar búsqueda"
        >
          ✕
        </button>
      </div>

      {note && <p className={css.note}>{note}</p>}

      {suggestions.length > 0 && (
        <ul id="atmos-loc-list" className={css.list} role="listbox">
          {suggestions.map((s, i) => (
            <li
              key={s.id}
              id={`atmos-loc-${i}`}
              role="option"
              aria-selected={i === focused}
              className={css.option}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => select(s)}
            >
              <span className={css.name}>{s.name}</span>
              <span className={css.region}>
                {s.region && `${s.region}, `}
                {s.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
