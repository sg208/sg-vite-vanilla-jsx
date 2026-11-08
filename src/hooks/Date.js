// Calendar maths and formatting for the in-house datepicker.
// Names are English (en-GB) to match the page language; weeks start on
// Monday and dates are typed and shown as dd-mm-yyyy.
const LOCALE = 'en-GB'
const DAYS_IN_WEEK = 7
const SHORT_DATE = /^(\d{1,2})-(\d{1,2})-(\d{4})$/
// Typed without separators: ddmmyyyy
const COMPACT_DATE = /^(\d{2})(\d{2})(\d{4})$/

const weekdayShort = new Intl.DateTimeFormat(LOCALE, { weekday: 'short' })
const weekdayLong = new Intl.DateTimeFormat(LOCALE, { weekday: 'long' })
const monthLong = new Intl.DateTimeFormat(LOCALE, { month: 'long' })
const monthShort = new Intl.DateTimeFormat(LOCALE, { month: 'short' })

const pad = (value) => String(value).padStart(2, '0')

const formatShort = (date) =>
  `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`

const formatFull = (date) =>
  date.toLocaleDateString(LOCALE, { dateStyle: 'full' })

const formatMonthHeading = (date) =>
  `${monthLong.format(date)} ${date.getFullYear()}`

// Monday = 0 … Sunday = 6
const weekdayIndex = (date) => (date.getDay() + 6) % DAYS_IN_WEEK

const toISO = (date) =>
  [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join('-')

const fromISO = (iso) => {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const isSameDay = (first, second) =>
  Boolean(first && second) && toISO(first) === toISO(second)

const addDays = (date, amount) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)

// Keeps the day where it can and clamps to the month's last day
// (31 January + 1 month = 28 or 29 February).
const addMonths = (date, amount) => {
  const target = new Date(date.getFullYear(), date.getMonth() + amount, 1)
  const lastDay = new Date(
    target.getFullYear(),
    target.getMonth() + 1,
    0
  ).getDate()
  target.setDate(Math.min(date.getDate(), lastDay))
  return target
}

const startOfWeek = (date) => addDays(date, -weekdayIndex(date))
const endOfWeek = (date) => addDays(date, DAYS_IN_WEEK - 1 - weekdayIndex(date))

// Reads "d-m-yyyy", "dd-mm-yyyy" or "ddmmyyyy" and rejects impossible dates.
const parseShort = (value = '') => {
  const text = value.trim()
  const match = text.match(SHORT_DATE) ?? text.match(COMPACT_DATE)
  if (!match) return null

  const [day, month, year] = match.slice(1).map(Number)
  const date = new Date(year, month - 1, day)
  const isReal = date.getMonth() === month - 1 && date.getDate() === day
  return isReal ? date : null
}

// Whole days from start to end, both included.
const countDays = (start, end) =>
  Math.round((fromISO(toISO(end)) - fromISO(toISO(start))) / 86_400_000) + 1

const describeDay = (date) => ({
  date,
  iso: toISO(date),
  dateShort: formatShort(date),
  dateFull: formatFull(date),
  monthName: monthLong.format(date),
  monthNameShort: monthShort.format(date),
  dayName: weekdayLong.format(date),
  dayNameShort: weekdayShort.format(date),
  display: date.getDate(),
  dayNumber: date.getDay()
})

// A known Monday-to-Sunday week gives the column headings.
const MONDAY = new Date(2024, 0, 1)
const WEEK = Array.from({ length: DAYS_IN_WEEK }, (_, i) => addDays(MONDAY, i))
const DAY_NAMES_SHORT = WEEK.map((day) => weekdayShort.format(day))
const DAY_NAMES_LONG = WEEK.map((day) => weekdayLong.format(day))

export const useDate = () => {
  const dayNames = ref(DAY_NAMES_SHORT)
  const dayNamesLong = ref(DAY_NAMES_LONG)

  // The month's days, led by empty cells so day 1 sits under its weekday.
  const getCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const padStart = Array.from({ length: weekdayIndex(firstDay) }, () => ({
      hidden: true
    }))
    const days = Array.from({ length: daysInMonth }, (_, i) =>
      describeDay(new Date(year, month, i + 1))
    )

    return padStart.concat(days)
  }

  // getCalendar cut into rows of seven, padded at the end.
  const getWeeks = (year, month) => {
    const cells = getCalendar(year, month)
    const padEnd = (DAYS_IN_WEEK - (cells.length % DAYS_IN_WEEK)) % DAYS_IN_WEEK
    const filled = cells.concat(
      Array.from({ length: padEnd }, () => ({ hidden: true }))
    )
    return Array.from({ length: filled.length / DAYS_IN_WEEK }, (_, i) =>
      filled.slice(i * DAYS_IN_WEEK, (i + 1) * DAYS_IN_WEEK)
    )
  }

  return {
    getCalendar,
    getWeeks,
    dayNames,
    dayNamesLong,
    toISO,
    fromISO,
    isSameDay,
    addDays,
    addMonths,
    startOfWeek,
    endOfWeek,
    parseShort,
    countDays,
    formatShort,
    formatFull,
    formatMonthHeading
  }
}
