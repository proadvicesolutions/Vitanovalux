import { useId } from "react";

/**
 * The Comet: a circle whose stroke grows from a thread to full weight and lights up in the sun.
 * Same geometry as the logo mark (200-unit box, ring radius 66, 330° tail, sun at -45°).
 * Used large and cropped as the site's recurring motif; the logo itself always comes from the SVG files.
 */
function cometPath(wmin: number, wmax: number, n = 160, power = 1.6) {
  const cx = 100, cy = 100, r = 66;
  const th1 = (-45 * Math.PI) / 180;
  const th0 = th1 - (330 * Math.PI) / 180;
  const out: string[] = [];
  const inn: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const th = th0 + (th1 - th0) * t;
    const w = wmin + (wmax - wmin) * t ** power;
    out.push(`${(cx + (r + w / 2) * Math.cos(th)).toFixed(2)} ${(cy + (r + w / 2) * Math.sin(th)).toFixed(2)}`);
    inn.push(`${(cx + (r - w / 2) * Math.cos(th)).toFixed(2)} ${(cy + (r - w / 2) * Math.sin(th)).toFixed(2)}`);
  }
  const head = { x: cx + r * Math.cos(th1), y: cy + r * Math.sin(th1) };
  return { d: `M${[...out, ...inn.reverse()].join(" L")}Z`, head };
}

const REGULAR = cometPath(1.2, 28);

export function CometRing({
  className = "",
  ring = "currentColor",
  sun = "var(--gold)",
  showSun = true,
}: {
  className?: string;
  ring?: string;
  sun?: string;
  showSun?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const { d, head } = REGULAR;
  return (
    <svg viewBox="16 16 168 168" className={className} aria-hidden focusable="false">
      <mask id={`m${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
        <rect width="200" height="200" fill="#fff" />
        {showSun && <circle cx={head.x} cy={head.y} r={24.5} fill="#000" />}
      </mask>
      <path d={d} fill={ring} mask={`url(#m${id})`} />
      {showSun && <circle cx={head.x} cy={head.y} r={21} fill={sun} />}
    </svg>
  );
}
