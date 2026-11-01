// Grid keys from the WAI-ARIA APG date picker dialog pattern.
// Each entry returns the date that should take focus next.
const { addDays, addMonths, startOfWeek, endOfWeek } = useDate()

const gridMoves = {
  ArrowRight: (date) => addDays(date, 1),
  ArrowLeft: (date) => addDays(date, -1),
  ArrowDown: (date) => addDays(date, 7),
  ArrowUp: (date) => addDays(date, -7),
  Home: (date) => startOfWeek(date),
  End: (date) => endOfWeek(date),
  PageUp: (date, isShift) => addMonths(date, isShift ? -12 : -1),
  PageDown: (date, isShift) => addMonths(date, isShift ? 12 : 1)
}

export const getMovedDate = (event, date) =>
  gridMoves[event.key]?.(date, event.shiftKey) ?? null

export const isSelectKey = (event) => event.key === 'Enter' || event.key === ' '

// Keeps Tab and Shift+Tab inside the open dialog.
export const trapTab = (event, dialog) => {
  if (event.key !== 'Tab') return

  const focusables = Array.from(
    dialog.querySelectorAll('button:not([disabled]), [tabindex="0"]')
  )
  const first = focusables.at(0)
  const last = focusables.at(-1)
  const isLeavingStart = event.shiftKey && document.activeElement === first
  const isLeavingEnd = !event.shiftKey && document.activeElement === last

  if (isLeavingStart || isLeavingEnd) {
    event.preventDefault()
    ;(isLeavingStart ? last : first).focus()
  }
}
