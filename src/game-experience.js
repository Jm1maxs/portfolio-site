const filter = document.querySelector('.log-filter')
const select = filter.querySelector('select')
const count = filter.querySelector('[role="status"]')
const sections = [...document.querySelectorAll('.log-section')]
const games = [...document.querySelectorAll('.log-section tbody tr')].map(row => ({
  row,
  genre: row.querySelector('small')?.textContent || '未分类',
  hours: parseInt(row.cells[1].textContent, 10),
}))

for (const genre of new Set(games.map(game => game.genre))) {
  select.add(new Option(genre, genre))
}

function showMatches() {
  let matches = 0
  let hours = 0
  for (const game of games) {
    game.row.hidden = Boolean(select.value && game.genre !== select.value)
    if (!game.row.hidden) {
      matches++
      hours += game.hours
    }
  }
  for (const section of sections) {
    section.hidden = !section.querySelector('tbody tr:not([hidden])')
  }
  count.textContent = matches + ' 项经历 · ' + hours.toLocaleString('zh-CN') + ' 小时'
}

select.addEventListener('change', () => {
  showMatches()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  for (const section of sections.filter(section => !section.hidden)) {
    section.animate?.([{opacity: 0.3, transform: 'translateY(6px)'}, {opacity: 1, transform: 'none'}], {duration: 240, easing: 'ease-out'})
  }
})
showMatches()
filter.hidden = false
