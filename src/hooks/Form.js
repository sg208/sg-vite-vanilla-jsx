// Validation and announcements for the date range form.

// Pending announcement per live region, so a newer message replaces it.
const pendingAnnouncements = {}
const ANNOUNCE_DELAY_MS = 50

const clearRegion = (selector) => {
  clearTimeout(pendingAnnouncements[selector])
  const region = el(selector)
  if (region) region.textContent = ''
  return region
}

export const useForm = () => {
  const { parseShort, formatShort, countDays } = useDate()

  // Clears now and fills in a later task, so screen readers notice the
  // change even when the same message is repeated.
  const announce = (message, isUrgent = false) => {
    const selector = isUrgent ? '#arialive-assertive' : '#arialive-polite'
    const region = clearRegion(selector)
    if (!region) return
    pendingAnnouncements[selector] = setTimeout(() => {
      region.textContent = message
    }, ANNOUNCE_DELAY_MS)
  }

  const setFieldError = (input, message = '') => {
    const error = el(`#${input.id}-error`)
    const hasError = Boolean(message)

    input.setAttribute('aria-invalid', hasError ? 'true' : 'false')
    if (!error) return
    error.querySelector('span').textContent = message
    error.hidden = !hasError
  }

  const getFieldError = (input) => {
    const label = input.dataset.label ?? 'date'
    if (!input.value.trim()) return `Enter the ${label}.`
    if (!parseShort(input.value)) {
      return `Enter the ${label} as day-month-year, for example ${formatShort(new Date())}.`
    }
    return ''
  }

  // Start and end, when both fields hold a real date.
  const getRange = () => ({
    start: parseShort(el('#startDate')?.value),
    end: parseShort(el('#endDate')?.value)
  })

  const getRangeError = ({ start, end }) =>
    start && end && end < start ? 'End date is before the start date.' : ''

  const describeRange = ({ start, end }) => {
    if (!start || !end || end < start) return ''
    const days = countDays(start, end)
    return `${formatShort(start)} to ${formatShort(end)}, ${days} ${days === 1 ? 'day' : 'days'}`
  }

  const processForm = (range) => {
    // The item search request goes here (see useData).
    const message = `Finding items from ${describeRange(range)}.`
    const status = el('#form-status')
    if (status) status.textContent = message
    // Old errors must not linger in the assertive region.
    clearRegion('#arialive-assertive')
    announce(message)
  }

  const validateForms = (nodes) => {
    const errors = nodes.map((node) => getFieldError(node))
    const range = getRange()
    const rangeError = errors.every((error) => !error)
      ? getRangeError(range)
      : ''
    const endIndex = nodes.findIndex((node) => node.id === 'endDate')
    if (rangeError && endIndex >= 0) errors[endIndex] = rangeError

    nodes.forEach((node, i) => setFieldError(node, errors[i]))

    const messages = errors.filter(Boolean)
    if (messages.length > 0) {
      nodes[errors.findIndex(Boolean)].focus()
      announce(messages.join(' '), true)
      return false
    }

    processForm(range)
    return true
  }

  return {
    validateForms,
    setFieldError,
    getFieldError,
    getRange,
    describeRange,
    announce
  }
}
