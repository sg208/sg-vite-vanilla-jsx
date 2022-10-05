const { getCalendar, dayNames, closeDatepicker } = useDate()

// TODO: Datepicker needs to be keyboard accessible with arrow keys in addition to ESC key.
function DatePicker({ id, calendar, triggerEl }) {
  const dates = getCalendar(calendar.getFullYear(), calendar.getMonth())
  const monthName = dates.find((date) => date.monthName).monthName
  const calendarHeading = `${monthName} ${calendar.getFullYear()}`

  const clickDate = (event) => {
    event.preventDefault()

    // Remove previously selected date
    Array.from(el(`#${id} button[data-type="btndate"]`)).map((item) => {
      item.classList.remove('bg-red-500')
      item.classList.remove('text-white')
      item.classList.remove('font-semibold')
      el(triggerEl).classList.remove('!border-red-500')
    })

    // TODO: This should be done as a single class
    event.target.classList.add('bg-red-500')
    event.target.classList.add('text-white')
    event.target.classList.add('font-semibold')

    // Inject the selected date to the triggerEl (form field)
    el(triggerEl).value = event.target.dataset.value

    closeDatepicker(`#${id}`)
  }

  const calendarItem = dates.map((item) => {
    if (item.hidden) {
      return <div class="invisible w-9 p-2" aria-hidden="true" />
    }

    return (
      <button
        class="w-9 rounded-md p-2 text-sm hover:bg-slate-100 hover:text-red-500 disabled:cursor-auto disabled:text-slate-300 disabled:hover:bg-white"
        role="listitem"
        aria-label={`Select ${item.dateFull}`}
        onClick={clickDate}
        data-value={item.dateShort}
        data-type="btndate"
      >
        {item.display}
      </button>
    )
  })

  const calendarDayNamesHeading = (array) => {
    return array.map((item) => (
      <div class="w-9 p-2 text-sm" role="listitem">
        {item}
      </div>
    ))
  }

  const clickCloseDatepicker = (event) => {
    event.preventDefault()
    el(triggerEl).focus()
    closeDatepicker(`#${id}`)
  }

  return (
    <section
      id={id}
      class="absolute mt-2 hidden w-72 rounded-md border-2 border-slate-100 bg-white p-2.5"
      aria-hidden="true"
      data-mode="datepicker"
    >
      <div class="flex flex-col">
        <div class="flex flex-row rounded-md bg-slate-100 p-2 text-center">
          <button
            ref="arrow-left"
            class="w-1/6"
            aria-hidden="false"
            aria-label="Go to previous month calendar"
          >
            &#8592;
          </button>
          <div class="w-4/6">{calendarHeading}</div>
          <button
            ref="arrow-right"
            class="w-1/6"
            aria-hidden="false"
            aria-label="Go to next month calendar"
          >
            &#8594;
          </button>
        </div>
        <div class="flex flex-wrap gap-x-0.5 gap-y-0.5 pt-0.5 " role="list">
          {calendarDayNamesHeading(dayNames.value)}
        </div>
        <div class="flex flex-wrap gap-x-0.5 gap-y-0.5 pt-0.5 " role="list">
          {calendarItem}
        </div>
        <button
          class="mt-2 rounded-md bg-slate-100 p-2 text-sm hover:bg-red-500 hover:text-white"
          onClick={clickCloseDatepicker}
        >
          Close datepicker
        </button>
      </div>
    </section>
  )
}

export default DatePicker
