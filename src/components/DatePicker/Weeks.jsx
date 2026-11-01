// Table rows for one month. Exactly one day carries tabindex="0" (roving
// focus); the selected day has aria-selected, today has aria-current.
const { getWeeks, isSameDay, toISO } = useDate()

const isInRange = (date, range) =>
  Boolean(range.start && range.end) &&
  toISO(date) >= toISO(range.start) &&
  toISO(date) <= toISO(range.end)

const DayCell = ({ day, focusedDate, selectedDate, today, range }) => {
  if (day.hidden) {
    return <td class="datepicker-pad" />
  }

  const isFocused = isSameDay(day.date, focusedDate)
  const isSelected = isSameDay(day.date, selectedDate)
  const isRangeEdge =
    isSameDay(day.date, range.start) || isSameDay(day.date, range.end)

  return (
    <td
      class="datepicker-day"
      tabindex={isFocused ? '0' : '-1'}
      aria-label={day.dateFull}
      aria-selected={isSelected ? 'true' : false}
      aria-current={isSameDay(day.date, today) ? 'date' : false}
      data-iso={day.iso}
      data-in-range={isInRange(day.date, range) ? 'true' : false}
      data-range-edge={isRangeEdge ? 'true' : false}
    >
      {day.display}
    </td>
  )
}

const Weeks = ({ viewMonth, ...state }) =>
  getWeeks(viewMonth.getFullYear(), viewMonth.getMonth()).map((week) => (
    <tr>{week.map((day) => DayCell({ day, ...state }))}</tr>
  ))

export default Weeks
