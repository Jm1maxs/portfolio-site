import { useEffect } from 'react'

// Content stays visible before JS runs, if animation fails, and in reduced motion.
export default function useSiteMotion() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const seen = new WeakSet()
    const active = new Set()
    let dispose = () => {}

    const configure = () => {
      dispose()
      if (preference.matches) return

      const cleanups = []
      const atmosphere = document.querySelectorAll('[data-atmosphere]')
      const inView = new Set()
      const syncAtmosphere = () => atmosphere.forEach((layer) => {
        layer.classList.toggle('is-in-view', !document.hidden && inView.has(layer))
      })
      if ('IntersectionObserver' in window) {
        const atmosphereObserver = new IntersectionObserver((entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (isIntersecting) inView.add(target)
            else inView.delete(target)
          })
          syncAtmosphere()
        })
        atmosphere.forEach((layer) => atmosphereObserver.observe(layer))
        document.addEventListener('visibilitychange', syncAtmosphere)
        cleanups.push(() => {
          atmosphereObserver.disconnect()
          document.removeEventListener('visibilitychange', syncAtmosphere)
          atmosphere.forEach((layer) => layer.classList.remove('is-in-view'))
        })
      }
      const targets = document.querySelectorAll(
        '.section-heading, .showcase__intro > *, .showcase__feature, ' +
        '.project-dock__item, .project-story__label, .project-cover, ' +
        '.project-story__body, .designer-card, .about__content, ' +
        '.strength-card, .contact__inner'
      )

      if ('IntersectionObserver' in window && 'animate' in Element.prototype) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting || seen.has(target)) return
            seen.add(target)
            observer.unobserve(target)

            // Only stagger adjacent small items; never delay access to a section.
            const siblings = Array.from(target.parentElement.children)
            const stagger = target.matches('.showcase__intro > *, .project-dock__item, .strength-card')
              ? Math.min(siblings.indexOf(target), 4) * 55 : 0
            const animation = target.animate([
              { opacity: 0, translate: '0 18px' },
              { opacity: 1, translate: '0 0' },
            ], { duration: 680, delay: stagger, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' })
            active.add(animation)
            animation.onfinish = () => active.delete(animation)
            animation.oncancel = () => active.delete(animation)
          })
        }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })
        targets.forEach((target) => { if (!seen.has(target)) observer.observe(target) })
        cleanups.push(() => observer.disconnect())
      }

      if (pointer.matches) {
        document.querySelectorAll('.world-card, .project-cover').forEach((card) => {
          let frame = 0
          const move = (event) => {
            if (event.pointerType === 'touch') return
            cancelAnimationFrame(frame)
            const { clientX, clientY } = event
            frame = requestAnimationFrame(() => {
              // Measure the stationary wrapper so tilt cannot move its own input bounds.
              const rect = (card.closest('.world-portal') || card).getBoundingClientRect()
              const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
              const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
              card.style.setProperty('--art-x', ((x - .5) * 8).toFixed(2) + 'px')
              card.style.setProperty('--art-y', ((y - .5) * 6).toFixed(2) + 'px')
              card.style.setProperty('--light-x', (x * 100).toFixed(1) + '%')
              card.style.setProperty('--light-y', (y * 100).toFixed(1) + '%')
              card.style.setProperty('--tilt-x', ((.5 - y) * 4).toFixed(2) + 'deg')
              card.style.setProperty('--tilt-y', ((x - .5) * 5).toFixed(2) + 'deg')
              card.classList.add('is-exploring')
            })
          }
          const reset = () => {
            cancelAnimationFrame(frame)
            card.classList.remove('is-exploring')
            card.style.removeProperty('--art-x')
            card.style.removeProperty('--art-y')
            card.style.removeProperty('--light-x')
            card.style.removeProperty('--light-y')
            card.style.removeProperty('--tilt-x')
            card.style.removeProperty('--tilt-y')
          }
          card.addEventListener('pointermove', move, { passive: true })
          card.addEventListener('pointerleave', reset)
          card.addEventListener('pointercancel', reset)
          cleanups.push(() => {
            reset()
            card.removeEventListener('pointermove', move)
            card.removeEventListener('pointerleave', reset)
            card.removeEventListener('pointercancel', reset)
          })
        })
      }

      dispose = () => {
        cleanups.forEach((cleanup) => cleanup())
        active.forEach((animation) => animation.cancel())
        active.clear()
      }
    }

    configure()
    preference.addEventListener('change', configure)
    pointer.addEventListener('change', configure)
    return () => {
      dispose()
      preference.removeEventListener('change', configure)
      pointer.removeEventListener('change', configure)
    }
  }, [])
}
