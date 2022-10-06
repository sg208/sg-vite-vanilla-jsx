// Components
import DatePicker from '../DatePicker'
import Icon from '../Icon'

const now = new Date()

function FormInputText({
  id,
  placeholder,
  label,
  validate,
  datepicker,
  date = now
}) {
  const datepickerId = `${id}Datepicker`

  const openDatepicker = (event) => {
    event.preventDefault()

    // get other datepickers and hide them
    const otherDatepickers = Array.from(
      el('section[data-mode=datepicker]', true)
    ).filter((el) => {
      return el.id !== datepickerId
    })

    otherDatepickers.forEach((el) => {
      el.classList.add('hidden')
      el.classList.ariaHidden = true
    })

    // open related datepicker
    el(`#${datepickerId}`).classList.toggle('hidden')
    el(`#${datepickerId}`).ariaHidden =
      el(`#${datepickerId}`).ariaHidden === 'true' ? false : true
  }

  return (
    <section class="relative">
      <label for={id} class="sr-only">
        {label}
      </label>

      <input
        id={id}
        class="w-full rounded-md border-2 border-slate-100 p-2"
        type="text"
        placeholder={placeholder}
        validate={validate ? 'true' : 'false'}
      />
      <button
        class="absolute right-1 top-1 text-lg text-slate-300"
        aria-label="Open calendar datepicker"
        onCLick={openDatepicker}
      >
        <Icon classes="fa-regular fa-calendar-days p-2" />
      </button>
      {datepicker && (
        <DatePicker id={datepickerId} calendar={date} triggerEl={`#${id}`} />
      )}
    </section>
  )
}

export default FormInputText
