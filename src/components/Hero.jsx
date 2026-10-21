import { profile, projects } from '../data.js'
import '../hero-showcase.css'
import WorldAtmosphere from './WorldAtmosphere.jsx'

export default function Hero({ atmosphereEnabled, onToggleAtmosphere }) {
  const featured = projects[0]
  return (
    <section className="showcase" id="top" aria-labelledby="showcase-title">
      <div className="showcase__ambient" data-atmosphere aria-hidden="true" />
      <div className="page-width">
        <div className="showcase__layout">
          <div className="showcase__intro">
            <p className="showcase__eyebrow"><span /> GAME DESIGN PORTFOLIO / 2026</p>
            <p className="showcase__name">你好，我是{profile.name}<span> / JI MINGYI</span></p>
            <h1 id="showcase-title">从一个想法，<br />到一个<span>可玩的世界。</span></h1>
            <p className="showcase__role">游戏设计师 <span>×</span> 系统策划</p>
            <p className="showcase__description">用系统构建体验，用原型验证想法。<br />探索叙事、玩法与 AI 辅助创作的更多可能。</p>
            <div className="showcase__actions">
              <a className="btn btn--solid" href="#projects"><span>探索我的作品</span><span aria-hidden="true">↗</span></a>
              <a className="showcase__contact" href="#contact">联系我 <span aria-hidden="true">↗</span></a>
            </div>
            <div className="showcase__skills" aria-label="创作方向"><span>系统设计</span><span>玩法原型</span><span>AI 工作流</span></div>
          </div>
          <div className="showcase__feature">
            <div className="showcase__feature-label">
              <span>FEATURED PROJECT</span>
              <div className="showcase__feature-tools">
                <button className="effects-toggle" type="button" aria-pressed={atmosphereEnabled} onClick={onToggleAtmosphere}>
                  <span aria-hidden="true">✦</span> 动态氛围 <span aria-hidden="true">{atmosphereEnabled ? '开' : '关'}</span>
                </button>
                <span>01 / 04</span>
              </div>
            </div>
            <div className="world-portal">
            <a className="world-card" href={featured.link.href} target="_blank" rel="noreferrer" aria-label={`观看 ${featured.title} 游戏演示（新窗口）`}>
              <img className="world-card__art" src={import.meta.env.BASE_URL + 'art/campus-world.svg'} alt="校园主题插画：暮色中的教学楼、树木与探索校园的像素角色" width="960" height="800" fetchPriority="high" />
              <div className="world-card__shade" />
              <WorldAtmosphere />
              <div className="world-card__top"><span><i /> 独立游戏开发</span><span className="world-card__art-label">主题插画</span></div>
              <div className="world-card__caption">
                <span className="world-card__genre">2D PIXEL / NARRATIVE / GODOT</span>
                <h2>My Campus<br /><em>L.I.F.E.</em></h2>
                <p>在像素校园里，探索生活的另一种可能。</p>
                <span className="world-card__play"><span aria-hidden="true">▶</span> 观看游戏演示 <span aria-hidden="true">↗</span></span>
              </div>
            </a>
            </div>
            <div className="showcase__feature-foot"><span>策划 · 开发 · AI 辅助创作</span><span>2026 — ONGOING</span></div>
          </div>
        </div>
        <nav className="project-dock" aria-label="作品快捷入口">
          <div className="project-dock__heading"><span>SELECTED WORKS</span><strong>进入我的游戏世界 <span aria-hidden="true">↓</span></strong></div>
          <div className="project-dock__items">
            {projects.map((project) => (
              <a key={project.id} className={`project-dock__item theme-${project.theme}`} href={`#project-${project.id}`}>
                <span className="project-dock__number">{project.index}</span>
                <span className="project-dock__text"><strong>{project.title.split(' · ')[0]}</strong><small>{project.role} / {project.tags[0]}</small></span>
                <span className="project-dock__arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </section>
  )
}
