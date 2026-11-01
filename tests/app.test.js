import { beforeAll, describe, expect, it } from 'vitest'
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

  it('marks and announces empty fields when Find items is pressed', () => {
    findButton().click()

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

  it('summarises a valid range on submit', () => {
    typeInto(document.querySelector('#endDate'), '14-11-2026')
    findButton().click()

    expect(
      document.querySelector('#endDate').getAttribute('aria-invalid')
    ).toBe('false')
    expect(document.querySelector('#form-status').textContent).toBe(
      'Finding items from 10-11-2026 to 14-11-2026, 5 days.'
    )
  })

  it('expands the sidebar content on small screens', () => {
    const toggle = getByLabel('Expand content')
    const content = document.querySelector('#sidebar-content-1')

    expect(content.classList).toContain('hidden')
    toggle.click()
    expect(content.classList).not.toContain('hidden')
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(toggle.getAttribute('aria-label')).toBe('Hide content')
  })
})
