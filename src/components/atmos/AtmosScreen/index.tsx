import { useEffect, useMemo, useState } from "react";
import { useForecast, useMediaQuery, useNow, useSimulation } from "../../../hooks";
import type { Condition } from "../../../lib/atmos/conditions";
import {
  dayDateLabel,
  type ForecastPick,
  forecastOverview,
  forecastSnapshot,
} from "../../../lib/atmos/forecast";
import type { Phase } from "../../../lib/atmos/phases";
import {
  FALLBACK_STATION,
  HOURS_SHOWN,
  readStation,
  stationFromForecast,
} from "../../../lib/atmos/station";
import { AtmosHeader, type LinkStatus } from "../AtmosHeader";
import { BootScreen } from "../BootScreen";
import { ForecastPanel } from "../ForecastPanel";
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
  const hasForecast = station.days.length > 0;

  // Momento del pronóstico elegido en el panel; null = AHORA (en vivo)
  const [pick, setPick] = useState<ForecastPick | null>(null);
  useEffect(() => setPick(null), [station.city, station.lat, station.lon]);

  // El simulador queda escondido detrás del indicador de estado
  const simActive = Boolean(sim.phase || sim.condition);
  const [simOpen, setSimOpen] = useState(simActive);
  const showSim = simOpen || simActive || !hasForecast;

  const forecastSnap = !simActive && pick ? forecastSnapshot(station, pick) : null;
  const snap = forecastSnap ?? readStation(station, now, sim, !offline);
  const selectedDay = pick?.day ?? 0;
  const overview = forecastOverview(station, now, selectedDay);

  let status: LinkStatus = "live";
  if (offline) status = "offline";
  else if (forecast.isPlaceholderData) status = "sync";
  else if (simActive) status = "sim";
  else if (forecastSnap) status = "forecast";

  // ---- Panel de pronóstico ----
  const clearSim = () => simActive && sim.reset();
  const showNow = () => {
    setPick(null);
    clearSim();
  };
  const showPhase = (phase: Phase) => {
    setPick({ day: selectedDay, phase });
    clearSim();
  };
  // Hoy vuelve a AHORA; otro día conserva la franja elegida (o arranca en DÍA)
  const showDay = (day: number) => {
    setPick(day === 0 ? null : { day, phase: pick?.phase ?? "dia" });
    clearSim();
  };

  // ---- Simulador ----
  const toggleSim = () => {
    if (simOpen || simActive) {
      clearSim();
      setSimOpen(false);
    } else {
      setSimOpen(true);
    }
  };
  const handlePhase = (phase: Phase) => {
    setPick(null);
    sim.setPhase(phase === sim.phase ? null : phase);
  };
  // Volver a elegir la condición real (o la ya simulada) apaga la simulación
  const handleCondition = (condition: Condition) => {
    setPick(null);
    sim.setCondition(
      condition === station.condition || condition === sim.condition ? null : condition,
    );
  };

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
                dateLabel={forecastSnap ? dayDateLabel(station, selectedDay) : null}
                simOpen={showSim}
                onToggleSim={toggleSim}
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
              {hasForecast && (
                <ForecastPanel
                  phases={overview.phases}
                  days={overview.days}
                  nowTemp={Math.round(station.temp)}
                  selectedDay={selectedDay}
                  selectedPhase={pick?.phase ?? null}
                  onNow={showNow}
                  onPhase={showPhase}
                  onDay={showDay}
                />
              )}
              {showSim && (
                <div className={hasForecast ? css.simExtra : undefined}>
                  <SimControls
                    phase={sim.phase}
                    condition={snap.condition}
                    onAuto={sim.reset}
                    onPhase={handlePhase}
                    onCondition={handleCondition}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
