// Validation and announcements for the date range form.
export const useForm = () => {
  const { parseShort, formatShort, countDays } = useDate()

  // Clears first so the same message is read out again.
  const announce = (message, isUrgent = false) => {
    const region = el(isUrgent ? '#arialive-assertive' : '#arialive-polite')
    if (!region) return
    region.textContent = ''
    region.textContent = message
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
    const alertRegion = el('#arialive-assertive')
    if (alertRegion) alertRegion.textContent = ''
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
