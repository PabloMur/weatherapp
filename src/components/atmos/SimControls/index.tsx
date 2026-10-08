import { type Condition, CONDITIONS } from "../../../lib/atmos/conditions";
import { type Phase, PHASES } from "../../../lib/atmos/phases";
import css from "./styles.module.css";

interface SimControlsProps {
  /** Franja simulada; null = AUTO */
  phase: Phase | null;
  /** Condición que se está mostrando (real o simulada) */
  condition: Condition;
  onAuto: () => void;
  onPhase: (phase: Phase) => void;
  onCondition: (condition: Condition) => void;
}

export function SimControls({ phase, condition, onAuto, onPhase, onCondition }: SimControlsProps) {
  return (
    <section className={css.sim}>
      <h2 className={css.heading}>SIM // HORARIO</h2>
      <div className={css.phases}>
        <button type="button" className={css.btn} aria-pressed={phase === null} onClick={onAuto}>
          AUTO
        </button>
        {PHASES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={css.btn}
            aria-pressed={phase === p.id}
            onClick={() => onPhase(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <h2 className={css.heading}>SIM // CONDICIÓN</h2>
      <div className={css.conditions}>
        {CONDITIONS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`${css.btn} ${css.tall}`}
            aria-pressed={condition === c.id}
            onClick={() => onCondition(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
    </section>
  );
}
