import { projectVisuals } from '../projectVisuals.js'
import WorldAtmosphere from './WorldAtmosphere.jsx'

export default function ProjectCard({ project }) {
  const visual = projectVisuals[project.id]
  const isVideo = project.link.label === '观看演示'

  return (
    <article id={'project-' + project.id} className={'project-story theme-' + project.theme}>
      <div className="project-story__label">
        <span>PROJECT / {project.index}</span><span>{project.date}</span>
      </div>
      <div className="world-portal">
      <a className="project-cover" href={project.link.href} target="_blank" rel="noreferrer"
        aria-label={project.link.label + '：' + project.title + '（新窗口）'}>
        <img src={visual.image} alt={visual.alt} width="960" height="800" loading="lazy" decoding="async" />
        <span className="project-cover__shade" aria-hidden="true" />
        <WorldAtmosphere />
        <div className="project-cover__top">
          <span className="project-cover__badge"><i aria-hidden="true" />{visual.category}</span>
          <span className="project-cover__art-label">主题插画</span>
        </div>
        <div className="project-cover__caption">
          <span className="project-cover__eyebrow">{visual.eyebrow}</span>
          <h3>{visual.title}<em>{visual.accent}</em></h3>
          <p>{visual.tagline}</p>
          <span className="project-cover__cta"><i aria-hidden="true">{isVideo ? '▶' : '↗'}</i>{project.link.label}<span aria-hidden="true">↗</span></span>
        </div>
      </a>
      </div>
      <div className="project-story__body">
        <div className="project-story__meta"><span>{project.role}</span><span>{visual.note}</span></div>
        <h4>{project.subtitle}</h4>
        <p className="project-story__summary">{project.summary}</p>
        <ul className="project-story__points">
          {project.points.map((point) => <li key={point}>{point}</li>)}
        </ul>
        <div className="project-story__tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      </div>
    </article>
  )
}
