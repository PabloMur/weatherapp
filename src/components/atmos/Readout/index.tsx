import css from "./styles.module.css";

interface ReadoutProps {
  temp: number;
  title: string;
  max: number;
  min: number;
}

export function Readout({ temp, title, max, min }: ReadoutProps) {
  return (
    <section className={css.readout} aria-label="Temperatura actual">
      <p className={css.temp}>
        {temp}
        <span className={css.unit}>°C</span>
      </p>
      <div className={css.summary}>
        <p className={css.title}>{title}</p>
        <p className={css.range}>
          MÁX {max}° / MÍN {min}°
        </p>
      </div>
    </section>
  );
}
