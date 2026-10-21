export default function SectionHeading({ index, label, title, align = 'left' }) {
  return (
    <div className={`section-heading align-${align}`} data-reveal>
      <div className="section-heading__top">
        <span className="section-heading__index">{index}</span>
        <span className="section-heading__rule" aria-hidden="true" />
        <span className="section-heading__label">{label}</span>
      </div>
      <h2 className="section-heading__title">{title}</h2>
    </div>
  )
}
