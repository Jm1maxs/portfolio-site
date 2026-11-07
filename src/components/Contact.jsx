import { useState } from 'react'
import { profile } from '../data.js'

export default function Contact() {
  const [message, setMessage] = useState('')
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setMessage('邮箱已复制：' + profile.email)
    } catch {
      setMessage('请手动复制邮箱：' + profile.email)
    }
  }
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
              <button type="button" className="btn btn--solid" onClick={copyEmail} title="复制联系邮箱">
                <span>联系我</span><span aria-hidden="true">⧉</span>
              </button>
            </div>
            <p className="contact__status" role="status">{message}</p>
          </div>
        </div>
        <footer className="site-footer"><span>© 2026 计铭一 / JI MINGYI</span><span>用系统构建体验，用好奇探索世界。</span><a href="#top">回到顶部 ↑</a></footer>
      </div>
    </section>
  )
}
