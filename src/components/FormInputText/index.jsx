// Components
import DatePicker from '../DatePicker'
import Icon from '../Icon'

const { formatShort } = useDate()

// A date field: visible label, format hint, inline error and a button that
// opens the datepicker dialog.
const FormInputText = ({
  id,
  label,
  validate,
  datepicker,
  getRange,
  class: className = ''
}) => {
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const example = formatShort(new Date())

  const input = (
    <input
      id={id}
      class="field-input"
      type="text"
      autocomplete="off"
      aria-describedby={`${hintId} ${errorId}`}
      data-label={label.toLowerCase()}
      data-validate={validate ? 'true' : 'false'}
    />
  )

  const trigger = (
    <button
      id={`${id}-trigger`}
      type="button"
      class="field-trigger"
      aria-label={`Choose ${label.toLowerCase()}`}
      aria-haspopup="dialog"
      aria-expanded="false"
    >
      <Icon classes="fa-regular fa-calendar" />
    </button>
  )

  const picker =
    datepicker &&
    DatePicker({
      id: `${id}Datepicker`,
      label: label.toLowerCase(),
      input,
      trigger,
      getRange
    })

  const handleTriggerClick = () =>
    picker.isOpen() ? picker.close() : picker.open()

  if (picker) trigger.addEventListener('click', handleTriggerClick)

  return (
    <div class={`field relative ${className}`}>
      <label for={id} class="field-label">
        {label}
      </label>
      <div class="relative">
        {input}
        {picker && trigger}
      </div>
      <p id={hintId} class="field-hint">
        Day-month-year, for example {example}
      </p>
      <p id={errorId} class="field-error" hidden>
        <Icon classes="fa-solid fa-circle-exclamation" />
        <span />
      </p>
      {picker?.element}
    </div>
  )
}

export default FormInputText
