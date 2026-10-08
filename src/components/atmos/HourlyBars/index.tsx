import type { HourPoint } from "../../../lib/atmos/station";
import css from "./styles.module.css";

// Alto de la barra en % del slot (el alto del slot lo define el CSS)
const MIN_BAR = 12.5;
const MAX_BAR = 100;

interface HourlyBarsProps {
  hours: HourPoint[];
}

export function HourlyBars({ hours }: HourlyBarsProps) {
  const temps = hours.map((h) => h.temp);
  const lo = Math.min(...temps);
  const hi = Math.max(...temps);
  // Escala relativa al rango visible, como en un ecualizador; con un rango
  // mínimo de 2° (centrado) para que una diferencia de 1° no parezca un salto enorme
  const span = Math.max(hi - lo, 2);
  const base = (hi + lo) / 2 - span / 2;
  const heightOf = (t: number) =>
    `${MIN_BAR + ((t - base) / span) * (MAX_BAR - MIN_BAR)}%`;

  return (
    <section className={css.section}>
      <h2 className={css.heading}>PRÓXIMAS HORAS</h2>
      <ol className={css.bars}>
        {hours.map((h, i) => (
          <li key={h.label} className={css.col}>
            <span className={css.srOnly}>
              {i === 0 ? "Ahora" : h.label}: {h.temp} grados
            </span>
            <span className={css.temp} aria-hidden="true">
              {h.temp}°
            </span>
            <span className={css.slot} aria-hidden="true">
              <span
                className={i === 0 ? `${css.bar} ${css.now}` : css.bar}
                style={{ height: heightOf(h.temp) }}
              />
            </span>
            <span className={css.hour} aria-hidden="true">
              {h.label}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
