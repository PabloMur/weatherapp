import { useEffect, useState } from "react";

/** Timestamp actual que se refresca cada `intervalMs` */
export function useNow(intervalMs: number) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
