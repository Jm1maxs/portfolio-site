import { useEffect, useRef } from 'react'

const SHAPES = ['circle', 'square', 'ring', 'triangle', 'cross']

export default function ShapeWaves({
  text = '</>',
  fontFamily = 'Geist, "Geist Sans", system-ui, sans-serif',
  fontWeight = 500,
  textSize = 0.6,
  shapes = 'mixed',
  cellSize = 10,
  dotSize = 0.75,
  color = '#ffffff',
  hoverColor = '#ffffff',
  backgroundColor = '#120f17',
  speed = 1,
  scale = 1,
  contrast = 1,
  brightness = 1,
  flow = 0,
  direction = 0,
  fade = 0.25,
  interactive = true,
  splashRadius = 40,
  splashStrength = 0.4,
  glow = 0.35,
  intro = true,
  introDuration = 1.6,
  paused = false
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const propsRef = useRef({
    text,
    fontFamily,
    fontWeight,
    textSize,
    shapes,
    cellSize,
    dotSize,
    color,
    hoverColor,
    speed,
    scale,
    contrast,
    brightness,
    flow,
    direction,
    fade,
    interactive,
    splashRadius,
    splashStrength,
    glow,
    intro,
    introDuration,
    backgroundColor,
    paused
  })
  const pointerRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    propsRef.current = {
      text,
      fontFamily,
      fontWeight,
      textSize,
      shapes,
      cellSize,
      dotSize,
      color,
      hoverColor,
      speed,
      scale,
      contrast,
      brightness,
      flow,
      direction,
      fade,
      interactive,
      splashRadius,
      splashStrength,
      glow,
      intro,
      introDuration,
      backgroundColor,
      paused
    }
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = backgroundColor
    }
  }, [
    text,
    fontFamily,
    fontWeight,
    textSize,
    shapes,
    cellSize,
    dotSize,
    color,
    hoverColor,
    backgroundColor,
    speed,
    scale,
    contrast,
    brightness,
    flow,
    direction,
    fade,
    interactive,
    splashRadius,
    splashStrength,
    glow,
    intro,
    introDuration,
    paused
  ])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return undefined

    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let particles = []
    let raf = 0
    const startTime = performance.now()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const pickShape = (index, mode) => {
      if (mode === 'mixed') return SHAPES[index % SHAPES.length]
      return mode
    }

    const build = () => {
      const props = propsRef.current
      width = container.clientWidth
      height = container.clientHeight
      if (width <= 0 || height <= 0) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const off = document.createElement('canvas')
      off.width = Math.max(1, Math.floor(width))
      off.height = Math.max(1, Math.floor(height))
      const offCtx = off.getContext('2d')
      offCtx.clearRect(0, 0, off.width, off.height)
      offCtx.fillStyle = '#ffffff'
      offCtx.textAlign = 'center'
      offCtx.textBaseline = 'middle'
      offCtx.font = `${props.fontWeight} ${Math.max(12, props.textSize * height)}px ${props.fontFamily}`
      offCtx.fillText(props.text, width / 2, height / 2)

      const data = offCtx.getImageData(0, 0, off.width, off.height).data
      const step = Math.max(2, Math.round(props.cellSize * props.scale))
      const elapsed = performance.now() - startTime
      const isIntro = props.intro && elapsed < props.introDuration * 1000
      const next = []

      for (let y = step / 2; y < height; y += step) {
        for (let x = step / 2; x < width; x += step) {
          const idx = (Math.floor(y) * off.width + Math.floor(x)) * 4
          if (data[idx + 3] > 128) {
            next.push({
              tx: x,
              ty: y,
              x: isIntro ? Math.random() * width : x,
              y: isIntro ? Math.random() * height : y,
              vx: 0,
              vy: 0,
              phase: Math.random() * Math.PI * 2,
              baseAlpha: Math.max(0.18, 1 - props.fade * Math.random()),
              shape: pickShape(next.length, props.shapes)
            })
          }
        }
      }

      particles = next
    }

    const drawParticle = (p, now) => {
      const props = propsRef.current
      const cell = props.cellSize * props.scale
      const radius = Math.max(0.6, cell * props.dotSize * 0.55)
      const px = pointerRef.current
      const distToPointer = Math.hypot(p.x - px.x, p.y - px.y)
      const active = props.interactive && distToPointer < props.splashRadius
      const particleColor = active ? props.hoverColor : props.color
      const alpha = p.baseAlpha * (0.78 + 0.22 * Math.sin(now * 1.4 + p.phase))

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.fillStyle = particleColor
      ctx.strokeStyle = particleColor
      ctx.lineWidth = Math.max(1, radius * 0.45)
      ctx.globalAlpha = alpha

      if (props.glow > 0) {
        ctx.shadowColor = particleColor
        ctx.shadowBlur = props.glow * cell * 1.2
      }

      if (p.shape === 'circle') {
        ctx.beginPath()
        ctx.arc(0, 0, radius, 0, Math.PI * 2)
        ctx.fill()
      } else if (p.shape === 'square') {
        ctx.rotate(p.phase)
        ctx.fillRect(-radius, -radius, radius * 2, radius * 2)
      } else if (p.shape === 'ring') {
        ctx.beginPath()
        ctx.arc(0, 0, radius, 0, Math.PI * 2)
        ctx.stroke()
      } else if (p.shape === 'triangle') {
        ctx.beginPath()
        ctx.moveTo(0, -radius)
        ctx.lineTo(radius, radius)
        ctx.lineTo(-radius, radius)
        ctx.closePath()
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.moveTo(-radius, 0)
        ctx.lineTo(radius, 0)
        ctx.moveTo(0, -radius)
        ctx.lineTo(0, radius)
        ctx.stroke()
      }

      ctx.restore()
    }

    const step = (now) => {
      const props = propsRef.current
      const seconds = (now - startTime) / 1000
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const time = seconds * props.speed

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      canvas.style.filter = `contrast(${props.contrast}) brightness(${props.brightness})`

      const angle = props.direction
      const pointer = pointerRef.current

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]
        let offX = 0
        let offY = 0

        if (props.flow > 0 && !reduced) {
          const wave =
            Math.sin(time * 1.2 + p.ty * 0.018 + p.phase) *
            props.flow *
            props.cellSize *
            props.scale *
            2.2
          offX = Math.cos(angle) * wave
          offY = Math.sin(angle) * wave
        }

        const targetX = p.tx + offX
        const targetY = p.ty + offY

        p.vx += (targetX - p.x) * 0.085
        p.vy += (targetY - p.y) * 0.085
        p.vx *= 0.86
        p.vy *= 0.86

        if (props.interactive) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < props.splashRadius && dist > 0.01) {
            const force =
              (1 - dist / props.splashRadius) *
              props.splashStrength *
              props.cellSize *
              props.scale *
              1.8
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        p.x += p.vx
        p.y += p.vy
        drawParticle(p, seconds)
      }

      if (!props.paused) raf = requestAnimationFrame(step)
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    }

    const onPointerLeave = () => {
      pointerRef.current = { x: -9999, y: -9999 }
    }

    const resizeObserver = new ResizeObserver(() => build())
    resizeObserver.observe(container)

    container.style.backgroundColor = propsRef.current.backgroundColor ?? '#120f17'
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerout', onPointerLeave)

    build()
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerout', onPointerLeave)
    }
  }, [])

  return (
    <div className="shape-waves" ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} className="shape-waves__canvas" />
    </div>
  )
}
