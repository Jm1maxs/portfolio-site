import { useEffect, useRef, useState } from 'react'

export default function CountUp({ value, duration = 1800 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/)
    if (!match) {
      setDisplay(value)
      return undefined
    }

    const target = parseFloat(match[1])
    const suffix = match[2] || ''
    const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0
    let frame = 0
    let observer

    const animate = () => {
      const start = performance.now()
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`)
        if (progress < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          animate()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [duration, value])

  return <strong ref={ref}>{display}</strong>
}
