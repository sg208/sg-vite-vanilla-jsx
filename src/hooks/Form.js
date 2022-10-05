export function useForm() {
  const validateForms = (nodes) => {
    const getEmptyFormFields = nodes.filter((node) => {
      return !node.value
    })

    if (getEmptyFormFields.length > 0) {
      nodes.map((node) => {
        el(`#${node.id}`).classList.remove('!border-red-500')

        if (!el(`#${node.id}`).value) {
          el(`#${node.id}`).classList.add('!border-red-500')
        }
      })

      return
    }

    processForm()
  }

  const processForm = () => {
    // TODO: Process the form here
    console.log('All fields are completed. Something is happening here.')
  }

  return {
    validateForms
  }
}
