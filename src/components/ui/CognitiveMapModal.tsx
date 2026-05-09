import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Brain, Plus, Minus } from "lucide-react";

interface Node {
  id: string;
  label: string;
  group: string;
  x: number;
  y: number;
  primary?: boolean;
  details?: string;
  links?: string[];
}

const CENTER = { x: 50, y: 50 };

// Radii in viewBox units
const BRANCH_R = 30;
const SUB_R = 52;

// Branches arranged radially around center
const branches: { id: string; label: string; angle: number; color: string }[] = [
  { id: "ai-systems", label: "AI Systems", angle: -90, color: "var(--neon-cyan)" },
  { id: "nlp", label: "NLP", angle: -45, color: "var(--neon-purple)" },
  { id: "explainability", label: "Explainability", angle: 0, color: "var(--neon-amber)" },
  { id: "research", label: "Research", angle: 45, color: "var(--neon-cyan)" },
  { id: "deployment", label: "Deployment", angle: 90, color: "var(--neon-purple)" },
  { id: "apis", label: "APIs", angle: 135, color: "var(--neon-amber)" },
  { id: "vision", label: "Computer Vision", angle: 180, color: "var(--neon-cyan)" },
  { id: "human", label: "Human-Centered AI", angle: -135, color: "var(--neon-purple)" },
];

const subnodesByBranch: Record<string, string[]> = {
  "ai-systems": ["Agent Workflows", "Orchestration", "Pipelines"],
  nlp: ["Transformers", "Legal NLP", "RAG"],
  explainability: ["SHAP", "LIME", "Attribution"],
  research: ["Pattern Recognition", "Problem Decomposition"],
  deployment: ["FastAPI", "Docker", "CI/CD"],
  apis: ["REST", "Streaming", "Auth"],
  vision: ["CNNs", "U-Net", "MediaPipe"],
  human: ["Interpretability", "Trust", "Evaluation"],
};

const linkedProjects: Record<string, string[]> = {
  Transformers: ["Legal Doc Summarization", "Nexus"],
  "Legal NLP": ["Legal Doc Summarization"],
  SHAP: ["ADR Prediction (Sun Pharma)"],
  LIME: ["ADR Prediction (Sun Pharma)"],
  CNNs: ["Liver Tumor Segmentation", "EnviroVision"],
  "U-Net": ["Liver Tumor Segmentation"],
  MediaPipe: ["Gesture-Based Cursor"],
  FastAPI: ["Nexus"],
  "Agent Workflows": ["Nexus"],
  RAG: ["Nexus"],
  Docker: ["Nexus", "EnviroVision"],
};

const polar = (angle: number, radius: number) => ({
  x: CENTER.x + radius * Math.cos((angle * Math.PI) / 180),
  y: CENTER.y + radius * Math.sin((angle * Math.PI) / 180),
});

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CognitiveMapModal = ({ open, onClose }: Props) => {
  const [active, setActive] = useState<string | null>(null);
  const [isSmall, setIsSmall] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [allExpanded, setAllExpanded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const nodes = useMemo(() => {
    const list: Node[] = [
      { id: "center", label: "Nikita Singh", group: "center", x: CENTER.x, y: CENTER.y, primary: true },
    ];
    branches.forEach((b) => {
      const p = polar(b.angle, BRANCH_R);
      list.push({ id: b.id, label: b.label, group: b.id, x: p.x, y: p.y, primary: true });
      const subs = subnodesByBranch[b.id] ?? [];
      subs.forEach((sub, i) => {
        const spread = subs.length <= 2 ? 14 : subs.length === 3 ? 26 : 32;
        const offset = subs.length === 1 ? 0 : -spread / 2 + (i / (subs.length - 1)) * spread;
        const sp = polar(b.angle + offset, SUB_R);
        list.push({ id: `${b.id}-${sub}`, label: sub, group: b.id, x: sp.x, y: sp.y, links: linkedProjects[sub] });
      });
    });
    return list;
  }, []);

  const isVisible = (n: Node) => {
    if (n.id === "center" || n.primary) return true;
    return allExpanded || expanded.has(n.group);
  };

  const toggleBranch = (group: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  const isHighlighted = (n: Node) => {
    if (!active) return false;
    if (n.id === active) return true;
    const node = nodes.find((x) => x.id === active);
    if (!node) return false;
    return n.group === node.group || n.id === "center";
  };

  const activeNode = active ? nodes.find((n) => n.id === active) : null;
  const activeLinks = activeNode?.links ?? [];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-3 md:inset-10 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.94, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 16, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="pointer-events-auto w-full max-w-6xl h-[88vh] rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
            >
              <header className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md border border-primary/30 bg-primary/10 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">/ COGNITIVE MAP</p>
                    <h3 className="font-display text-lg text-foreground">Systems Thinking Graph</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setAllExpanded((v) => !v); setExpanded(new Set()); }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border hover:border-primary/40 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {allExpanded ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    {allExpanded ? "Collapse" : "Expand all"}
                  </button>
                  <button onClick={onClose} className="p-2 rounded-md border border-border hover:bg-muted transition-colors" aria-label="Close map">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </header>

              <div className="grid lg:grid-cols-[1fr_280px] flex-1 overflow-hidden">
                <div className="relative overflow-hidden">
                  <svg viewBox="-35 -30 170 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                    {/* Edges: center → branches */}
                    {branches.map((b) => {
                      const p = polar(b.angle, BRANCH_R);
                      const activeGroup = active ? nodes.find((n) => n.id === active)?.group : null;
                      const dim = active && active !== "center" && activeGroup !== b.id;
                      const lit = active && (active === b.id || activeGroup === b.id);
                      return (
                        <line
                          key={`edge-${b.id}`}
                          x1={CENTER.x} y1={CENTER.y} x2={p.x} y2={p.y}
                          stroke="hsl(var(--primary))"
                          strokeWidth={lit ? 0.32 : 0.2}
                          strokeOpacity={dim ? 0.08 : lit ? 0.7 : 0.32}
                          style={{ transition: "all 0.3s" }}
                        />
                      );
                    })}
                    {/* Edges: branch → subnode */}
                    {nodes.filter((n) => !n.primary && n.id !== "center" && isVisible(n)).map((n) => {
                      const parent = nodes.find((x) => x.id === n.group);
                      if (!parent) return null;
                      const activeGroup = active ? nodes.find((x) => x.id === active)?.group : null;
                      const dim = active && activeGroup !== n.group && active !== "center";
                      const lit = active && activeGroup === n.group;
                      return (
                        <line
                          key={`sub-${n.id}`}
                          x1={parent.x} y1={parent.y} x2={n.x} y2={n.y}
                          stroke="hsl(var(--primary))"
                          strokeWidth={lit ? 0.18 : 0.12}
                          strokeOpacity={dim ? 0.05 : lit ? 0.45 : 0.22}
                          strokeDasharray="0.5 0.7"
                          style={{ transition: "all 0.3s" }}
                        />
                      );
                    })}

                    {/* Nodes + radial labels */}
                    {nodes.filter(isVisible).map((n) => {
                      const dim = active && !isHighlighted(n);
                      const isCenter = n.id === "center";
                      const r = isCenter ? 4 : n.primary ? 2.8 : 1.6;
                      const branchExpanded = n.primary && !isCenter && (allExpanded || expanded.has(n.id));

                      // Compute the node's own radial angle from center for label placement,
                      // not just the parent branch angle. This avoids labels overlapping
                      // the connecting edges at fanned subnodes.
                      const dx = n.x - CENTER.x;
                      const dy = n.y - CENTER.y;
                      const rad = isCenter ? Math.PI / 2 : Math.atan2(dy, dx);

                      let lx = n.x;
                      let ly = n.y + r + 3.6;
                      let anchor: "start" | "middle" | "end" = "middle";
                      if (!isCenter) {
                        const labelDist = r + (n.primary ? 4.2 : 3.2);
                        lx = n.x + labelDist * Math.cos(rad);
                        ly = n.y + labelDist * Math.sin(rad) + 0.7;
                        if (Math.cos(rad) > 0.25) anchor = "start";
                        else if (Math.cos(rad) < -0.25) anchor = "end";
                      }

                      const baseSize = isCenter ? 3.0 : n.primary ? 2.5 : 1.95;
                      const fontSize = isSmall ? baseSize * 1.18 : baseSize;
                      const textW = n.label.length * fontSize * 0.55;
                      const padX = 1.0;
                      const padY = 0.6;
                      const bgX =
                        anchor === "start" ? lx - padX :
                        anchor === "end" ? lx - textW - padX :
                        lx - textW / 2 - padX;
                      const bgY = ly - fontSize + 0.1;

                      return (
                        <motion.g
                          key={n.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: dim ? 0.22 : 1, scale: 1 }}
                          transition={{ duration: 0.25 }}
                          onClick={() => {
                            if (n.primary && !isCenter) toggleBranch(n.id);
                            setActive(active === n.id ? null : n.id);
                          }}
                          className="cursor-pointer"
                        >
                          <circle
                            cx={n.x} cy={n.y} r={r + 1.4}
                            fill="hsl(var(--primary))"
                            opacity={n.id === active ? 0.28 : 0}
                          />
                          <circle
                            cx={n.x} cy={n.y} r={r}
                            fill={isCenter ? "hsl(var(--primary))" : "hsl(var(--card))"}
                            stroke="hsl(var(--primary))"
                            strokeWidth={n.primary ? 0.4 : 0.25}
                          />
                          {n.primary && !isCenter && (
                            <text
                              x={n.x}
                              y={n.y + 0.9}
                              textAnchor="middle"
                              fill="hsl(var(--primary))"
                              fontSize={2.4}
                              fontFamily="ui-monospace, monospace"
                              style={{ pointerEvents: "none" }}
                            >
                              {branchExpanded ? "−" : "+"}
                            </text>
                          )}
                          <rect
                            x={bgX}
                            y={bgY}
                            width={textW + padX * 2}
                            height={fontSize + padY * 2}
                            rx={1.0}
                            fill="hsl(var(--card))"
                            opacity={0.97}
                            stroke="hsl(var(--border))"
                            strokeWidth={0.1}
                          />
                          <text
                            x={lx} y={ly}
                            textAnchor={anchor}
                            fill="hsl(var(--foreground))"
                            fontSize={fontSize}
                            fontFamily="ui-monospace, monospace"
                            fontWeight={n.primary ? 600 : 400}
                            style={{ pointerEvents: "none" }}
                          >
                            {n.label}
                          </text>
                        </motion.g>
                      );
                    })}
                  </svg>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 pointer-events-none">
                    Click any branch to expand
                  </div>
                </div>

                <aside className="border-t lg:border-t-0 lg:border-l border-border p-5 overflow-y-auto bg-background/40">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">/ INSPECTOR</p>
                  {!activeNode && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Click any node to inspect connections and linked work. Branches map how research, engineering, and product layers interconnect.
                    </p>
                  )}
                  {activeNode && (
                    <div>
                      <h4 className="font-display text-xl text-foreground mb-1">{activeNode.label}</h4>
                      <p className="text-xs text-primary font-mono uppercase tracking-wider mb-4">
                        {activeNode.id === "center" ? "Operator" : activeNode.primary ? "Primary Branch" : "Subdomain"}
                      </p>
                      {activeLinks.length > 0 ? (
                        <>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Linked work</p>
                          <ul className="space-y-2">
                            {activeLinks.map((l) => (
                              <li key={l} className="text-sm text-foreground/85 rounded-md border border-border bg-card/60 px-3 py-2">
                                {l}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">Used as a connecting concept across multiple systems and projects.</p>
                      )}
                    </div>
                  )}
                </aside>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
