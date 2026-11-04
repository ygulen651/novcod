import s from "./Chapters.module.css";

const LINKS = [
  "M60 470 C60 380 110 340 110 262",
  "M170 470 C170 380 110 340 110 262",
  "M300 470 C300 380 290 340 290 262",
  "M110 238 C110 150 200 150 200 84",
  "M290 238 C290 150 200 150 200 84",
];

const NODES = [
  { x: 200, y: 62, label: "Merkez", main: true },
  { x: 110, y: 250, label: "Bayi" },
  { x: 290, y: 250, label: "Bayi" },
  { x: 60, y: 482, label: "Alt bayi" },
  { x: 170, y: 482, label: "Alt bayi" },
  { x: 300, y: 482, label: "Alt bayi" },
];

/** Kaynaktaki sipariş akışının temsili şeması: alt bayi, bayi ve merkez. */
export function BayiNetwork() {
  return (
    <figure className={s.network}>
      <svg viewBox="0 0 360 530" role="img" aria-label="Sipariş akışı: alt bayiler bayiye, bayiler merkeze sipariş iletir">
        {LINKS.map((d) => (
          <g key={d}>
            <path d={d} className={s.netPath} />
            <path d={d} pathLength={1} className={s.netPulse} />
          </g>
        ))}
        {NODES.map((node, index) => (
          <g key={index}>
            <rect
              x={node.x - (node.main ? 58 : 46)}
              y={node.y - 22}
              width={node.main ? 116 : 92}
              height={44}
              rx={22}
              className={node.main ? s.netNodeMain : s.netNode}
            />
            <text x={node.x} y={node.y + 6} textAnchor="middle" className={node.main ? s.netMainText : undefined}>{node.label}</text>
          </g>
        ))}
      </svg>
      <figcaption>Temsili sipariş akışı</figcaption>
    </figure>
  );
}
