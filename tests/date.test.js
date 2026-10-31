import { describe, expect, it } from 'vitest'
import { useDate } from '../src/hooks/Date'

const JANUARY = 0

describe('useDate().getCalendar', () => {
  it('returns every day of the month after Monday-first padding', () => {
    const { getCalendar } = useDate()
    // 1 January 2025 is a Wednesday → two empty cells (Mon, Tue)
    const days = getCalendar(2025, JANUARY)
    const hiddenDays = days.filter((day) => day.hidden)
    const realDays = days.filter((day) => !day.hidden)

    expect(hiddenDays).toHaveLength(2)
    expect(realDays).toHaveLength(31)
    expect(realDays[0].display).toBe(1)
    expect(realDays.at(-1).display).toBe(31)
  })

  it('formats dates with the nl-NL locale', () => {
    const { getCalendar } = useDate()
    const firstDay = getCalendar(2025, JANUARY).find((day) => !day.hidden)
    const expected = new Date(2025, JANUARY, 1).toLocaleDateString('nl-NL', {
      dateStyle: 'short'
    })

    expect(firstDay.dateShort).toBe(expected)
  })

  it('builds Monday-first day name headings', () => {
    const { getCalendar, dayNames } = useDate()
    getCalendar(2025, JANUARY)
    const weekdayShort = new Intl.DateTimeFormat('nl-NL', { weekday: 'short' })
    // 6 January 2025 is a Monday, 12 January a Sunday
    const monday = weekdayShort.format(new Date(2025, JANUARY, 6))
    const sunday = weekdayShort.format(new Date(2025, JANUARY, 12))

    expect(dayNames.value).toHaveLength(7)
    expect(dayNames.value[0]).toBe(monday)
    expect(dayNames.value.at(-1)).toBe(sunday)
  })
})
