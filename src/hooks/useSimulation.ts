import { useSearchParams } from "react-router-dom";
import { type Condition, isCondition } from "../lib/atmos/conditions";
import { type Phase, isPhase } from "../lib/atmos/phases";

/**
 * Estado del simulador guardado en la URL (?hora=ocaso&cond=tormenta),
 * así una simulación se puede compartir o recargar.
 */
export function useSimulation() {
  const [params, setParams] = useSearchParams();

  const hora = params.get("hora");
  const cond = params.get("cond");
  const phase: Phase | null = isPhase(hora) ? hora : null;
  const condition: Condition | null = isCondition(cond) ? cond : null;

  const update = (key: "hora" | "cond", value: string | null) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );

  return {
    phase,
    condition,
    setPhase: (value: Phase | null) => update("hora", value),
    setCondition: (value: Condition | null) => update("cond", value),
    reset: () => setParams({}, { replace: true }),
  };
}
