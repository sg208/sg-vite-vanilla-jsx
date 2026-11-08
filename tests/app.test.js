import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import Index from '../src/pages/Index'

const getByLabel = (label) => document.querySelector(`[aria-label="${label}"]`)
const findButton = () =>
  [...document.querySelectorAll('button')].find(
    (button) => button.textContent.trim() === 'Find items'
  )

const typeInto = (input, value) => {
  input.value = value
  input.dispatchEvent(new Event('input', { bubbles: true }))
}

describe('form picker page', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.querySelector('#app').append(Index())
  })

  // Live regions are filled a moment after they are cleared.
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())
  const flushAnnouncements = () => vi.runAllTimers()

  it('renders the landmarks and both labelled date fields', () => {
    expect(document.querySelector('header h1').textContent).toBe('Form picker')
    expect(document.querySelector('main')).not.toBeNull()
    expect(document.querySelector('label[for=startDate]').textContent).toBe(
      'Start date'
    )
    expect(document.querySelector('label[for=endDate]').textContent).toBe(
      'End date'
    )
  })

  it('renders no empty modal placeholder', () => {
    expect(document.querySelector('#modal-container')).toBeNull()
  })

  it('marks validated fields with a data attribute, not a made-up one', () => {
    const fields = [...document.querySelectorAll('input[data-validate="true"]')]

    expect(fields.map((field) => field.id)).toEqual(['startDate', 'endDate'])
    expect(document.querySelector('input[validate]')).toBeNull()
  })

  it('marks and announces empty fields when Find items is pressed', () => {
    findButton().click()
    expect(document.querySelector('#arialive-assertive').textContent).toBe('')
    flushAnnouncements()

    const start = document.querySelector('#startDate')
    expect(start.getAttribute('aria-invalid')).toBe('true')
    expect(
      document.querySelector('#endDate').getAttribute('aria-invalid')
    ).toBe('true')
    expect(document.querySelector('#startDate-error').hidden).toBe(false)
    expect(start.getAttribute('aria-describedby')).toContain('startDate-error')
    expect(document.activeElement).toBe(start)
    expect(document.querySelector('#arialive-assertive').textContent).toContain(
      'Enter the start date.'
    )
  })

  it('opens the datepicker and writes the picked date into the field', () => {
    const datepicker = document.querySelector('#startDateDatepicker')
    const trigger = getByLabel('Choose start date')

    expect(datepicker.hidden).toBe(true)
    trigger.click()
    expect(datepicker.hidden).toBe(false)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    const firstDay = datepicker.querySelector('[data-iso]')
    firstDay.click()

    const start = document.querySelector('#startDate')
    const [year, month, day] = firstDay.dataset.iso.split('-').map(Number)
    expect(start.value).toBe(
      `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`
    )
    expect(start.getAttribute('aria-invalid')).toBe('false')
    expect(datepicker.hidden).toBe(true)
    expect(document.activeElement).toBe(trigger)
  })

  it('rejects an end date before the start date', () => {
    typeInto(document.querySelector('#startDate'), '10-11-2026')
    typeInto(document.querySelector('#endDate'), '3-11-2026')
    findButton().click()

    expect(document.querySelector('#endDate-error').textContent).toContain(
      'End date is before the start date.'
    )
  })

  it('summarises a valid range on submit and clears old alerts', () => {
    typeInto(document.querySelector('#startDate'), '')
    typeInto(document.querySelector('#endDate'), '')
    findButton().click()
    flushAnnouncements()
    expect(document.querySelector('#arialive-assertive').textContent).not.toBe(
      ''
    )

    typeInto(document.querySelector('#startDate'), '10-11-2026')
    typeInto(document.querySelector('#endDate'), '14-11-2026')
    findButton().click()
    flushAnnouncements()

    expect(
      document.querySelector('#endDate').getAttribute('aria-invalid')
    ).toBe('false')
    expect(document.querySelector('#form-status').textContent).toBe(
      'Finding items from 10-11-2026 to 14-11-2026, 5 days.'
    )
    expect(document.querySelector('#arialive-assertive').textContent).toBe('')
    expect(document.querySelector('#arialive-polite').textContent).toContain(
      'Finding items'
    )
  })

  it('expands the sidebar content on small screens', () => {
    const toggle = getByLabel('Keyboard shortcuts')
    const content = document.querySelector('#sidebar-content-1')

    expect(content.classList).toContain('hidden')
    toggle.click()
    expect(content.classList).not.toContain('hidden')
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(toggle.getAttribute('aria-label')).toBe('Keyboard shortcuts')
  })
})
