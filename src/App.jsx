import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Strengths from './components/Strengths.jsx'
import Contact from './components/Contact.jsx'
import useSiteMotion from './hooks/useSiteMotion.js'

export default function App() {
  const [atmosphereEnabled, setAtmosphereEnabled] = useState(true)
  useSiteMotion()
  useEffect(() => {
    const header = document.querySelector('[data-header]')
    const onScroll = () => {
      header?.classList.toggle('is-scrolled', window.scrollY > 24)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className={`site-shell${atmosphereEnabled ? '' : ' effects-paused'}`}>
      <Nav />
      <main>
        <Hero atmosphereEnabled={atmosphereEnabled} onToggleAtmosphere={() => setAtmosphereEnabled((enabled) => !enabled)} />
        <Projects />
        <About />
        <Strengths />
        <Contact />
      </main>
    </div>
  )
}
