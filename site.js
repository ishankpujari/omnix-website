// Omnix website. No trackers, no cookies, no requests to other sites.

// ── Set these before publishing ────────────────────────────────────────────
// The download: a GitHub Release asset named Omnix.dmg always works with "latest".
const DOWNLOAD_URL = 'https://github.com/ishankpujari/omnix-website/releases/latest/download/Omnix.dmg'
const VERSION = '0.1.2 beta'
// ───────────────────────────────────────────────────────────────────────────

const ready = !DOWNLOAD_URL.includes('YOUR-GITHUB-USERNAME')
for (const link of document.querySelectorAll('[data-download]')) {
  // Until the download is set up, the buttons lead to the install steps instead.
  if (ready) { link.href = DOWNLOAD_URL; link.setAttribute('download', '') }
}
for (const label of document.querySelectorAll('[data-version]')) label.textContent = `Version ${VERSION}`

// The app picture shows a few examples in turn: questions, Storage and Clean up, with the
// sidebar following along.
const convos = [...document.querySelectorAll('[data-convo]')]
const tabs = [...document.querySelectorAll('.mini-link[data-tab]')]
const input = document.querySelector('[data-input]')
// The order the app shows things in: Storage and its map first, then Ask, then Clean up.
const names = ['storage', 'map', 'lease', 'noticed', 'rent', 'picture', 'cleanup', 'plan', 'checklist']
const order = names.map((name) => convos.findIndex((convo) => convo.dataset.name === name)).filter((index) => index >= 0)
const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
function show(convo) {
  const tab = convo.dataset.tab || 'ask'
  for (const link of tabs) link.classList.toggle('on', link.dataset.tab === tab)
  if (input) input.hidden = tab !== 'ask'
}
// Start where the app starts: on Storage.
for (const convo of convos) convo.hidden = convo !== convos[order[0]]
if (convos[order[0]]) show(convos[order[0]])
if (convos.length > 1 && !calm) {
  let step = 0
  setInterval(() => {
    if (document.hidden) return
    convos[order[step]].hidden = true
    step = (step + 1) % order.length
    const next = convos[order[step]]
    next.classList.add('enter')
    next.hidden = false
    show(next)
  }, 5200)
}
