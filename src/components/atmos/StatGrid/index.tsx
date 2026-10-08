import css from "./styles.module.css";

interface StatGridProps {
  feelsLike: number;
  humidity: number;
  windKph: number;
  precip: number;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function StatGrid({ feelsLike, humidity, windKph, precip }: StatGridProps) {
  // `fill` = posición del valor en una escala fija (sensación: -10..40 °C, viento: 0..60 km/h)
  const stats = [
    { label: "SENSACIÓN", value: `${feelsLike}°`, fill: (feelsLike + 10) / 50 },
    { label: "HUMEDAD", value: `${humidity}%`, fill: humidity / 100 },
    { label: "VIENTO", value: `${windKph} km/h`, fill: windKph / 60 },
    { label: "PRECIP.", value: `${precip}%`, fill: precip / 100 },
  ];

  return (
    <dl className={css.grid}>
      {stats.map((s) => (
        <div key={s.label} className={css.card}>
          <dt className={css.label}>{s.label}</dt>
          <dd className={css.value}>{s.value}</dd>
          <dd className={css.track} aria-hidden="true">
            <span className={css.fill} style={{ width: `${clamp01(s.fill) * 100}%` }} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
