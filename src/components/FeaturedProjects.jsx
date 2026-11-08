import { useEffect, useRef, useState } from 'react'
import { projects } from '../data.js'
import { projectVisuals } from '../projectVisuals.js'
import WorldAtmosphere from './WorldAtmosphere.jsx'

export default function FeaturedProjects({ index, setIndex, atmosphereEnabled, onToggleAtmosphere, motionEnabled }) {
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inView, setInView] = useState(true)
  const panel = useRef(null)
  const current = projects[index]

  useEffect(() => {
    if (!window.IntersectionObserver) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(panel.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!motionEnabled || paused || hovered || focused || !inView) return
    let timer
    const schedule = () => {
      clearTimeout(timer)
      if (!document.hidden) timer = setTimeout(() => setIndex((i) => (i + 1) % projects.length), 3000)
    }
    schedule()
    document.addEventListener('visibilitychange', schedule)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', schedule)
    }
  }, [index, setIndex, motionEnabled, paused, hovered, focused, inView])

  return (
    <section className="showcase__feature" aria-label="精选作品轮播" ref={panel}>
      <div className="showcase__feature-label">
        <span>FEATURED PROJECT</span>
        <div className="showcase__feature-tools">
          <button className="effects-toggle" type="button" aria-pressed={atmosphereEnabled} onClick={onToggleAtmosphere}>
            <span aria-hidden="true">✦</span> 动态氛围 <span aria-hidden="true">{atmosphereEnabled ? '开' : '关'}</span>
          </button>
          <span>{current.index} / {String(projects.length).padStart(2, '0')}</span>
        </div>
      </div>
      <div className="world-portal">
        <a className="world-card" href={current.link.href} target="_blank" rel="noreferrer"
          aria-label={current.link.label + '：' + current.title + '（新窗口）'}
          onPointerEnter={(event) => setHovered(event.pointerType === 'mouse')}
          onPointerLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
          {projects.map((project, i) => {
            const visual = projectVisuals[project.id]
            return (
              <div key={project.id} aria-hidden={i !== index} className={'featured-slide theme-' + project.theme}>
                <img className="world-card__art" src={visual.image} alt={visual.alt} width="960" height="800" fetchPriority={i === 0 ? 'high' : 'low'} />
                <div className="world-card__shade" />
                <div className="world-card__top"><span><i />{visual.category}</span><span className="world-card__art-label">主题插画</span></div>
                <div className="world-card__caption">
                  <span className="world-card__genre">{visual.eyebrow}</span>
                  <h2>{visual.title}<br /><em>{visual.accent}</em></h2>
                  <p>{visual.tagline}</p>
                  <span className="world-card__play"><span className="world-card__icon" aria-hidden="true">{project.link.label === '观看演示' ? '▶' : '↗'}</span>{project.link.label}</span>
                </div>
              </div>
            )
          })}
          <WorldAtmosphere />
        </a>
      </div>
      {motionEnabled && <div className="showcase__feature-foot">
        <button type="button" className="featured-playback" onClick={() => setPaused(!paused)}>
          {paused ? '▶ 继续轮播' : 'Ⅱ 暂停轮播'}
        </button>
      </div>}
    </section>
  )
}
