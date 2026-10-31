import { beforeAll, describe, expect, it } from 'vitest'
import Index from '../src/pages/Index'

const getByLabel = (label) => document.querySelector(`[aria-label="${label}"]`)

describe('form picker page', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.querySelector('#app').append(Index())
  })

  it('renders the main landmarks and both date fields', () => {
    expect(document.querySelector('header')).not.toBeNull()
    expect(document.querySelector('main')).not.toBeNull()
    expect(document.querySelector('#startDate')).not.toBeNull()
    expect(document.querySelector('#endDate')).not.toBeNull()
    expect(document.querySelector('label[for=startDate]').textContent).toBe(
      'Start date:'
    )
  })

  it('marks empty required fields when Find Items is pressed', () => {
    const findButton = [...document.querySelectorAll('button')].find(
      (button) => button.textContent.trim() === 'Find Items'
    )
    findButton.click()

    expect(document.querySelector('#startDate').classList).toContain(
      '!border-red-500'
    )
    expect(document.querySelector('#endDate').classList).toContain(
      '!border-red-500'
    )
  })

  it('opens the datepicker and writes the picked date into the field', () => {
    const datepicker = document.querySelector('#startDateDatepicker')
    const openButton = datepicker.parentElement.querySelector(
      '[aria-label="Open calendar datepicker"]'
    )

    expect(datepicker.classList).toContain('hidden')
    openButton.click()
    expect(datepicker.classList).not.toContain('hidden')

    const firstDate = datepicker.querySelector('button[data-type=btndate]')
    firstDate.click()

    expect(document.querySelector('#startDate').value).toBe(
      firstDate.dataset.value
    )
    expect(document.querySelector('#startDate').classList).not.toContain(
      '!border-red-500'
    )
    expect(datepicker.classList).toContain('hidden')
  })

  it('expands the sidebar content on small screens', () => {
    const toggle = getByLabel('Expand content')
    const content = document.querySelector('#sidebar-content-1')

    expect(content.classList).toContain('hidden')
    toggle.click()
    expect(content.classList).not.toContain('hidden')
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
  })
})
