import Icon from './../Icon'

const shortcuts = [
  ['←  →', 'Previous or next day'],
  ['↑  ↓', 'Same day, previous or next week'],
  ['Home  End', 'First or last day of the week'],
  ['Page Up  Page Down', 'Previous or next month'],
  ['Shift + Page Up/Down', 'Previous or next year'],
  ['Enter  Space', 'Pick the focused date'],
  ['Esc', 'Close without picking']
]

// Collapsed on small screens, always open from lg up.
const handleToggle = (event) => {
  const toggle = event.currentTarget
  const isExpanded = toggle.getAttribute('aria-expanded') === 'true'

  el('#sidebar-content-1').classList.toggle('hidden', isExpanded)
  toggle.classList.toggle('rotate-180', !isExpanded)
  toggle.setAttribute('aria-expanded', String(!isExpanded))
}

const SideBar = () => (
  <aside class="panel sidebar" aria-labelledby="sidebar-title">
    <div class="sidebar-head">
      <h2 id="sidebar-title" class="panel-title">
        Keyboard
      </h2>
      <button
        id="sidebar-btn-1"
        type="button"
        class="sidebar-toggle lg:hidden"
        aria-controls="sidebar-content-1"
        aria-expanded="false"
        aria-label="Keyboard shortcuts"
        onClick={handleToggle}
      >
        <Icon classes="fa-solid fa-chevron-down" />
      </button>
    </div>
    <div id="sidebar-content-1" class="hidden lg:block">
      <p class="panel-text">The calendar works without a mouse. Inside it:</p>
      <dl class="shortcuts">
        {shortcuts.map(([keys, action]) => (
          <div class="shortcut">
            <dt>
              {keys.split('  ').map((key) => (
                <kbd>{key}</kbd>
              ))}
            </dt>
            <dd>{action}</dd>
          </div>
        ))}
      </dl>
    </div>
  </aside>
)

export default SideBar
