import { useMemo } from "react";
import { useForecast, useNow, useSimulation } from "../../../hooks";
import type { Condition } from "../../../lib/atmos/conditions";
import type { Phase } from "../../../lib/atmos/phases";
import { FALLBACK_STATION, readStation, stationFromForecast } from "../../../lib/atmos/station";
import { AtmosHeader, type LinkStatus } from "../AtmosHeader";
import { BootScreen } from "../BootScreen";
import { HourlyBars } from "../HourlyBars";
import { Readout } from "../Readout";
import { SimControls } from "../SimControls";
import { SkyCam } from "../SkyCam";
import { StatGrid } from "../StatGrid";
import css from "./styles.module.css";

export function AtmosScreen() {
  const forecast = useForecast();
  const sim = useSimulation();
  const now = useNow(30_000);

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
            <SkyCam phase={snap.phase} condition={snap.condition} />
            <Readout temp={snap.temp} title={snap.title} max={snap.max} min={snap.min} />
            <StatGrid
              feelsLike={snap.feelsLike}
              humidity={snap.humidity}
              windKph={snap.windKph}
              precip={snap.precip}
            />
            <HourlyBars hours={snap.hours} />
            <SimControls
              phase={sim.phase}
              condition={snap.condition}
              onAuto={sim.reset}
              onPhase={handlePhase}
              onCondition={handleCondition}
            />
          </>
        )}
      </main>
    </div>
  );
}
