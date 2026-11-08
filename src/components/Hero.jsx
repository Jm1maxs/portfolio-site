import { useState } from 'react'
import { profile, projects } from '../data.js'
import '../hero-showcase.css'
import FeaturedProjects from './FeaturedProjects.jsx'

export default function Hero({ motionEnabled }) {
  const [featuredIndex, setFeaturedIndex] = useState(0)
  return (
    <section className="showcase" id="top" aria-labelledby="showcase-title">
      {projects.map((project, index) => (
        <div key={project.id} className={'showcase__ambient theme-' + project.theme}
          data-active={index === featuredIndex} data-atmosphere aria-hidden="true" />
      ))}
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
              <a className="btn btn--ghost" href="./game-experience.html">游戏经历 <span aria-hidden="true">↗</span></a>
              <a className="showcase__contact" href="#contact">联系我 <span aria-hidden="true">↗</span></a>
            </div>
            <div className="showcase__skills" aria-label="创作方向"><span>系统设计</span><span>玩法原型</span><span>AI 工作流</span></div>
          </div>
          <FeaturedProjects index={featuredIndex} setIndex={setFeaturedIndex} motionEnabled={motionEnabled} />
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
