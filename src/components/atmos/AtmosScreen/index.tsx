import { useMemo } from "react";
import { useForecast, useMediaQuery, useNow, useSimulation } from "../../../hooks";
import type { Condition } from "../../../lib/atmos/conditions";
import type { Phase } from "../../../lib/atmos/phases";
import {
  FALLBACK_STATION,
  HOURS_SHOWN,
  readStation,
  stationFromForecast,
} from "../../../lib/atmos/station";
import { AtmosHeader, type LinkStatus } from "../AtmosHeader";
import { BootScreen } from "../BootScreen";
import { HourlyBars } from "../HourlyBars";
import { Readout } from "../Readout";
import { SimControls } from "../SimControls";
import { SkyCam } from "../SkyCam";
import { StatGrid } from "../StatGrid";
import css from "./styles.module.css";

// Debe coincidir con el breakpoint de escritorio de los styles.module.css
const DESKTOP_QUERY = "(min-width: 1024px)";

export function AtmosScreen() {
  const forecast = useForecast();
  const sim = useSimulation();
  const now = useNow(30_000);
  const wide = useMediaQuery(DESKTOP_QUERY);

  const station = useMemo(
    () => (forecast.data ? stationFromForecast(forecast.data) : FALLBACK_STATION),
    [forecast.data],
  );
  const offline = !forecast.data && forecast.isError;
  const booting = !forecast.data && !forecast.isError;
  const snap = readStation(station, now, sim, !offline);

  let status: LinkStatus = "live";
  if (offline) status = "offline";
  else if (forecast.isPlaceholderData) status = "sync";
  else if (sim.phase || sim.condition) status = "sim";

  const handlePhase = (phase: Phase) => sim.setPhase(phase === sim.phase ? null : phase);
  // Volver a elegir la condición real (o la ya simulada) apaga la simulación
  const handleCondition = (condition: Condition) =>
    sim.setCondition(
      condition === station.condition || condition === sim.condition ? null : condition,
    );

  return (
    <div className={css.screen} data-phase={snap.phase}>
      <main className={css.device}>
        {booting ? (
          <BootScreen />
        ) : (
          <>
            <div className={css.header}>
              <AtmosHeader
                city={station.city}
                lat={station.lat}
                lon={station.lon}
                tzId={station.tzId}
                status={status}
                simHour={snap.simHour}
              />
              {offline && (
                <p className={css.alert} role="alert">
                  ! SIN ENLACE CON LA API — MOSTRANDO SIMULACIÓN LOCAL
                </p>
              )}
            </div>
            <div className={css.scene}>
              <SkyCam phase={snap.phase} condition={snap.condition} />
            </div>
            <div className={css.readout}>
              <Readout temp={snap.temp} title={snap.title} max={snap.max} min={snap.min} />
            </div>
            <div className={css.stats}>
              <StatGrid
                feelsLike={snap.feelsLike}
                humidity={snap.humidity}
                windKph={snap.windKph}
                precip={snap.precip}
              />
            </div>
            <div className={css.hours}>
              <HourlyBars hours={snap.hours.slice(0, wide ? HOURS_SHOWN : HOURS_SHOWN / 2)} />
            </div>
            <div className={css.sim}>
              <SimControls
                phase={sim.phase}
                condition={snap.condition}
                onAuto={sim.reset}
                onPhase={handlePhase}
                onCondition={handleCondition}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
