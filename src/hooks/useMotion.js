import { useEffect } from 'react'

const coarse = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

export function useTilt(ref, { max = 8 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el || coarse()) return undefined
    let frame = 0

    const move = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width
        const py = (event.clientY - rect.top) / rect.height
        el.style.setProperty('--rx', `${((py - 0.5) * -2 * max).toFixed(2)}deg`)
        el.style.setProperty('--ry', `${((px - 0.5) * 2 * max).toFixed(2)}deg`)
        el.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`)
        el.style.setProperty('--my', `${(py * 100).toFixed(2)}%`)
        el.classList.add('is-tilting')
      })
    }

    const leave = () => {
      cancelAnimationFrame(frame)
      el.classList.remove('is-tilting')
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [ref, max])
}

export function useSpotlight(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || coarse()) return undefined
    let frame = 0

    const move = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const px = ((event.clientX - rect.left) / rect.width) * 100
        const py = ((event.clientY - rect.top) / rect.height) * 100
        el.style.setProperty('--cx', `${px.toFixed(2)}%`)
        el.style.setProperty('--cy', `${py.toFixed(2)}%`)
        el.classList.add('is-spotlit')
      })
    }

    const leave = () => {
      cancelAnimationFrame(frame)
      el.classList.remove('is-spotlit')
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [ref])
}

export function usePointerParallax(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || coarse()) return undefined

    const move = (event) => {
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      el.style.setProperty('--px', px.toFixed(3))
      el.style.setProperty('--py', py.toFixed(3))
      el.classList.add('is-moving')
    }

    const leave = () => el.classList.remove('is-moving')

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [ref])
}

export function useMagnetic(ref, { strength = 0.28 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el || coarse()) return undefined
    let frame = 0

    const move = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const dx = event.clientX - (rect.left + rect.width / 2)
        const dy = event.clientY - (rect.top + rect.height / 2)
        el.style.setProperty('--mx', `${(dx * strength).toFixed(1)}px`)
        el.style.setProperty('--my', `${(dy * strength).toFixed(1)}px`)
        el.classList.add('is-magnetized')
      })
    }

    const leave = () => {
      cancelAnimationFrame(frame)
      el.classList.remove('is-magnetized')
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [ref, strength])
}

export function useActiveSection() {
  useEffect(() => {
    const links = [...document.querySelectorAll('.nav__links a')]
    const sections = links
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean)

    const setActive = (id) => {
      links.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === id)
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
}

export function useScrollProgress() {
  useEffect(() => {
    const onScroll = () => {
      const html = document.documentElement
      const max = html.scrollHeight - html.clientHeight
      const progress = max > 0 ? (html.scrollTop / max) * 100 : 0
      document.body.style.setProperty('--scroll', `${progress}%`)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}
