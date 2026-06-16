import { useState, useEffect } from "react";
import styles from "./ScreenGlitch.module.css";

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export function ScreenGlitch() {
  const [glitch, setGlitch] = useState(null);

  useEffect(() => {
    if (!glitch) return;
    const timer = setTimeout(() => setGlitch(null), glitch.duration);
    return () => clearTimeout(timer);
  }, [glitch]);

  useEffect(() => {
    let cancelled = false;
    const schedule = () => {
      const delay = random(6000, 22000);
      return setTimeout(() => {
        if (cancelled) return;
        const duration = random(120, 350);
        setGlitch({
          top: `${random(0, 100)}%`,
          height: `${random(2, 20)}px`,
          skew: random(-5, 5),
          rgbOffset: random(2, 6),
          duration,
        });
        schedule();
      }, delay);
    };
    const timer = schedule();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  if (!glitch) return null;

  return (
    <div className={styles.container} aria-hidden>
      <div
        className={styles.bar}
        style={{ top: glitch.top, height: glitch.height }}
      >
        <div
          className={styles.channelR}
          style={{
            height: glitch.height,
            transform: `skewX(${glitch.skew}deg) translateX(${glitch.rgbOffset}px)`,
          }}
        />
        <div
          className={styles.channelB}
          style={{
            height: glitch.height,
            transform: `skewX(${glitch.skew}deg) translateX(-${glitch.rgbOffset}px)`,
          }}
        />
      </div>
    </div>
  );
}
