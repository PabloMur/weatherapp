import { useState } from "react";
import { useNow } from "../../../hooks";
import { formatCoords, pad2, zonedTime } from "../../../lib/atmos/format";
import { LocationSearch } from "../LocationSearch";
import css from "./styles.module.css";

export type LinkStatus = "live" | "sim" | "sync" | "offline";

const STATUS_LABEL: Record<LinkStatus, string> = {
  live: "LIVE",
  sim: "SIM",
  sync: "SYNC",
  offline: "NO-LINK",
};

interface AtmosHeaderProps {
  city: string;
  lat: number;
  lon: number;
  tzId: string;
  status: LinkStatus;
  /** Hora fija cuando se simula la franja horaria */
  simHour: number | null;
}

export function AtmosHeader({ city, lat, lon, tzId, status, simHour }: AtmosHeaderProps) {
  const now = useNow(1000);
  const [searching, setSearching] = useState(false);
  const toggleSearch = () => setSearching((open) => !open);
  const local = zonedTime(now, tzId);
  const clock =
    simHour === null ? `${pad2(local.hour)}:${pad2(local.minute)}` : `${pad2(simHour)}:00`;

  return (
    <header className={css.header}>
      <div className={css.row}>
        <span className={css.meta}>ATMOS/OS · V2.6</span>
        <span className={css.status} data-status={status}>
          <i className={css.led} aria-hidden="true" />
          {STATUS_LABEL[status]}
        </span>
      </div>

      <div className={css.row}>
        <button
          type="button"
          className={css.city}
          onClick={toggleSearch}
          aria-expanded={searching}
          title="Cambiar ubicación"
        >
          {city}
        </button>
        <time className={css.clock}>{clock}</time>
      </div>

      <div className={css.row}>
        <button
          type="button"
          className={css.locate}
          onClick={toggleSearch}
          aria-expanded={searching}
          aria-label={`${formatCoords(lat, lon)} — buscar otra ciudad`}
        >
          {formatCoords(lat, lon)}
          <svg className={css.lens} viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="6.5" cy="6.5" r="4.5" />
            <path d="M10 10l4 4" />
          </svg>
        </button>
        <span className={css.meta}>
          {local.weekday} {local.day}.{local.month}.{local.year}
        </span>
      </div>

      {searching && <LocationSearch onClose={() => setSearching(false)} />}
    </header>
  );
}
