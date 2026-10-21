import SectionHeading from './SectionHeading.jsx'
import StrengthCard from './StrengthCard.jsx'
import { strengths } from '../data.js'

export default function Strengths() {
  return (
    <section className="strengths section" id="strengths">
      <div className="page-width">
        <SectionHeading index="03" label="CAPABILITIES" title="个人优势" />

        <div className="strengths__grid">
          {strengths.map((item, index) => (
            <StrengthCard item={item} index={index} key={item.index} />
          ))}
        </div>
      </div>
    </section>
  )
}
