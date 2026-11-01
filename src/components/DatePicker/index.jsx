// Date picker dialog, built to the WAI-ARIA APG date picker dialog pattern:
// https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/
import Icon from '../Icon'
import Weeks from './Weeks'
import { getMovedDate, isSelectKey, trapTab } from './keys'
import './datepicker.css'

const {
  dayNames,
  dayNamesLong,
  getCalendar,
  addMonths,
  fromISO,
  parseShort,
  formatShort,
  formatMonthHeading
} = useDate()

// Only one picker is open at a time.
const openPicker = ref(null)

const DatePicker = ({ id, label, input, trigger, getRange }) => {
  const headingId = `${id}-heading`
  const state = { viewMonth: new Date(), focusedDate: new Date() }

  getCalendar(state.viewMonth.getFullYear(), state.viewMonth.getMonth())

  const heading = (
    <h3 id={headingId} class="datepicker-heading" aria-live="polite" />
  )
  const body = <tbody />

  const render = (shouldFocus = false) => {
    state.viewMonth = new Date(
      state.focusedDate.getFullYear(),
      state.focusedDate.getMonth(),
      1
    )
    // Only on change, so the polite heading is not re-announced per day.
    const headingText = formatMonthHeading(state.viewMonth)
    if (heading.textContent !== headingText) heading.textContent = headingText
    body.replaceChildren(
      ...Weeks({
        viewMonth: state.viewMonth,
        focusedDate: state.focusedDate,
        selectedDate: parseShort(input.value),
        today: new Date(),
        range: getRange?.() ?? {}
      })
    )
    if (shouldFocus) body.querySelector('[tabindex="0"]')?.focus()
  }

  const isOpen = () => !dialog.hidden

  const handleOutsidePointer = (event) => {
    if (!dialog.contains(event.target) && !trigger.contains(event.target)) {
      close(false)
    }
  }

  const close = (shouldReturnFocus = true) => {
    if (!isOpen()) return
    dialog.hidden = true
    dialog.classList.remove('is-flipped')
    trigger.setAttribute('aria-expanded', 'false')
    document.removeEventListener('pointerdown', handleOutsidePointer)
    openPicker.value = null
    if (shouldReturnFocus) trigger.focus()
  }

  const open = () => {
    openPicker.value?.close(false)
    state.focusedDate = parseShort(input.value) ?? new Date()
    dialog.hidden = false
    trigger.setAttribute('aria-expanded', 'true')
    render(true)
    openPicker.value = { close }
    document.addEventListener('pointerdown', handleOutsidePointer)

    // Keep the dialog inside the viewport on narrow two-column layouts.
    const rect = dialog.getBoundingClientRect()
    dialog.classList.toggle('is-flipped', rect.right > window.innerWidth - 8)
    dialog.scrollIntoView?.({ block: 'nearest' })
  }

  const select = (date) => {
    input.value = formatShort(date)
    input.dispatchEvent(new Event('input', { bubbles: true }))
    close()
  }

  // The trigger name follows whatever the field holds, typed or picked.
  const updateTriggerLabel = () => {
    const date = parseShort(input.value)
    trigger.setAttribute(
      'aria-label',
      date
        ? `Change ${label}, ${formatShort(date)} selected`
        : `Choose ${label}`
    )
  }

  input.addEventListener('input', updateTriggerLabel)

  const moveFocus = (date) => {
    state.focusedDate = date
    render(true)
  }

  // Focus stays on the month button so it can be pressed again.
  const handleMonthStep = (amount) => () => {
    state.focusedDate = addMonths(state.focusedDate, amount)
    render(false)
  }

  const handleGridKeydown = (event) => {
    const movedDate = getMovedDate(event, state.focusedDate)
    if (movedDate) {
      event.preventDefault()
      moveFocus(movedDate)
      return
    }
    if (isSelectKey(event)) {
      event.preventDefault()
      select(state.focusedDate)
    }
  }

  const handleGridClick = (event) => {
    const cell = event.target.closest('[data-iso]')
    if (cell) select(fromISO(cell.dataset.iso))
  }

  const handleDialogKeydown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      close()
      return
    }
    trapTab(event, dialog)
  }

  const dialog = (
    <div
      id={id}
      class="datepicker"
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      data-mode="datepicker"
      hidden
      onKeyDown={handleDialogKeydown}
    >
      <div class="datepicker-header">
        <button
          type="button"
          class="datepicker-step"
          aria-label="Previous month"
          onClick={handleMonthStep(-1)}
        >
          <Icon classes="fa-solid fa-chevron-left" />
        </button>
        {heading}
        <button
          type="button"
          class="datepicker-step"
          aria-label="Next month"
          onClick={handleMonthStep(1)}
        >
          <Icon classes="fa-solid fa-chevron-right" />
        </button>
      </div>
      <table
        class="datepicker-grid"
        role="grid"
        aria-labelledby={headingId}
        onKeyDown={handleGridKeydown}
        onClick={handleGridClick}
      >
        <thead>
          <tr>
            {dayNames.value.map((name, i) => (
              <th scope="col" abbr={dayNamesLong.value[i]}>
                {name}
              </th>
            ))}
          </tr>
        </thead>
        {body}
      </table>
      <div class="datepicker-footer">
        <button type="button" class="datepicker-close" onClick={() => close()}>
          Close
        </button>
      </div>
    </div>
  )

  render()
  return { element: dialog, open, close, isOpen }
}

export default DatePicker
