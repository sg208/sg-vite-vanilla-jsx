import { beforeEach, describe, expect, it } from 'vitest'
import Index from '../src/pages/Index'

const press = (key, options = {}) =>
  document.activeElement.dispatchEvent(
    new KeyboardEvent('keydown', { key, bubbles: true, ...options })
  )

const focusedIso = () => document.activeElement.dataset.iso
const dialog = () => document.querySelector('#startDateDatepicker')
const trigger = () => document.querySelector('#startDate-trigger')

// Opens the picker on a known date typed into the field.
const openOn = (value) => {
  const input = document.querySelector('#startDate')
  input.value = value
  trigger().click()
}

describe('datepicker keyboard (APG date picker dialog)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.querySelector('#app').append(Index())
  })

  it('is a labelled modal dialog with a grid', () => {
    openOn('15-1-2025')
    const heading = document.getElementById(
      dialog().getAttribute('aria-labelledby')
    )

    expect(dialog().getAttribute('role')).toBe('dialog')
    expect(dialog().getAttribute('aria-modal')).toBe('true')
    expect(heading.textContent).toBe('January 2025')
    expect(dialog().querySelector('[role=grid]')).not.toBeNull()
    expect(dialog().querySelectorAll('th[scope=col]')).toHaveLength(7)
  })

  it('focuses the typed date and marks it selected', () => {
    openOn('15-1-2025')

    expect(focusedIso()).toBe('2025-01-15')
    expect(document.activeElement.getAttribute('aria-selected')).toBe('true')
    expect(document.activeElement.getAttribute('tabindex')).toBe('0')
    expect(dialog().querySelectorAll('[tabindex="0"]')).toHaveLength(1)
  })

  it('marks today with aria-current', () => {
    trigger().click()
    const today = dialog().querySelector('[aria-current=date]')

    expect(today).not.toBeNull()
    expect(document.activeElement).toBe(today)
  })

  it('moves by day and week with the arrow keys', () => {
    openOn('15-1-2025')
    press('ArrowRight')
    expect(focusedIso()).toBe('2025-01-16')
    press('ArrowLeft')
    press('ArrowLeft')
    expect(focusedIso()).toBe('2025-01-14')
    press('ArrowDown')
    expect(focusedIso()).toBe('2025-01-21')
    press('ArrowUp')
    press('ArrowUp')
    expect(focusedIso()).toBe('2025-01-07')
  })

  it('crosses into the next month and updates the heading', () => {
    openOn('31-1-2025')
    press('ArrowRight')

    expect(focusedIso()).toBe('2025-02-01')
    expect(dialog().querySelector('h3').textContent).toBe('February 2025')
  })

  it('jumps to the start and end of the week with Home and End', () => {
    openOn('15-1-2025') // a Wednesday
    press('Home')
    expect(focusedIso()).toBe('2025-01-13') // Monday
    press('End')
    expect(focusedIso()).toBe('2025-01-19') // Sunday
  })

  it('changes month with PageUp/PageDown and year with Shift', () => {
    openOn('31-1-2025')
    press('PageDown')
    expect(focusedIso()).toBe('2025-02-28')
    press('PageUp')
    expect(focusedIso()).toBe('2025-01-28')
    press('PageDown', { shiftKey: true })
    expect(focusedIso()).toBe('2026-01-28')
    press('PageUp', { shiftKey: true })
    expect(focusedIso()).toBe('2025-01-28')
  })

  it('picks the focused date with Enter and returns focus to the trigger', () => {
    openOn('15-1-2025')
    press('ArrowRight')
    press('Enter')

    expect(document.querySelector('#startDate').value).toBe('16-01-2025')
    expect(dialog().hidden).toBe(true)
    expect(document.activeElement).toBe(trigger())
    expect(trigger().getAttribute('aria-label')).toBe(
      'Change start date, 16-01-2025 selected'
    )
  })

  it('closes on Escape without changing the value', () => {
    openOn('15-1-2025')
    press('ArrowDown')
    press('Escape')

    expect(document.querySelector('#startDate').value).toBe('15-1-2025')
    expect(dialog().hidden).toBe(true)
    expect(document.activeElement).toBe(trigger())
    expect(trigger().getAttribute('aria-expanded')).toBe('false')
  })

  it('pages months with the header buttons', () => {
    openOn('15-1-2025')
    dialog().querySelector('[aria-label="Next month"]').click()
    expect(dialog().querySelector('h3').textContent).toBe('February 2025')
    dialog().querySelector('[aria-label="Previous month"]').click()
    dialog().querySelector('[aria-label="Previous month"]').click()
    expect(dialog().querySelector('h3').textContent).toBe('December 2024')
  })

  it('keeps Tab inside the dialog', () => {
    openOn('15-1-2025')
    const close = [...dialog().querySelectorAll('button')].at(-1)
    close.focus()
    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true
    })
    close.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
    expect(document.activeElement).toBe(
      dialog().querySelector('[aria-label="Previous month"]')
    )
  })
})
