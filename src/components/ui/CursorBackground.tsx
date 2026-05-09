import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

interface CursorBackgroundProps {
  isDark: boolean;
}

/**
 * Interactive background:
 *  - Large soft blob follows the cursor with spring easing
 *  - Two ambient orbs parallax with scroll
 *  - Subtle grid that warps near the cursor (CSS radial mask)
 */
export const CursorBackground = ({ isDark }: CursorBackgroundProps) => {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const x = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.6 });
  const y = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.6 });

  const { scrollY } = useScroll();
  const orb1Y = useTransform(scrollY, [0, 2000], [0, -300]);
  const orb2Y = useTransform(scrollY, [0, 2000], [0, 250]);
  const orb3Rot = useTransform(scrollY, [0, 3000], [0, 180]);

  const wrapRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  // Center the blob on the cursor
  const blobX = useTransform(x, (v) => v - 250);
  const blobY = useTransform(y, (v) => v - 250);

  const blobColor = isDark
    ? "radial-gradient(circle, hsl(168 100% 48% / 0.18) 0%, hsl(168 100% 48% / 0.08) 30%, transparent 70%)"
    : "radial-gradient(circle, hsl(168 80% 38% / 0.18) 0%, hsl(168 80% 38% / 0.06) 35%, transparent 70%)";

  const orb1Color = isDark
    ? "radial-gradient(circle, hsl(280 80% 60% / 0.18) 0%, transparent 70%)"
    : "radial-gradient(circle, hsl(280 60% 55% / 0.12) 0%, transparent 70%)";

  const orb2Color = isDark
    ? "radial-gradient(circle, hsl(45 100% 50% / 0.12) 0%, transparent 70%)"
    : "radial-gradient(circle, hsl(45 90% 48% / 0.10) 0%, transparent 70%)";

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.18] dark:opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground) / 0.07) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(circle at 50% 30%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 30%, black 0%, transparent 75%)",
        }}
      />

      {/* Cursor blob */}
      {!isTouch && (
        <motion.div
          className="absolute"
          style={{
            x: blobX,
            y: blobY,
            width: 500,
            height: 500,
            background: blobColor,
            filter: "blur(40px)",
            willChange: "transform",
          }}
        />
      )}

      {/* Parallax orbs */}
      <motion.div
        className="absolute -left-32 top-[10%]"
        style={{
          y: orb1Y,
          width: 520,
          height: 520,
          background: orb1Color,
          filter: "blur(70px)",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -right-40 top-[55%]"
        style={{
          y: orb2Y,
          width: 600,
          height: 600,
          background: orb2Color,
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating ring (dark only) */}
      {isDark && (
        <motion.div
          className="absolute left-1/2 top-[40%] -translate-x-1/2"
          style={{
            rotate: orb3Rot,
            width: 700,
            height: 700,
            border: "1px dashed hsl(var(--neon-cyan) / 0.12)",
            borderRadius: "50%",
          }}
        />
      )}
    </div>
  );
};
