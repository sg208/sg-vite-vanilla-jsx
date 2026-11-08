// Components
import FormInputText from '../FormInputText'

const { validateForms, setFieldError, getFieldError, getRange, describeRange } =
  useForm()

const getFields = () => Array.from(el('input[data-validate="true"]', true))

const updateSummary = () => {
  const summary = el('#form-status')
  if (summary) {
    summary.textContent =
      describeRange(getRange()) || 'Pick a start and an end date.'
  }
}

const handleSubmit = (event) => {
  event.preventDefault()
  validateForms(getFields())
}

// Clears a field's error as soon as it holds a valid date; new errors wait
// for the next submit so nobody is scolded mid-typing.
const handleInput = (event) => {
  const input = event.target
  if (input.getAttribute('aria-invalid') === 'true' && !getFieldError(input)) {
    setFieldError(input)
  }
  updateSummary()
}

const Content = () => (
  <section class="panel lg:col-span-2" aria-labelledby="range-title">
    <div class="panel-head">
      <h2 id="range-title" class="panel-title">
        Date range
      </h2>
      <p class="panel-text">
        Choose when the items start and end. Type a date or open the calendar.
      </p>
    </div>
    <form
      class="grid gap-x-4 gap-y-5 sm:grid-cols-2"
      novalidate
      onSubmit={handleSubmit}
      onInput={handleInput}
    >
      <FormInputText
        id="startDate"
        label="Start date"
        getRange={getRange}
        validate
        datepicker
      />
      <FormInputText
        id="endDate"
        label="End date"
        getRange={getRange}
        validate
        datepicker
      />
      <div class="form-foot sm:col-span-2">
        <p id="form-status" class="form-status">
          Pick a start and an end date.
        </p>
        <button type="submit" class="button-primary">
          Find items
        </button>
      </div>
    </form>
  </section>
)

export default Content
