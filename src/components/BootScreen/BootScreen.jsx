import { useState, useEffect } from 'react'
import styles from './BootScreen.module.css'

const bootSteps = [
  { text: 'CHECKING ROM...', delay: 400 },
  { text: 'INITIALIZING VIDEO...', delay: 500 },
  { text: 'LOADING SYSTEM FILES...', delay: 600 },
  { text: 'MOUNTING CARTRIDGE...', delay: 500 },
  { text: 'READY.', delay: 800 },
]

export function BootScreen({ onFinish }) {
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showPressStart, setShowPressStart] = useState(false)

  useEffect(() => {
    if (visibleSteps < bootSteps.length) {
      const timer = setTimeout(() => {
        setVisibleSteps(v => v + 1)
      }, bootSteps[visibleSteps].delay)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setShowPressStart(true), 600)
      return () => clearTimeout(timer)
    }
  }, [visibleSteps])

  useEffect(() => {
    if (visibleSteps === 0) return
    const target = Math.min((visibleSteps / bootSteps.length) * 100, 100)
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= target) {
          clearInterval(interval)
          return target
        }
        return Math.min(p + 2, target)
      })
    }, 30)
    return () => clearInterval(interval)
  }, [visibleSteps])

  const handleStart = () => {
    if (showPressStart) onFinish()
  }

  return (
    <div className={styles.overlay} onClick={handleStart}>
      <div className={styles.crt}>
        <div className={styles.screen}>
          <pre className={styles.ascii}>{`
  ██████  ███████ ████████ ██████   ██████
  ██   ██ ██         ██    ██   ██ ██
  ██████  █████      ██    ██████  ██   ██
  ██   ██ ██         ██    ██   ██ ██   ██
  ██   ██ ███████    ██    ██   ██  ██████
          `}</pre>
          <pre className={styles.asciiSub}>{`
   ██████   █████  ███    ███ ███████
  ██       ██   ██ ████  ████ ██
  ██   ███ ███████ ██ ████ ██ █████
  ██    ██ ██   ██ ██  ██  ██ ██
   ██████  ██   ██ ██      ██ ███████
          `}</pre>

          <div className={styles.steps}>
            {bootSteps.slice(0, visibleSteps).map((step, i) => (
              <p key={i} className={styles.step}>
                {step.text}
              </p>
            ))}
          </div>

          <div className={styles.barContainer}>
            <div className={styles.barBg}>
              <div className={styles.barFill} style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.percent}>{Math.floor(progress)}%</span>
          </div>

          {showPressStart && (
            <p className={styles.pressStart}>[ PRESS START ]</p>
          )}
        </div>
      </div>
    </div>
  )
}
