import SectionHeading from './SectionHeading.jsx'
import ProjectCard from './ProjectCard.jsx'
import { projects } from '../data.js'

export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="page-width">
        <div className="section-intro">
          <SectionHeading index="01" label="SELECTED WORLDS" title="作品里的世界" />
          <p>从玩法原型到系统拆解，<br />让每个想法，都有可探索的形状。</p>
        </div>
        <div className="projects__grid">
          {projects.map((project) => <ProjectCard project={project} key={project.id} />)}
        </div>
      </div>
    </section>
  )
}
