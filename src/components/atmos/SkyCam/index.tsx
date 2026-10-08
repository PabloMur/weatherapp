import type { CSSProperties } from "react";
import { type Condition, CONDITION_INFO } from "../../../lib/atmos/conditions";
import { type Phase, PHASE_LABEL } from "../../../lib/atmos/phases";
import css from "./styles.module.css";

// Coordenadas de la escena (viewBox) — el horizonte queda en HZ
const W = 540;
const H = 356;
const HZ = 234;
const CX = W / 2;

// PRNG con semilla fija: estrellas y gotas no cambian de lugar entre renders
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(7);

const STARS = Array.from({ length: 18 }, () => ({
  x: 12 + rand() * (W - 24),
  y: 34 + rand() * (HZ - 70),
  r: 1 + rand() * 0.9,
  dur: 2 + rand() * 4,
  delay: -rand() * 6,
}));

// Gotas y copos: `phase` es la fracción del ciclo en la que arrancan
const DROPS = Array.from({ length: 36 }, () => ({
  x: rand() * (W + 140),
  dur: 0.7 + rand() * 0.4,
  phase: rand(),
}));

const FLAKES = Array.from({ length: 42 }, () => ({
  x: -10 + rand() * (W + 20),
  r: 1.4 + rand() * 1.6,
  dur: 7 + rand() * 6,
  phase: rand(),
}));

// Líneas que fugan al centro del horizonte
const RAYS = Array.from({ length: 19 }, (_, i) => CX + (i - 9) * 215);
// Distancia al horizonte de las líneas horizontales (perspectiva)
const GRID_OFFSETS = [0, 12, 24, 40, 60, 86];
const GRID_CYCLE = 6;

const CLOUDS = [
  { x: 55, y: 66, w: 246, h: 32, dur: 26 },
  { x: 316, y: 42, w: 162, h: 24, dur: 34 },
  { x: 172, y: 112, w: 302, h: 38, dur: 30 },
  { x: 21, y: 160, w: 232, h: 30, dur: 38 },
];

const CLOUD_COUNT: Record<Condition, number> = {
  claro: 0,
  nubes: 3,
  lluvia: 4,
  tormenta: 4,
  nieve: 2,
  niebla: 0,
};

const FOG = [
  { x: 2, y: 88, w: 370, h: 10, dur: 18 },
  { x: 140, y: 114, w: 400, h: 12, dur: 24 },
  { x: 2, y: 144, w: 290, h: 8, dur: 20 },
  { x: 230, y: 168, w: 310, h: 10, dur: 26 },
  { x: 2, y: 194, w: 415, h: 10, dur: 22 },
  { x: 92, y: 216, w: 448, h: 14, dur: 28 },
  { x: 0, y: 246, w: 540, h: 12, dur: 30 },
  { x: 60, y: 276, w: 480, h: 8, dur: 25 },
];

const BODY: Record<Phase, { kind: "sun" | "moon"; cx: number; cy: number; r: number }> = {
  alba: { kind: "sun", cx: CX, cy: 222, r: 58 },
  dia: { kind: "sun", cx: CX, cy: 118, r: 84 },
  ocaso: { kind: "sun", cx: CX, cy: 214, r: 66 },
  noche: { kind: "moon", cx: 362, cy: 103, r: 52 },
};

// Cuánto se ve el sol/luna detrás de cada condición
const BODY_OPACITY: Record<Condition, number> = {
  claro: 1,
  nubes: 0.85,
  lluvia: 0.45,
  tormenta: 0.4,
  nieve: 0.5,
  niebla: 0.65,
};

// Franjas del sol retro: [posición desde el centro, alto] en fracciones del radio
const SUN_STRIPES = [
  [0.3, 0.05],
  [0.48, 0.065],
  [0.63, 0.08],
  [0.77, 0.09],
  [0.9, 0.1],
];

const BOLT = "292,92 238,170 268,170 248,236 306,146 276,146 300,92";

const timing = (dur: number, delay: number): CSSProperties => ({
  animationDuration: `${dur}s`,
  animationDelay: `${delay}s`,
});

interface SkyCamProps {
  phase: Phase;
  condition: Condition;
}

export function SkyCam({ phase, condition }: SkyCamProps) {
  const body = BODY[phase];
  const showStars = phase === "noche" && (condition === "claro" || condition === "nubes");
  const raining = condition === "lluvia" || condition === "tormenta";

  return (
    <figure className={css.frame} data-condition={condition}>
      <figcaption className={css.hud}>
        <span>SKY.CAM-01</span>
        <span>
          {PHASE_LABEL[phase]} · {CONDITION_INFO[condition].camCode}
        </span>
      </figcaption>

      <svg
        className={css.scene}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Cámara del cielo: ${PHASE_LABEL[phase].toLowerCase()}, ${CONDITION_INFO[condition].title.toLowerCase()}`}
      >
        <defs>
          <clipPath id="atmos-sky">
            <rect width={W} height={HZ} />
          </clipPath>
          <linearGradient id="atmos-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.35" className={css.glowStop} stopOpacity="0" />
            <stop offset="1" className={css.glowStop} stopOpacity="0.16" />
          </linearGradient>
          <pattern id="atmos-scan" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="1" className={css.scan} />
          </pattern>
          <mask id="atmos-body">
            {body.kind === "sun" ? (
              <>
                <circle cx={body.cx} cy={body.cy} r={body.r} fill="#fff" />
                {SUN_STRIPES.map(([at, h]) => (
                  <rect
                    key={at}
                    x={body.cx - body.r}
                    y={body.cy + body.r * at - (body.r * h) / 2}
                    width={body.r * 2}
                    height={body.r * h}
                    fill="#000"
                  />
                ))}
              </>
            ) : (
              <>
                <circle cx={body.cx} cy={body.cy} r={body.r} fill="#fff" />
                <circle
                  cx={body.cx + body.r * 0.52}
                  cy={body.cy - body.r * 0.26}
                  r={body.r * 0.86}
                  fill="#000"
                />
                {Array.from({ length: Math.ceil((body.r * 2) / 5) }, (_, i) => (
                  <rect
                    key={i}
                    x={body.cx - body.r}
                    y={body.cy - body.r + i * 5 + 3.5}
                    width={body.r * 2}
                    height="1.2"
                    fill="#000"
                    opacity="0.45"
                  />
                ))}
              </>
            )}
          </mask>
        </defs>

        <rect width={W} height={HZ} fill="url(#atmos-glow)" />

        {showStars &&
          STARS.map((s, i) => (
            <circle
              key={i}
              className={css.star}
              cx={s.x}
              cy={s.y}
              r={s.r}
              style={timing(s.dur, s.delay)}
            />
          ))}

        <g clipPath="url(#atmos-sky)" opacity={BODY_OPACITY[condition]}>
          <rect
            className={css.body}
            x={body.cx - body.r}
            y={body.cy - body.r}
            width={body.r * 2}
            height={body.r * 2}
            mask="url(#atmos-body)"
          />
        </g>

        <g className={css.grid}>
          {RAYS.map((x) => (
            <line key={x} className={css.ray} x1={CX} y1={HZ} x2={x} y2={H} />
          ))}
          {GRID_OFFSETS.map((offset, i) => (
            <line
              key={offset}
              className={css.gridLine}
              x1="0"
              x2={W}
              y1={HZ}
              y2={HZ}
              style={{
                transform: `translateY(${offset}px)`,
                ...timing(GRID_CYCLE, -(i * GRID_CYCLE) / GRID_OFFSETS.length),
              }}
            />
          ))}
        </g>
        <line className={css.horizon} x1="0" x2={W} y1={HZ} y2={HZ} />

        {CLOUDS.slice(0, CLOUD_COUNT[condition]).map((c, i) => (
          <rect
            key={i}
            className={css.cloud}
            x={c.x}
            y={c.y}
            width={c.w}
            height={c.h}
            rx={c.h / 2}
            style={timing(c.dur, -c.dur * 0.5 * i)}
          />
        ))}

        {raining &&
          DROPS.map((d, i) => (
            <line
              key={i}
              className={css.drop}
              x1={d.x}
              y1={-20}
              x2={d.x - 4.5}
              y2={-6}
              style={{
                transform: `translate(${-114 * d.phase}px, ${392 * d.phase}px)`,
                ...timing(d.dur, -d.dur * d.phase),
              }}
            />
          ))}

        {condition === "tormenta" && <polygon className={css.bolt} points={BOLT} />}

        {condition === "nieve" &&
          FLAKES.map((f, i) => (
            <circle
              key={i}
              className={css.flake}
              cx={f.x}
              cy={-10}
              r={f.r}
              style={{
                transform: `translateY(${380 * f.phase}px)`,
                ...timing(f.dur, -f.dur * f.phase),
              }}
            />
          ))}

        {condition === "niebla" &&
          FOG.map((f, i) => (
            <rect
              key={i}
              className={css.fog}
              x={f.x}
              y={f.y}
              width={f.w}
              height={f.h}
              style={timing(f.dur, -f.dur * 0.37 * i)}
            />
          ))}

        <rect width={W} height={H} fill="url(#atmos-scan)" />
        {condition === "tormenta" && <rect className={css.flash} width={W} height={H} />}
      </svg>
    </figure>
  );
}
