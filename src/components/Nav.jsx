import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data.js'
import { useActiveSection, useScrollProgress } from '../hooks/useMotion.js'

export default function Nav() {
  const [open, setOpen] = useState(false)
  useActiveSection()
  useScrollProgress()
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        document.getElementById('nav-toggle')?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])
  return (
    <header className={'nav' + (open ? ' has-menu' : '')} data-header>
      <a className="nav__brand" href="#top" aria-label="返回首页" onClick={() => setOpen(false)}>
        <span className="nav__brand-mark">JM<span>·</span></span>
        <span className="nav__brand-text"><strong>{profile.name}</strong><small>GAME & SYSTEM DESIGN</small></span>
      </a>
      <button className="nav__toggle" id="nav-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? '关闭 ×' : '菜单 ☰'}</button>
      <nav id="main-navigation" className={'nav__links' + (open ? ' is-open' : '')} aria-label="主导航">
        {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}><sup>{link.index}</sup>{link.label}</a>)}
      </nav>
      <a className="nav__cta" href="#contact" onClick={() => setOpen(false)}>聊聊合作 <span aria-hidden="true">↗</span></a>
      <span className="nav__progress" aria-hidden="true" />
    </header>
  )
}
