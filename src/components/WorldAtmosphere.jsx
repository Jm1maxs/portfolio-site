// Fixed positions keep the composition stable between renders.
const motes = [
  [12, 32, 3, 7.6, -2.2, 16], [26, 60, 2, 9.2, -5.1, -12],
  [43, 21, 3, 8.4, -1.5, 20], [58, 47, 2, 10.2, -6.3, -18],
  [74, 28, 4, 8.8, -3.7, 14], [88, 59, 2, 11.4, -8.4, -15],
  [33, 74, 3, 9.8, -4.8, 12], [67, 77, 2, 7.8, -1.9, -20],
]

export default function WorldAtmosphere() {
  return (
    <span className="world-atmosphere" data-atmosphere aria-hidden="true">
      <span className="world-atmosphere__sweep" />
      {motes.map(([x, y, size, duration, delay, drift], index) => (
        <i className="world-atmosphere__mote" key={index} style={{
          '--mote-x': `${x}%`, '--mote-y': `${y}%`, '--mote-size': `${size}px`,
          '--mote-duration': `${duration}s`, '--mote-delay': `${delay}s`,
          '--mote-drift': `${drift}px`,
        }} />
      ))}
    </span>
  )
}
