// Components
import DatePicker from '../DatePicker'

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

  const showDatepicker = () => {
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
    el(`#${datepickerId}`).classList.remove('hidden')
    el(`#${datepickerId}`).ariaHidden = false
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
        onFocus={showDatepicker}
      />
      {datepicker && (
        <DatePicker id={datepickerId} calendar={date} triggerEl={`#${id}`} />
      )}
    </section>
  )
}

export default FormInputText
