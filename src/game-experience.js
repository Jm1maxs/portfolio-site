const filter = document.querySelector('.log-filter')
const pills = filter.querySelector('.genre-pills')
const count = filter.querySelector('[role="status"]')
const sections = [...document.querySelectorAll('.log-section')]
const games = [...document.querySelectorAll('.log-section tbody tr')].map(row => ({
  row,
  genre: row.querySelector('small')?.textContent || '未分类',
  hours: parseInt(row.cells[1].textContent, 10),
}))
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
const animations = new Set()
const seen = new WeakSet()

function cancelMotion() {
  animations.forEach(animation => animation.cancel())
  animations.clear()
}

function animateElement(element, keyframes, options = {}) {
  if (motionPreference.matches || document.hidden || !element.animate) return
  element.getAnimations().forEach(animation => animation.cancel())
  const animation = element.animate(keyframes, {
    duration: 440, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards', ...options,
  })
  animations.add(animation)
  animation.onfinish = animation.oncancel = () => animations.delete(animation)
}

function revealRow(row, delay = 0) {
  seen.add(row)
  animateElement(row, [
    { opacity: 0, transform: 'translateY(12px)' },
    { opacity: 1, transform: 'translateY(0)' },
  ], { delay })
}

motionPreference.addEventListener('change', cancelMotion)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) cancelMotion()
})

for (const genre of ['', ...new Set(games.map(game => game.genre))]) {
  const button = document.createElement('button')
  button.type = 'button'
  button.textContent = genre || '全部类型'
  button.setAttribute('aria-pressed', String(!genre))
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return
    pills.querySelector('[aria-pressed="true"]').setAttribute('aria-pressed', 'false')
    button.setAttribute('aria-pressed', 'true')
    showMatches(genre, true)
  })
  pills.append(button)
}

function showMatches(genre, animate = false) {
  cancelMotion()
  const positions = sections.map(section => section.hidden ? null : section.getBoundingClientRect().top)
  let matches = 0
  let hours = 0
  for (const game of games) {
    game.row.hidden = Boolean(genre && game.genre !== genre)
    if (!game.row.hidden) {
      matches++
      hours += game.hours
    }
  }
  for (const section of sections) {
    section.hidden = !section.querySelector('tbody tr:not([hidden])')
  }
  count.textContent = matches + ' 项经历 · ' + hours.toLocaleString('zh-CN') + ' 小时'
  if (!animate) return
  sections.forEach((section, index) => {
    if (section.hidden) return
    const shift = positions[index] === null ? 0 : positions[index] - section.getBoundingClientRect().top
    if (Math.abs(shift) < 180) {
      animateElement(section, [
        { transform: 'translateY(' + shift + 'px)' },
        { transform: 'translateY(0)' },
      ])
    }
  })
  let stagger = 0
  games.forEach(({ row }) => {
    if (row.hidden) return
    const bounds = row.getBoundingClientRect()
    if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
      revealRow(row, Math.min(stagger++, 6) * 35)
    }
  })
  animateElement(count, [{ opacity: 0.2, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }])
}

showMatches('')
filter.hidden = false

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    let stagger = 0
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting || seen.has(target)) return
      revealRow(target, Math.min(stagger++, 6) * 35)
      observer.unobserve(target)
    })
  }, { threshold: 0.1 })
  games.forEach(({ row }) => observer.observe(row))
}
