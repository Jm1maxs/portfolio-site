const filter = document.querySelector('.log-filter')
const pills = filter.querySelector('.genre-pills')
const count = filter.querySelector('[role="status"]')
const sections = [...document.querySelectorAll('.log-section')]
const games = [...document.querySelectorAll('.log-section tbody tr')].map(row => ({
  row,
  genre: row.querySelector('small')?.textContent || '未分类',
  hours: parseInt(row.cells[1].textContent, 10),
}))

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
  const reveal = animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let matches = 0
  let hours = 0
  for (const game of games) {
    game.row.hidden = Boolean(genre && game.genre !== genre)
    if (!game.row.hidden) {
      if (reveal) {
        game.row.getAnimations().forEach(animation => animation.cancel())
        game.row.animate([
          { opacity: 0.25, transform: 'translateY(7px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 300, delay: Math.min(matches, 6) * 24, easing: 'ease-out', fill: 'backwards' })
      }
      matches++
      hours += game.hours
    }
  }
  for (const section of sections) {
    section.hidden = !section.querySelector('tbody tr:not([hidden])')
  }
  count.textContent = matches + ' 项经历 · ' + hours.toLocaleString('zh-CN') + ' 小时'
}

showMatches('')
filter.hidden = false
