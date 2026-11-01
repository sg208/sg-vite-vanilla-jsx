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

  it('keeps dd-mm-yyyy and uses English names', () => {
    const { getCalendar } = useDate()
    const firstDay = getCalendar(2025, JANUARY).find((day) => !day.hidden)

    expect(firstDay.dateShort).toBe('01-01-2025')
    expect(firstDay.dateFull).toMatch(/^Wednesday,? 1 January 2025$/)
    expect(firstDay.monthName).toBe('January')
  })

  it('builds Monday-first day name headings', () => {
    const { getCalendar, dayNames } = useDate()
    getCalendar(2025, JANUARY)
    const weekdayShort = new Intl.DateTimeFormat('en-GB', { weekday: 'short' })
    // 6 January 2025 is a Monday, 12 January a Sunday
    const monday = weekdayShort.format(new Date(2025, JANUARY, 6))
    const sunday = weekdayShort.format(new Date(2025, JANUARY, 12))

    expect(dayNames.value).toHaveLength(7)
    expect(dayNames.value[0]).toBe(monday)
    expect(dayNames.value.at(-1)).toBe(sunday)
  })
})

describe('useDate padding', () => {
  it('pads six cells when a month starts on a Sunday', () => {
    const { getCalendar } = useDate()
    // 1 June 2025 is a Sunday
    const days = getCalendar(2025, 5)

    expect(days.filter((day) => day.hidden)).toHaveLength(6)
  })

  it('does not add padding again on repeat calls', () => {
    const { getCalendar } = useDate()
    getCalendar(2025, JANUARY)
    const days = getCalendar(2025, JANUARY)

    expect(days.filter((day) => day.hidden)).toHaveLength(2)
  })

  it('cuts the month into full weeks', () => {
    const { getWeeks } = useDate()
    const weeks = getWeeks(2025, 5)

    expect(weeks).toHaveLength(6)
    expect(weeks.every((week) => week.length === 7)).toBe(true)
  })

  it('parses d-m-yyyy and rejects impossible dates', () => {
    const { parseShort } = useDate()

    expect(parseShort('29-2-2024')?.getDate()).toBe(29)
    expect(parseShort('29-2-2025')).toBeNull()
    expect(parseShort('2025-01-01')).toBeNull()
  })

  it('parses ddmmyyyy typed without separators', () => {
    const { parseShort, toISO } = useDate()

    expect(toISO(parseShort('15012025'))).toBe('2025-01-15')
    expect(parseShort('31022025')).toBeNull()
    expect(parseShort('1512025')).toBeNull()
  })
})
