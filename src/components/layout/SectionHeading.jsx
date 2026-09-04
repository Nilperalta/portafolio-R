export default function SectionHeading({ eyebrow, title, accent, description, centered = false }) {
  return (
    <div className={`section-heading ${centered ? 'centered' : ''}`}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title} <span>{accent}</span></h2>
      </div>
      {description && <p className="section-heading-description">{description}</p>}
    </div>
  )
}
