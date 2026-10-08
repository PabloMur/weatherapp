import { CONDITION_INFO } from "../../../lib/atmos/conditions";
import { pad2 } from "../../../lib/atmos/format";
import type { DayCell, PhaseCell } from "../../../lib/atmos/forecast";
import type { Phase } from "../../../lib/atmos/phases";
import css from "./styles.module.css";

interface ForecastPanelProps {
  phases: PhaseCell[];
  days: DayCell[];
  nowTemp: number;
  selectedDay: number;
  /** Franja elegida; null = AHORA (datos en vivo) */
  selectedPhase: Phase | null;
  onNow: () => void;
  onPhase: (phase: Phase) => void;
  onDay: (day: number) => void;
}

export function ForecastPanel({
  phases,
  days,
  nowTemp,
  selectedDay,
  selectedPhase,
  onNow,
  onPhase,
  onDay,
}: ForecastPanelProps) {
  return (
    <section className={css.panel}>
      <h2 className={css.heading}>{days[selectedDay]?.label ?? "HOY"} // POR FRANJA</h2>
      <div className={css.phases}>
        <button
          type="button"
          className={css.btn}
          aria-pressed={selectedPhase === null}
          onClick={onNow}
        >
          <span className={css.name}>AHORA</span>
          <span className={css.temp}>{nowTemp}°</span>
        </button>
        {phases.map((p) => (
          <button
            key={p.phase}
            type="button"
            className={p.past ? `${css.btn} ${css.past}` : css.btn}
            aria-pressed={selectedPhase === p.phase}
            aria-label={`${p.label} ${pad2(p.hour)}:00, ${p.temp ?? "sin dato"} grados`}
            disabled={p.temp === null}
            onClick={() => onPhase(p.phase)}
          >
            <span className={css.name}>{p.label}</span>
            <span className={css.temp}>{p.temp === null ? "--" : `${p.temp}°`}</span>
            <span className={css.hour}>{pad2(p.hour)}h</span>
          </button>
        ))}
      </div>

      <h2 className={css.heading}>PRÓXIMOS DÍAS</h2>
      <div className={css.days}>
        {days.map((d, i) => (
          <button
            key={d.label}
            type="button"
            className={`${css.btn} ${css.day}`}
            aria-pressed={selectedDay === i}
            onClick={() => onDay(i)}
          >
            <span className={css.name}>{d.label}</span>
            <span className={css.range}>
              {d.max}° <span className={css.min}>/ {d.min}°</span>
            </span>
            <span className={css.meta}>
              {CONDITION_INFO[d.condition].label} · {d.precip}%
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
