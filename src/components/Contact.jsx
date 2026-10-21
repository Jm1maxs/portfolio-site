import { profile } from '../data.js'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="page-width">
        <div className="contact__panel">
          <div className="contact__landscape" aria-hidden="true" />
          <div className="contact__inner">
            <p className="small-label">04 / START A CONVERSATION</p>
            <h2>下一个世界，<br /><em>一起创造。</em></h2>
            <p className="contact__text">如果你正在寻找一名懂系统、能验证、拥抱 AI 工作流的系统策划，<br className="desktop-break" />欢迎聊聊游戏、想法与新的可能。</p>
            <div className="contact__actions">
              <a className="btn btn--solid" href={'mailto:' + profile.email}><span>{profile.email}</span><span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
        <footer className="site-footer"><span>© 2026 计铭一 / JI MINGYI</span><span>用系统构建体验，用好奇探索世界。</span><a href="#top">回到顶部 ↑</a></footer>
      </div>
    </section>
  )
}
