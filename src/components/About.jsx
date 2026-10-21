import SectionHeading from './SectionHeading.jsx'
import { profile } from '../data.js'

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="page-width">
        <SectionHeading index="02" label="BEHIND THE WORLDS" title="世界背后的设计者" />
        <div className="about__grid">
          <div className="designer-card">
            <div className="designer-card__scene">
              <img src={import.meta.env.BASE_URL + 'art/campus-world.svg'} alt="" loading="lazy" width="960" height="800" />
              <span>PLAYER / CREATOR</span>
              <div className="designer-card__initials" aria-hidden="true">JM<span>↗</span></div>
            </div>
            <div className="designer-card__body">
              <p className="small-label">DESIGNER PROFILE / 2026</p>
              <h3>{profile.name}<span>JI MINGYI</span></h3>
              <p>{profile.role}</p>
              <div className="designer-card__status"><i />寻找游戏设计的更多可能</div>
            </div>
          </div>
          <div className="about__content">
            <p className="about__role">保持玩家的好奇，建立设计者的秩序。</p>
            <h3>把想法拆成系统，<br /><em>把系统做成体验。</em></h3>
            {profile.bio.map((text) => <p className="about__text" key={text}>{text}</p>)}
            <dl className="about__meta">
              <div><dt>教育背景</dt><dd>{profile.education}</dd></div>
              <div><dt>创作工具</dt><dd>Unity / Godot · Axure / XMind · AI Agent</dd></div>
            </dl>
            <div className="about__stats">
              {profile.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
            </div>
            <div className="about__tags">{profile.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
