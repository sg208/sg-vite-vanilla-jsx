// Components
import FormInputText from '../FormInputText'

const { validateForms } = useForm()
const findItems = (event) => {
  event.preventDefault()

  validateForms(Array.from(el('input[validate=true]', true)))
}

const renderContent = (
  <section class="p-5 lg:h-screen lg:w-3/4 lg:border-r-2 lg:border-r-slate-50">
    <h1 class="pb-5 text-2xl font-bold">Form Picker</h1>
    <p>Find available objects to rent based on date range.</p>
    <form class="mt-5 flex flex-col gap-y-5 border-b-2 border-b-slate-50 pb-5 lg:ml-0 lg:flex-row lg:gap-x-5 lg:gap-y-0">
      <FormInputText
        id="startDate"
        placeholder="Start date"
        label="Start date:"
        class="lg:w-1/3"
        validate
        datepicker
      />
      <FormInputText
        id="endDate"
        placeholder="End date"
        label="End date:"
        class="lg:w-1/3"
        validate
        datepicker
      />

      <button
        class="rounded-md bg-red-500 py-2 px-5 text-white lg:w-1/3 lg:flex-none"
        onClick={findItems}
      >
        Find Items
      </button>
    </form>
  </section>
)

function Content() {
  return renderContent
}

export default Content
