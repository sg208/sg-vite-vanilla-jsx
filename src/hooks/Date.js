export function useDate() {
  const dayNames = ref([])
  const padStartDays = ref([])

  const getShortDayNamesForHeading = (array) => {
    // TODO we should consider start day for pure i18n
    dayNames.value = array
      .filter((item) => item.dayNumber < 7)
      .splice(0, 7)
      .sort((a, b) => a.dayNumber - b.dayNumber)
      .map((item) => item.dayNameShort)

    // Only tailored for NL Calendar.
    dayNames.value.push(dayNames.value.shift())
  }

  const getCalendar = (year, month) => {
    const date = new Date(year, month, 1)
    const dates = []

    // TODO: The culture should be from browser with user permission to detect, or else en-US as default
    while (date.getMonth() === month) {
      dates.push({
        date: date,
        dateShort: date.toLocaleDateString('nl-NL', {
          dateStyle: 'short'
        }),
        dateFull: date.toLocaleDateString('nl-NL', { dateStyle: 'full' }),
        monthName: new Intl.DateTimeFormat('nl-NL', { month: 'long' }).format(
          date
        ),
        monthNameShort: new Intl.DateTimeFormat('nl-NL', {
          month: 'short'
        }).format(date),
        dayName: new Intl.DateTimeFormat('nl-NL', { weekday: 'long' }).format(
          date
        ),
        dayNameShort: new Intl.DateTimeFormat('nl-NL', {
          weekday: 'short'
        }).format(date),
        display: date.getDate(),
        dayNumber: date.getDay()
      })
      date.setDate(date.getDate() + 1)
    }

    if (dates[0].dayNumber > 0) {
      for (let i = 0; i < dates[0].dayNumber - 1; i++) {
        padStartDays.value.push({ hidden: true })
      }
    }

    getShortDayNamesForHeading(dates)

    if (padStartDays.value.length > 0) {
      return padStartDays.value.concat(dates)
    }

    return dates
  }

  const closeDatepicker = (targetEl) => {
    el(targetEl).classList.add('hidden')
    el(targetEl).classList.ariaHidden = true
  }

  return {
    getCalendar,
    dayNames,
    closeDatepicker
  }
}
