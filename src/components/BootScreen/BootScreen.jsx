import { useState, useEffect, useRef } from 'react'
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
  const canvasRef = useRef(null)

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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const PADDLE_W = 10
    const PADDLE_H = 80
    const BALL_SIZE = 8
    const SPEED = 3

    let leftY = canvas.height / 2 - PADDLE_H / 2
    let rightY = canvas.height / 2 - PADDLE_H / 2
    let ballX = canvas.width / 2
    let ballY = canvas.height / 2
    let ballVx = SPEED
    let ballVy = 2

    let running = true

    const loop = () => {
      if (!running) return

      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const moveAI = (paddleY, speedMul) => {
        const center = paddleY + PADDLE_H / 2
        const diff = ballY - center
        const step = Math.min(SPEED * speedMul, Math.abs(diff))
        return paddleY + (diff > 0 ? step : -step)
      }

      leftY = moveAI(leftY, 1)
      rightY = moveAI(rightY, 0.9)

      leftY = Math.max(0, Math.min(canvas.height - PADDLE_H, leftY))
      rightY = Math.max(0, Math.min(canvas.height - PADDLE_H, rightY))

      ballX += ballVx
      ballY += ballVy

      if (ballY <= 0 || ballY + BALL_SIZE >= canvas.height) {
        ballVy = -ballVy
      }

      if (
        ballX <= PADDLE_W &&
        ballY + BALL_SIZE >= leftY &&
        ballY <= leftY + PADDLE_H
      ) {
        ballVx = -ballVx
        ballX = PADDLE_W + 1
      }

      if (
        ballX + BALL_SIZE >= canvas.width - PADDLE_W &&
        ballY + BALL_SIZE >= rightY &&
        ballY <= rightY + PADDLE_H
      ) {
        ballVx = -ballVx
        ballX = canvas.width - PADDLE_W - BALL_SIZE - 1
      }

      if (ballX < -BALL_SIZE || ballX > canvas.width) {
        ballX = canvas.width / 2
        ballY = canvas.height / 2
        ballVx = SPEED * (Math.random() > 0.5 ? 1 : -1)
        ballVy = 2 * (Math.random() > 0.5 ? 1 : -1)
      }

      ctx.strokeStyle = '#39ff14'
      ctx.globalAlpha = 0.15
      ctx.setLineDash([8, 12])
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, 0)
      ctx.lineTo(canvas.width / 2, canvas.height)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.globalAlpha = 1

      ctx.shadowColor = '#39ff14'
      ctx.shadowBlur = 12
      ctx.fillStyle = '#39ff14'
      ctx.fillRect(0, leftY, PADDLE_W, PADDLE_H)
      ctx.fillRect(canvas.width - PADDLE_W, rightY, PADDLE_W, PADDLE_H)
      ctx.fillRect(ballX, ballY, BALL_SIZE, BALL_SIZE)
      ctx.shadowBlur = 0

      requestAnimationFrame(loop)
    }

    loop()

    return () => {
      running = false
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className={styles.overlay}>
      <canvas ref={canvasRef} className={styles.pongCanvas} />
      <div className={styles.crt}>
        <div className={styles.screen}>
          <pre className={styles.ascii}>{String.raw`  _____  ______ _______ _____   ____     _____          __  __ ______  _____
  |  __ \|  ____|__   __|  __ \ / __ \   / ____|   /\   |  \/  |  ____|/ ____|
  | |__) | |__     | |  | |__) | |  | | | |  __   /  \  | \  / | |__  | (___
  |  _  /|  __|    | |  |  _  /| |  | | | | |_ | / /\ \ | |\/| |  __|  \___ \
  | | \ \| |____   | |  | | \ \| |__| | | |__| |/ ____ \| |  | | |____ ____) |
  |_|  \_\______|  |_|  |_|  \_\\____/   \_____/_/    \_\_|  |_|______|_____/
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
            <p className={styles.pressStart} onClick={onFinish}>[ PRESS START ]</p>
          )}
        </div>
      </div>
    </div>
  )
}
