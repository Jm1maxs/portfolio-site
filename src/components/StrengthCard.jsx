const iconPaths = {
  sys: <><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="21" y="4" width="7" height="7" rx="1" /><rect x="12" y="22" width="8" height="7" rx="1" /><path d="M7.5 11v5h17v-5M16 16v6" /></>,
  engine: <><path d="m16 3 12 7v13l-12 7-12-7V10zM4 10l12 7 12-7M16 17v13" /><path d="m10 7 12 7" /></>,
  ai: <><path d="m16 2 4 10 10 4-10 4-4 10-4-10-10-4 10-4zM26 2v6M23 5h6" /></>,
  tools: <><path d="m5 23 17-17 5 5-17 17-7 2zM18 10l5 5M5 23l5 5" /><path d="M4 5h10M4 10h5M23 23h6M23 28h6" /></>,
}

export default function StrengthCard({ item }) {
  return (
    <article className="strength-card">
      <div className="strength-card__top">
        <svg viewBox="0 0 32 32" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">{iconPaths[item.icon]}</svg>
        <span>{item.index} / CAPABILITY</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  )
}
