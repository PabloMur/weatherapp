import css from "./styles.module.css";

const LINES = ["INICIANDO SKY.CAM-01", "CALIBRANDO SENSORES", "ESTABLECIENDO ENLACE"];

export function BootScreen() {
  return (
    <div className={css.boot} role="status" aria-live="polite">
      <p className={css.brand}>ATMOS/OS · V2.6</p>
      {LINES.map((line, i) => (
        <p key={line} className={css.line} style={{ animationDelay: `${i * 0.35}s` }}>
          &gt; {line}
          {i === LINES.length - 1 && <span className={css.cursor}>▌</span>}
        </p>
      ))}
    </div>
  );
}
