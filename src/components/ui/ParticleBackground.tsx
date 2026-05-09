import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

interface ParticleBackgroundProps {
  isDark: boolean;
}

export const ParticleBackground = ({ isDark }: ParticleBackgroundProps) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          color: { value: isDark ? "#00e5c3" : "#0d9488" },
          links: {
            color: isDark ? "#00e5c3" : "#0d9488",
            distance: isDark ? 180 : 150,
            enable: true,
            opacity: isDark ? 0.2 : 0.15,
            width: isDark ? 1.2 : 1,
          },
          move: {
            enable: true,
            speed: isDark ? 0.8 : 1,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "bounce" },
          },
          number: {
            density: { enable: true, width: 1200, height: 800 },
            value: isDark ? 65 : 35,
          },
          opacity: {
            value: isDark ? 0.5 : 0.4,
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: isDark ? 4 : 3 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  );
};
